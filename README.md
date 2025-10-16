# Personal Website

A lightweight, interactive portfolio with three themed sections: ML, Robotics, and 3D Graphics & Simulation. Built using vanilla HTML/CSS/JS (no build step).

## Run locally

Use any static server to view with correct file MIME types for ES modules.

```bash
# Python 3
cd /Users/varunsatheesh/personalwebsite
python3 -m http.server 5173
# then open http://localhost:5173
```

Or using Node (if installed):

```bash
npx serve /Users/varunsatheesh/personalwebsite -p 5173 --single
```

## Structure

- `index.html` — main page and content
- `assets/css/styles.css` — styles and layout
- `assets/js/main.js` — common utilities and interactions
- `assets/js/ml.js` — ML background (particle/neuronal network)
- `assets/js/robotics.js` — Robotics background (SVG 2-link arm, mouse-follow)
- `assets/js/graphics3d.js` — 3D-like background (wireframe cube, canvas)

## Notes
- All scripts are vanilla JS and should run on modern browsers.
- Section navigation uses smooth scrolling and scroll-snap.
- Backgrounds auto-scale with device pixel ratio for sharpness.
