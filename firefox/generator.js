const ALPHANUMERIC = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SYMBOLS = "!@#$%^&*()_+{}[]|\\:;\"'<>,.?/~`";

const EMAIL_DOMAINS = [
  "grr.la", "sharklasers.com", "guerrillamail.info", "guerrillamail.com",
  "guerrillamail.biz", "guerrillamail.de", "guerrillamail.net",
  "guerrillamail.org", "guerrillamailblock.com", "pokemail.net", "spam4.me"
];

function randInt(max) {
  const buf = new Uint32Array(1);
  crypto.getRandomValues(buf);
  return buf[0] % max;
}

function pick(arr) {
  return arr[randInt(arr.length)];
}

function randString(length, withSymbols = false) {
  const alphabet = withSymbols ? ALPHANUMERIC + SYMBOLS : ALPHANUMERIC;
  let out = "";
  for (let i = 0; i < length; i++) out += alphabet[randInt(alphabet.length)];
  return out;
}

function capitalize(s) {
  if (!s) return s;
  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

async function loadList(path) {
  const url = browser.runtime.getURL(path);
  const res = await fetch(url);
  const text = await res.text();
  return text.split(/\s+/).filter(Boolean);
}

let wordlists = null;
async function getWordlists() {
  if (wordlists) return wordlists;
  const [adjectives, nouns, female, male, last] = await Promise.all([
    loadList("wordlists/adjectives.txt"),
    loadList("wordlists/nouns.txt"),
    loadList("wordlists/female-first-names.txt"),
    loadList("wordlists/male-first-names.txt"),
    loadList("wordlists/last-names.txt"),
  ]);
  wordlists = { adjectives, nouns, female, male, last };
  return wordlists;
}

async function generatePersona() {
  const w = await getWordlists();
  const male = randInt(2) === 1;
  const firstName = capitalize(pick(male ? w.male : w.female));
  const lastName = capitalize(pick(w.last));
  const username = pick(w.adjectives) + pick(w.nouns);
  const emailLocal = randString(10);
  const emailDomain = pick(EMAIL_DOMAINS);
  return {
    firstName,
    lastName,
    gender: male ? "M" : "F",
    username,
    email: `${emailLocal}@${emailDomain}`,
    inbox: `https://www.guerrillamail.com/inbox?email_user=${emailLocal}`,
    password: randString(24, true),
  };
}
