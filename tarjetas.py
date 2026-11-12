"""Ajusta las tarjetas de informes: cotización, sin DCF y oferta con fecha."""
from pathlib import Path

SITIO = Path(r"C:\AI\Proyectos\Web\criteriofinanciero")

# ---------------------------------------------------------------- repositorio
P = SITIO / "generar_repositorio.py"
T = P.read_text(encoding="utf-8")


def cambiar(texto, viejo, nuevo, etiqueta):
    if nuevo in texto:
        print(f"  ya aplicado: {etiqueta}")
        return texto
    if viejo not in texto:
        print(f"  AVISO no encontrado: {etiqueta}")
        return texto
    print(f"  aplicado: {etiqueta}")
    return texto.replace(viejo, nuevo, 1)


T = cambiar(
    T,
    '''    if informe["precio_accion"]:
        chips.append(f'<span class="chip">Precio en el informe <b>{informe["precio_accion"]} €</b></span>')
    if informe["valor_dcf"]:
        chips.append(f'<span class="chip">Valor estimado DCF <b>{informe["valor_dcf"]} €</b></span>')''',
    '''    if informe["precio_accion"]:
        chips.append(f'<span class="chip">Cotización a cierre del '
                     f'{informe["fecha"].strftime("%d/%m/%Y")} <b>{informe["precio_accion"]} €</b></span>')''',
    "chip de cotización y sin DCF",
)

T = cambiar(
    T,
    '''        descuento = f'<span class="baja">−{round(PROMO_LANZAMIENTO*100)} %</span>\'''',
    '''        descuento = (f'<span class="baja">−{round(PROMO_LANZAMIENTO*100)} %</span>'
                     f'<span style="font-size:11px;color:#8A6420;margin-left:8px">'
                     f'Oferta especial de lanzamiento hasta el 31/12/2026</span>')\'''',
    "etiqueta de la oferta",
)

P.write_text(T, encoding="utf-8")

# ---------------------------------------------------------------- checkout
C = SITIO / "generar_checkout.py"
CT = C.read_text(encoding="utf-8")

CT = cambiar(
    CT,
    '''          (inf.precio_accion ? '<span class="chip">Precio en el informe <b>' + inf.precio_accion + ' €</b></span>' : '') +
          (inf.valor_dcf ? '<span class="chip">Valor estimado DCF <b>' + inf.valor_dcf + ' €</b></span>' : '') +''',
    '''          (inf.precio_accion ? '<span class="chip">Cotización a cierre del ' + fecha + ' <b>' + inf.precio_accion + ' €</b></span>' : '') +''',
    "chip del checkout",
)

CT = cambiar(
    CT,
    """        '<span class="baja">−25 %</span></div>';""",
    """        '<span class="baja">−25 %</span></div>' +
        '<div style="font-size:11.5px;color:#8A6420;margin-top:6px">Oferta especial de lanzamiento ' +
        'hasta el 31/12/2026</div>';""",
    "etiqueta de oferta en el checkout",
)

C.write_text(CT, encoding="utf-8")
print("\ngeneradores actualizados")
