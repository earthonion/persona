# Persona — Privacy Policy

Persona generates random identity data (names, usernames, email addresses,
passwords) locally in your browser using the Web Crypto API. The generated
data, and any form fields Persona reads or writes, **never leave your
browser**. Persona does not contact any remote server, does not collect
analytics, and does not store any personal information.

## What Persona accesses

- **Active tab only.** When you click **Fill current page**, Persona injects
  a content script into the current tab to locate and fill form fields. It
  does not run on any other tab and does not run automatically on page load.
- **Clipboard write.** When you click **Copy all**, Persona writes the
  generated identity to your clipboard.

## What Persona does not do

- No telemetry.
- No remote code loading.
- No background network requests.
- No persistent storage of generated identities (in this version).

## Generated email addresses

Persona composes email addresses using public disposable-email domains
(e.g. `guerrillamail.com`, `grr.la`). These services are operated by third
parties. Persona does not send mail or interact with them in any way — it
only writes the address string into a form field.

## Contact

Issues and questions: https://github.com/earthonion/persona/issues
