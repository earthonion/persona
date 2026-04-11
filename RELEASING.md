# Releasing the Firefox extension

The extension is distributed from https://earthonion.github.io/persona. Each
release is signed by Mozilla (required for Firefox to install it) and hosted
alongside an `updates.json` so existing users auto-update.

## One-time setup

1. **Enable GitHub Pages** on this repo: Settings → Pages → Source: `main`
   branch, folder `/docs`. The site is published at
   `https://earthonion.github.io/persona/`.
2. **Create a Mozilla Add-ons account** at
   https://addons.mozilla.org/developers/.

## Releasing version `X.Y.Z`

1. **Bump the version** in `firefox/manifest.json`.

2. **Build the unsigned zip** (rename to `.xpi` or leave as `.zip` — AMO
   accepts both):
   ```bash
   cd firefox
   zip -r ../persona-X.Y.Z.zip . -x "*.DS_Store"
   ```

3. **Submit to AMO.** Go to
   https://addons.mozilla.org/developers/addon/submit/upload-unlisted and
   upload `persona-X.Y.Z.zip`. Select **"On your own website"**
   (unlisted). Fill in reviewer notes — something like:
   > Persona generates random identity data locally in the browser and
   > fills signup forms on the active tab when the user clicks Fill. It
   > uses `activeTab` + `scripting` on demand only. No network, no
   > storage, no remote code. Source: https://github.com/earthonion/persona

4. **Wait for signing.** Unlisted signings are usually automated and take
   minutes. You'll get an email with a download link for the signed
   `.xpi`.

5. **Drop the signed xpi into `docs/`** as `persona-X.Y.Z.xpi`.

6. **Update `docs/updates.json`** — bump the `version` and `update_link` to
   point at the new file. Keep older entries if you want to support
   downgrading, otherwise replace.

7. **Update `docs/index.html`** — change the install link `href` and the
   version string in the subtitle.

8. **Tag and push:**
   ```bash
   git add firefox/manifest.json docs/
   git commit -m "release vX.Y.Z"
   git tag vX.Y.Z
   git push origin main --tags
   ```

9. GitHub Pages redeploys automatically. Existing users pick up the update
   on Firefox's next update check (usually within a day). New users install
   by visiting the landing page.

## Testing a release candidate before submitting to AMO

To test the packaged build without signing:

```bash
cd firefox
zip -r ../persona-rc.zip . -x "*.DS_Store"
```

Then in Firefox: `about:debugging` → **This Firefox** → **Load Temporary
Add-on** → pick `persona-rc.zip`. Temporary add-ons bypass the signing
requirement and load directly.
