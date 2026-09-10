#!/usr/bin/env bash
# Rebuild the brand guide PDF from guide.html.
#
#   ./build.sh
#
# WHY A SCRIPT: the fonts have to be EMBEDDED as base64 in guide.html, not linked from
# Google. Nunito and Pacifico are installed on the authoring Mac, so Chrome quietly used the
# local copies and produced a PDF with Nunito missing — fine here, a fallback sans everywhere
# else. The latin-subset woff2 are inlined in guide.html as data URIs under the family names
# NunitoEmbed / PacificoEmbed, which no system font can shadow. Run ./refresh-fonts.sh to
# regenerate that block — only needed if a weight is added or removed.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
OUT="BigHeadBuilder-Brand-Guide.pdf"

"$CHROME" --headless --disable-gpu --no-sandbox \
  --virtual-time-budget=25000 --no-pdf-header-footer \
  --print-to-pdf="$OUT" "file://$PWD/guide.html" >/dev/null 2>&1

pages=$(python3 -c "
d=open('$OUT','rb').read()
print(d.count(b'/Type /Page') - d.count(b'/Type /Pages'))")
echo "$OUT — $pages pages, $(du -h "$OUT" | cut -f1)"

# Chrome emits webfonts as Type3, so /BaseFont is absent by design; the check is that glyph
# programs are present at all. A PDF with none of these is one that will fall back on
# someone else's machine.
t3=$(python3 -c "
import re;print(len(re.findall(rb'/Subtype\s*/Type3', open('$OUT','rb').read())))")
[ "$t3" -gt 0 ] || { echo "!! no embedded glyph programs — fonts did not embed"; exit 1; }
echo "embedded font objects: $t3"
