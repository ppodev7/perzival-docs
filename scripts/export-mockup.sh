#!/usr/bin/env bash
# Gera o mockup estático em out/ com caminhos relativos, para abrir em qualquer pasta.
set -euo pipefail
rm -rf out .next
MOCKUP_EXPORT=1 npx next build
find out -name '*.css' -exec sed -i 's|/__pz__/_next/static/media/|../media/|g' {} +
find out \( -name '*.html' -o -name '*.js' -o -name '*.txt' \) -exec sed -i 's|/__pz__/_next/|./_next/|g' {} +
find out \( -name "*.html" -o -name "*.js" -o -name "*.txt" \) -exec sed -i "s|/__pz__|.|g" {} +
# O host de artifacts reserva nomes que começam com "_": renomeia a pasta de assets.
mv out/_next out/next-static
find out \( -name "*.html" -o -name "*.js" -o -name "*.txt" -o -name "*.css" \) -exec sed -i "s|_next/|next-static/|g" {} +
# Troca o caractere U+FFFD literal por seu escape, que alguns hosts recusam.
python3 - <<'PY'
import pathlib
for f in pathlib.Path("out").rglob("*.js"):
    t = f.read_text(encoding="utf-8")
    if "\ufffd" in t:
        f.write_text(t.replace("\ufffd", "\\ufffd"), encoding="utf-8")
PY
echo "Mockup exportado em out/"
