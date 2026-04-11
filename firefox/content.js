(() => {
  if (window.__personaContentLoaded) return;
  window.__personaContentLoaded = true;

  const MATCHERS = {
    firstName: [
      'input[autocomplete="given-name"]',
      'input[name*="first" i]',
      'input[id*="first" i]',
      'input[name*="fname" i]',
      'input[id*="fname" i]',
    ],
    lastName: [
      'input[autocomplete="family-name"]',
      'input[name*="last" i]',
      'input[id*="last" i]',
      'input[name*="lname" i]',
      'input[id*="lname" i]',
      'input[name*="surname" i]',
    ],
    username: [
      'input[autocomplete="username"]',
      'input[name*="user" i]:not([type="email"])',
      'input[id*="user" i]:not([type="email"])',
      'input[name*="handle" i]',
    ],
    email: [
      'input[type="email"]',
      'input[autocomplete="email"]',
      'input[name*="email" i]',
      'input[id*="email" i]',
    ],
  };

  function isVisible(el) {
    if (!el || el.disabled) return false;
    if (el.type === "hidden") return false;
    return el.getClientRects().length > 0;
  }

  function findField(selectors) {
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (isVisible(el)) return el;
    }
    return null;
  }

  function isCurrentPasswordField(el) {
    if (el.autocomplete === "current-password") return true;
    const hint = `${el.name || ""} ${el.id || ""} ${el.placeholder || ""}`.toLowerCase();
    return /current|old|existing/.test(hint);
  }

  function findPasswordFields() {
    return Array.from(document.querySelectorAll('input[type="password"]'))
      .filter(isVisible)
      .filter((el) => !isCurrentPasswordField(el));
  }

  function setValue(el, value) {
    const proto = Object.getPrototypeOf(el);
    const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
    if (setter) setter.call(el, value);
    else el.value = value;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function fill(persona) {
    let filled = 0;
    for (const [key, selectors] of Object.entries(MATCHERS)) {
      const el = findField(selectors);
      if (el && persona[key]) {
        setValue(el, persona[key]);
        filled++;
      }
    }
    for (const el of findPasswordFields()) {
      setValue(el, persona.password);
      filled++;
    }
    return filled;
  }

  browser.runtime.onMessage.addListener((msg) => {
    if (msg?.type === "fill" && msg.persona) {
      const n = fill(msg.persona);
      return Promise.resolve({ filled: n });
    }
  });
})();
