#!/usr/bin/env bash
# Re-download the brand fonts and re-inline them into guide.html as base64 woff2.
#
#   ./refresh-fonts.sh        # then ./build.sh
#
# ONLY needed when a weight is added or removed. The fonts are already inlined in
# guide.html; this regenerates that block.
#
# They are inlined rather than linked because Nunito and Pacifico are INSTALLED on the
# authoring Mac. Chrome preferred the local copies and printed a PDF with Nunito not
# embedded at all — correct on this machine, a fallback sans on the agency's. Declaring the
# faces under names no system font uses (NunitoEmbed / PacificoEmbed) makes substitution
# impossible. Latin subset only; the document has no other scripts.
#
# Nunito and Pacifico are SIL Open Font License — embedding in a PDF is permitted.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
WEIGHTS="400;600;700;800;900"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"

curl -sS -A "$UA" \
  "https://fonts.googleapis.com/css2?family=Nunito:wght@${WEIGHTS}&family=Pacifico&display=swap" \
  -o .gf.css

python3 - <<'PY'
import re, base64, urllib.request
css = open(".gf.css").read()
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/131.0.0.0 Safari/537.36"}
faces = []
for b in re.findall(r"@font-face\s*\{(.*?)\}", css, re.S):
    ur = re.search(r"unicode-range:\s*([^;]+);", b)
    if not ur or "U+0000-00FF" not in ur.group(1):   # latin subset only
        continue
    fam = re.search(r"font-family:\s*'([^']+)'", b).group(1) + "Embed"
    wt  = re.search(r"font-weight:\s*(\d+)", b).group(1)
    url = re.search(r"url\((https://[^)]+\.woff2)\)", b).group(1)
    data = urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30).read()
    faces.append("@font-face{font-family:'%s';font-style:normal;font-weight:%s;font-display:block;"
                 "src:url(data:font/woff2;base64,%s) format('woff2');}"
                 % (fam, wt, base64.b64encode(data).decode()))
    print("  %-16s %s  %5.1f KB" % (fam, wt, len(data)/1024))

block = "\n".join(faces)
g = open("guide.html").read()
# replace the whole second <style> block, which holds nothing but the @font-face rules
new, n = re.subn(r"<style>@font-face.*?</style>", "<style>" + block + "</style>", g, count=1, flags=re.S)
assert n == 1, "could not find the inlined @font-face block in guide.html"
open("guide.html", "w").write(new)
print("inlined into guide.html")
PY

rm -f .gf.css
echo "done — now run ./build.sh"
