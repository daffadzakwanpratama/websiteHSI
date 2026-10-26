"""Bangun assets/css/site.min.css (tailwind + font-awesome subset + custom.css)
dan subset font Font Awesome yang hanya berisi ikon yang dipakai.

Jalankan dari root proyek setelah `npm run build:css`:
    pip install fonttools brotli rcssmin
    python tools/build-css.py
"""
import glob
import re
import sys
from pathlib import Path

import rcssmin
from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
CSS = ROOT / "assets" / "css"
FONTS_SRC = ROOT / "assets" / "webfonts"
FA_MIN = CSS / "fontawesome.min.css"


def read(p):
    return Path(p).read_text(encoding="utf-8")


def split_rules(css):
    rules, depth, start = [], 0, 0
    for i, ch in enumerate(css):
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                rules.append(css[start:i + 1].strip())
                start = i + 1
    return rules


def used_icon_names():
    text = ""
    for f in glob.glob(str(ROOT / "*.html")) + glob.glob(str(ROOT / "assets/js/**/*.js"), recursive=True):
        text += read(f) + "\n"
    return set(re.findall(r"\bfa-([a-z0-9-]+)", text))


def main():
    used = used_icon_names()
    fa = re.sub(r"/\*.*?\*/", "", read(FA_MIN), flags=re.S)
    all_rules = split_rules(fa)
    kept, codepoints, kept_anims = [], set(), set()
    for rule in all_rules:
        if rule.startswith("@font-face") or rule.startswith("@keyframes"):
            continue
        if rule.startswith("@"):
            kept.append(rule)
            continue
        sel, body = rule.split("{", 1)
        if body.startswith('--fa:"'):
            names = [n.strip() for n in sel.split(",") if n.strip()[4:] in used]
            if not names:
                continue
            kept.append(",".join(names) + "{" + body)
            m = re.search(r'--fa:"\\([0-9a-f]+)"', body)
            codepoints.add(int(m.group(1), 16))
        else:
            classes = re.findall(r"\.fa-([a-z0-9-]+)", sel)
            if classes and not any(c in used for c in classes):
                continue
            kept_anims.update(re.findall(r"animation-name:([a-z-]+)", body))
            kept.append(rule)
    anim_rules = [r for r in all_rules if r.startswith("@keyframes") and r.split("{")[0].split()[1] in kept_anims]

    face = (
        '@font-face{font-family:"Font Awesome 7 Brands";font-style:normal;font-weight:400;font-display:swap;src:url(../webfonts/fa-brands-400.subset.woff2) format("woff2")}'
        '@font-face{font-family:"Font Awesome 7 Free";font-style:normal;font-weight:400;font-display:swap;src:url(../webfonts/fa-regular-400.subset.woff2) format("woff2")}'
        '@font-face{font-family:"Font Awesome 7 Free";font-style:normal;font-weight:900;font-display:swap;src:url(../webfonts/fa-solid-900.subset.woff2) format("woff2")}'
    )
    fa_css = face + "".join(kept) + "".join(anim_rules)

    for name in ("fa-brands-400", "fa-regular-400", "fa-solid-900"):
        opts = subset.Options()
        opts.flavor = "woff2"
        opts.layout_features = []
        opts.hinting = False
        opts.notdef_outline = False
        font = subset.load_font(str(FONTS_SRC / f"{name}.woff2"), opts)
        sub = subset.Subsetter(opts)
        sub.populate(unicodes=sorted(codepoints))
        sub.subset(font)
        out = FONTS_SRC / f"{name}.subset.woff2"
        subset.save_font(font, str(out), opts)
        print(out.name, out.stat().st_size, "bytes")

    out_css = rcssmin.cssmin(read(CSS / "tailwind.css") + fa_css + read(CSS / "custom.css"))
    (CSS / "site.min.css").write_text(out_css, encoding="utf-8", newline="\n")
    print("site.min.css", len(out_css.encode()), "bytes;", len(codepoints), "ikon")


if __name__ == "__main__":
    sys.exit(main())
