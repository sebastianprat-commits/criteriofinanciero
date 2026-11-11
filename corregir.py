"""Corrige el email de contacto y pone la foto del asesor en el sitio."""
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
INDEX = RAIZ / "index.html"
EMAIL_VIEJO = "hola@criteriofinanciero.org"
EMAIL_NUEVO = "sebastian.prat@gmail.com"

html = INDEX.read_text(encoding="utf-8")
cambios = 0

if '<div class="sobre-avatar">S</div>' in html:
    html = html.replace(
        '<div class="sobre-avatar">S</div>',
        '<img class="sobre-avatar" src="/assets/img/asesor.jpg"'
        ' alt="Sebastián Prat, asesor financiero titulado EFPA"'
        ' style="width:170px;height:170px;border-radius:50%;object-fit:cover;'
        'object-position:50% 22%;border:2px solid rgba(201,150,58,.4);display:block">',
        1,
    )
    cambios += 1
    print("  foto del asesor insertada")

if EMAIL_VIEJO in html:
    n = html.count(EMAIL_VIEJO)
    html = html.replace(EMAIL_VIEJO, EMAIL_NUEVO)
    cambios += n
    print(f"  {n} ocurrencias del email corregidas")

INDEX.write_text(html, encoding="utf-8")
print("cambios totales:", cambios)

# El generador de páginas legales también debe usar el correo nuevo
gen = RAIZ / "generar_paginas.py"
texto = gen.read_text(encoding="utf-8")
if EMAIL_VIEJO in texto:
    gen.write_text(texto.replace(EMAIL_VIEJO, EMAIL_NUEVO), encoding="utf-8")
    print("  generar_paginas.py actualizado")
