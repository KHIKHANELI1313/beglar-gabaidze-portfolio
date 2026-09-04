# Beglar Gabaidze — Portfolio

Bilingual (ქართული / English) personal portfolio. Static site, no build step.

**Live:** https://khikhaneli1313.github.io/beglar-gabaidze-portfolio/

## Structure

| Path | What |
|------|------|
| `index.html` | The site — loads `css/`, `js/`, `assets/` separately |
| `beglar-gabaidze-portfolio.html` | Single-file version (CSS, JS and the portrait inlined) |
| `css/styles.css` | All styles |
| `js/main.js` | i18n toggle, scroll reveal, custom cursor, canvas backgrounds |
| `assets/` | `portrait.png` + optional `projects/*.jpg` screenshots |

## Local preview

Open `index.html` directly, or serve the folder:

```bash
npx serve .
# or
python -m http.server 8000
```

## Notes

- Language (KA/EN) is switched client-side and remembered in `localStorage`.
- Project cards can show a real screenshot: drop `assets/projects/<slug>.jpg`
  (`bega`, `travel-guardian`, `khikhani`, `khikhadziri`, `digit`, `maxima`,
  `hotel`, `travelworld`, `school`). Missing ones fall back to a gradient.
- Four cards also pull a live screenshot from `s.wordpress.com/mshots` as a
  fallback; a local file always wins over it.
