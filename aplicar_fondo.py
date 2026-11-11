"""Aplica el fondo al hero y mejora el salto del ancla."""
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
INDEX = RAIZ / "index.html"
HTML = INDEX.read_text(encoding="utf-8")

VIEJO_HERO = ".hero{min-height:100vh;background:var(--navy);"
NUEVO_HERO = (".hero{min-height:100vh;"
              "background:url('/assets/img/fondo-mercado.png') center/cover no-repeat,var(--navy);")

if "fondo-mercado.png" in HTML:
    print("fondo ya aplicado")
elif VIEJO_HERO in HTML:
    HTML = HTML.replace(VIEJO_HERO, NUEVO_HERO, 1)
    print("fondo aplicado al hero")
else:
    raise SystemExit("no encuentro la regla .hero en el CSS")

ANCLA = "html{scroll-behavior:smooth}"
EXTRA = "html{scroll-behavior:smooth}\nsection[id]{scroll-margin-top:90px}"
if "scroll-margin-top" not in HTML:
    HTML = HTML.replace(ANCLA, EXTRA, 1)
    print("scroll-margin aplicado a las secciones")
else:
    print("scroll-margin ya presente")

INDEX.write_text(HTML, encoding="utf-8")
print("index.html actualizado")
