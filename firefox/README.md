# Persona — Firefox extension

Generates a random identity (name, username, email, password) and autofills
signup forms on the active tab.

## Install (temporary, for testing)

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Click **Load Temporary Add-on...**
3. Select `firefox/manifest.json` from this repo.

The Persona icon appears in the toolbar. Click it to open the popup, then
**Fill current page** to populate the visible form.

## What it fills

The content script looks for common signup-form fields by `autocomplete`,
`name`, and `id` attributes:

- First name, last name
- Username
- Email
- Password

Filled values dispatch `input` and `change` events so React / Vue / Svelte
forms pick up the changes.

## Roadmap

- [ ] Save generated personas to KeePassXC via `keepassxc-browser` native
      messaging.
- [ ] Optional encrypted history in `browser.storage.local` with a master
      password (WebCrypto AES-GCM).
- [ ] Per-site profile overrides.
