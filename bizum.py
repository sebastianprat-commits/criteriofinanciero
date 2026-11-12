"""Bizum como único pago, fuera la formación y ajustes de la muestra."""
import re
from pathlib import Path

SITIO = Path(r"C:\AI\Proyectos\Web\criteriofinanciero")
TELEFONO = "+34 686 875 142"

# ---------------------------------------------------------------- index.html
P = SITIO / "index.html"
H = P.read_text(encoding="utf-8")


def cambiar(texto, viejo, nuevo, etiqueta, todas=False):
    if viejo not in texto:
        estado = "ya aplicado" if nuevo in texto else "NO ENCONTRADO"
        print(f"  {estado}: {etiqueta}")
        return texto
    print(f"  aplicado: {etiqueta}")
    return texto.replace(viejo, nuevo) if todas else texto.replace(viejo, nuevo, 1)


# 1. quitar la sección de vídeos completa
i = H.find("<!-- VÍDEOS -->")
if i > 0:
    j = H.find("</section>", i) + len("</section>")
    H = H[:i] + H[j:]
    print("  aplicado: sección de vídeos eliminada")
else:
    print("  ya aplicado: sin sección de vídeos")

# 2. quitar los enlaces del menú y pie
H = re.sub(r'<li><a href="#videos">Formación</a></li>', "", H)
H = re.sub(r'<a href="#videos">Formación</a>', "", H)
print("  aplicado: enlaces a formación quitados")

# 3. fuera la frase de próximos vídeos
H = re.sub(r'<p style="font-size:\.75rem;color:var\(--muted\);margin-top:\.75rem">Próximos vídeos:[^<]*</p>',
           "", H)
print("  aplicado: frase de próximos vídeos quitada")

# 4. Bizum como único medio
H = cambiar(
    H,
    "Pago por transferencia o Bizum tras confirmación. Factura incluida.",
    f"Pago por Bizum al {TELEFONO} tras la confirmación. Factura incluida.",
    "pago solo con Bizum",
)

# 5. título de la muestra
H = cambiar(H, "Así es un informe PRO Ampliado",
            "Así es un informe de CriterioFinanciero", "título de la muestra")

# 6. el KPI del DCF pasa a rango + enlace
H = cambiar(
    H,
    '<div class="kpi"><div class="kpi-label">DCF</div><div class="kpi-val">44,35 €</div></div>',
    '<div class="kpi" style="display:flex;flex-direction:column;justify-content:center">'
    '<div class="kpi-label">Rango estimado</div>'
    '<div class="kpi-val" style="font-size:1.05rem">44,35 – 79,51 €</div>'
    '<a href="/descargas/informe-muestra-indra.pdf" download '
    'style="font-size:.78rem;color:#8A6420;text-decoration:underline;margin-top:4px">Ver informe</a></div>',
    "KPI de rango con enlace",
)

P.write_text(H, encoding="utf-8")
print(f"\nindex.html guardado ({len(H)/1024:.0f} KB)")

# ---------------------------------------------------------------- checkout
C = SITIO / "generar_checkout.py"
CT = C.read_text(encoding="utf-8")
CT = cambiar(
    CT,
    '''    <label for="pago">Cómo prefieres pagar</label>
    <select id="pago" name="pago">
      <option>Transferencia bancaria</option>
      <option>Bizum</option>
    </select>''',
    f'''    <label>Forma de pago</label>
    <div style="background:#F7F3EA;border:1px solid #E3DCCB;border-radius:6px;padding:14px 16px;
         margin-bottom:18px;font-size:14.5px;line-height:1.6">
      <strong>Bizum al {TELEFONO}</strong><br>
      <span style="color:#5A6478;font-size:13px">Al confirmar el pedido recibirás los datos y el
      importe. El informe se entrega en 24-48 h desde el pago.</span>
    </div>
    <input type="hidden" name="pago" value="Bizum">''',
    "checkout solo Bizum",
)
C.write_text(CT, encoding="utf-8")

# ---------------------------------------------------------------- páginas legales
G = SITIO / "generar_paginas.py"
GT = G.read_text(encoding="utf-8")
GT = GT.replace(
    "se abonan por transferencia o Bizum tras la confirmación del pedido, con factura.",
    f"se abonan por Bizum al {TELEFONO} tras la confirmación del pedido, con factura.",
)
GT = GT.replace(
    "el importe con el descuento de lanzamiento y los datos para pagar por transferencia o Bizum.",
    f"el importe con el descuento de lanzamiento y el número de Bizum ({TELEFONO}).",
)
GT = GT.replace(
    "datos para el pago por transferencia o Bizum",
    f"datos para el pago por Bizum ({TELEFONO})",
)
G.write_text(GT, encoding="utf-8")
print("  generador de páginas legales actualizado")
