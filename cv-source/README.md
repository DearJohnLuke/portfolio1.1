# CV source

`python3 build.py` writes `cv.html` (FR pages 1–2, EN pages 3–4). Print it to PDF with Chrome:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --allow-file-access-from-files \
  --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf=../public/assets/CV-Jean-Luc-Luzemba-2026-11.pdf \
  "file://$PWD/cv.html"
```

Text lives in the `T` and `PROJECTS` dictionaries at the top of `build.py`.
