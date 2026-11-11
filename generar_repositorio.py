"""Genera el repositorio público de análisis con precio decreciente."""
from __future__ import annotations

import json
import re
from datetime import date, datetime
from urllib.parse import quote
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
INFORMES = Path(r"C:\AI\Proyectos\Analisis\informes")
SITIO = "https://criteriofinanciero.org"

# Descuento de lanzamiento sobre el precio del repositorio (0.25 = 25 %). Ponlo a 0 para desactivarlo.
PROMO_LANZAMIENTO = 0.25

# Escalones de precio: (días máximos, precio, etiqueta)
ESCALONES = [
    (15, 89, "Reciente"),
    (60, 59, "En revisión"),
    (3650, 29, "Histórico"),
]

ESTILO = """<style>
:root{--navy:#0A1628;--gold:#C9963A;--cream:#F7F3EA;--muted:#5A6478}
*{box-sizing:border-box}
body{margin:0;background:var(--cream);color:var(--navy);
     font-family:'DM Sans',system-ui,sans-serif;line-height:1.7;font-size:16.5px}
header.barra{background:var(--navy);padding:18px 24px}
header.barra a{color:var(--gold);text-decoration:none;font-family:'Cormorant Garamond',serif;font-size:22px}
main{max-width:900px;margin:0 auto;padding:48px 24px 72px}
h1{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:500;margin:0 0 10px}
.intro{color:var(--muted);margin-bottom:14px;max-width:640px}
.regla{background:#fff;border-left:3px solid var(--gold);padding:14px 18px;
       font-size:14px;color:#5A4A22;margin:22px 0 34px;max-width:680px}
.rejilla{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px}
.ficha{background:#fff;border:1px solid #E3DCCB;border-radius:10px;padding:20px 22px;
       display:flex;flex-direction:column}
.ficha h2{font-family:'Cormorant Garamond',serif;font-size:23px;font-weight:600;margin:0 0 2px}
.meta{font-size:12.5px;color:var(--muted);letter-spacing:.04em;margin-bottom:14px}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px}
.chip{background:var(--cream);border-radius:5px;padding:5px 9px;font-size:12px;color:#3A4459}
.chip b{color:var(--navy)}
.precio{display:flex;align-items:baseline;gap:10px;margin-top:auto;padding-top:14px;
        border-top:1px solid #EFE9DA}
.precio .hoy{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:600;color:var(--navy)}
.precio .antes{font-size:15px;color:#A9A292;text-decoration:line-through}
.baja{background:#ECFDF5;color:#06614A;font-size:11.5px;font-weight:600;
      padding:3px 8px;border-radius:4px}
.etiqueta{font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:4px}
.btn{display:block;text-align:center;margin-top:14px;background:var(--gold);color:var(--navy);
     text-decoration:none;font-weight:600;font-size:14px;padding:11px;border-radius:6px}
.vacio{background:#fff;border:1px dashed #DCD4C4;border-radius:10px;padding:34px;
       text-align:center;color:var(--muted)}
footer{background:var(--navy);color:rgba(255,255,255,.5);padding:26px 24px;font-size:13px;text-align:center}
footer a{color:rgba(255,255,255,.65);text-decoration:none;margin:0 8px}
</style>"""


def escalon(dias: int) -> tuple[int, int, str, int]:
    anterior = 0
    for tope, precio, etiqueta in ESCALONES:
        if dias <= tope:
            return precio, precio, etiqueta, 0
        anterior = precio
    return 29, 29, "Histórico", 0


def precio_actual(dias: int) -> tuple[float, str]:
    if dias <= 15:
        base, etiqueta = 89, "Reciente"
    elif dias <= 60:
        base, etiqueta = 59, "En revisión"
    else:
        base, etiqueta = 29, "Histórico"
    precio = round(base * (1 - PROMO_LANZAMIENTO), 2)
    return precio, etiqueta


def euros(valor: float) -> str:
    texto = f"{valor:.2f}".rstrip("0").rstrip(".")
    return texto.replace(".", ",") + " €"


def leer_informe(ruta: Path) -> dict | None:
    try:
        h = ruta.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return None
    nombre = re.search(r"<h1>(.*?)</h1>", h, re.S)
    sub = re.search(r'class="sub">(.*?)</div>', h, re.S)
    precio = re.search(r"<b>([\d.,]+)</b><span>Último cierre", h)
    valor = re.search(r"<td><strong>Valor por acción</strong></td><td><strong>([\d.,]+)", h)
    if not nombre or not sub:
        return None
    partes = [p.strip() for p in re.sub(r"<[^>]+>", "", sub.group(1)).split("·")]
    ticker = partes[0] if partes else ""
    mercado = partes[1] if len(partes) > 1 else ""
    fecha_txt = partes[-1] if partes else ""
    try:
        fecha = datetime.strptime(fecha_txt, "%d/%m/%Y").date()
    except Exception:
        fecha = datetime.fromtimestamp(ruta.stat().st_mtime).date()
    dias = (date.today() - fecha).days
    precio_hoy, etiqueta = precio_actual(dias)
    return {
        "nombre": re.sub(r"<[^>]+>", "", nombre.group(1)).strip(),
        "ticker": ticker, "mercado": mercado, "fecha": fecha, "dias": dias,
        "precio_accion": precio.group(1) if precio else "",
        "valor_dcf": valor.group(1) if valor else "",
        "precio_informe": precio_hoy, "etiqueta": etiqueta,
        "slug": ruta.stem,
    }


def tarjeta(informe: dict) -> str:
    referencia = f'{informe["nombre"]} · {informe["fecha"].strftime("%d/%m/%Y")}'
    enlace = "/checkout/?ref=" + quote(informe["slug"])
    base = {89: 89, 59: 59, 29: 29}
    original = base.get(round(informe["precio_informe"] / (1 - PROMO_LANZAMIENTO)), 89)
    descuento = ""
    if PROMO_LANZAMIENTO:
        descuento = f'<span class="baja">−{round(PROMO_LANZAMIENTO*100)} %</span>'
    antes = f'<span class="antes">{euros(original)}</span>' if PROMO_LANZAMIENTO else ""
    chips = []
    if informe["precio_accion"]:
        chips.append(f'<span class="chip">Precio en el informe <b>{informe["precio_accion"]} €</b></span>')
    if informe["valor_dcf"]:
        chips.append(f'<span class="chip">Valor estimado DCF <b>{informe["valor_dcf"]} €</b></span>')
    chips.append(f'<span class="chip">{informe["etiqueta"]}</span>')
    return f"""<article class="ficha">
  <h2>{informe["nombre"]}</h2>
  <div class="meta">{informe["ticker"]} · {informe["mercado"]} · {informe["fecha"].strftime("%d/%m/%Y")}</div>
  <div class="chips">{"".join(chips)}</div>
  <div class="precio">
    <div>
      <div class="etiqueta">Precio hoy</div>
      <span class="hoy">{euros(informe["precio_informe"])}</span>
    </div>
    {antes} {descuento}
  </div>
  <a class="btn" href="{enlace}">Comprar este informe</a>
</article>"""


def main() -> None:
    informes = []
    if INFORMES.exists():
        for ruta in sorted(INFORMES.glob("*.html"), key=lambda p: p.stat().st_mtime, reverse=True):
            datos = leer_informe(ruta)
            if datos:
                informes.append(datos)

    if informes:
        contenido = '<div class="rejilla">' + "\n".join(tarjeta(i) for i in informes) + "</div>"
    else:
        contenido = '<div class="vacio">Todavía no hay análisis publicados. El primero estará aquí en cuanto se entregue.</div>'

    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Informes disponibles · CriterioFinanciero</title>
<meta name="description" content="Análisis de acciones publicados, con precio decreciente: cuanto más antiguo, más barato. Informes completos de mercado y valoración.">
<link rel="canonical" href="{SITIO}/repositorio/">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
{ESTILO}
</head>
<body>
<header class="barra"><a href="/">CriterioFinanciero</a></header>
<main>
<h1>Informes disponibles</h1>
<p class="intro">Todos los análisis publicados. Cada uno conserva su fecha, para que sepas exactamente
cuándo se escribió y con qué datos.</p>
<div class="regla">
  <strong>El precio baja con el tiempo.</strong> Un análisis pierde valor a medida que el mercado se
  mueve: los recientes cuestan <strong>89 €</strong>, los de entre 15 y 60 días <strong>59 €</strong>
  y los de más de dos meses <strong>29 €</strong>. La información caduca, y el precio lo refleja.<br><br>
  <strong>Oferta de lanzamiento:</strong> los precios que ves ya llevan un <strong>25 % de descuento</strong>.
  Se aplica al pedirlo, sin código.
</div>
{contenido}
</main>
<footer>
  <a href="/">Inicio</a><a href="/repositorio/">Informes</a><a href="/glosario/">Glosario</a><a href="/aviso-legal/">Aviso legal</a>
  <a href="/privacidad/">Privacidad</a><a href="/cookies/">Cookies</a><a href="/contacto/">Contacto</a>
</footer>
</body>
</html>"""

    destino = RAIZ / "repositorio"
    destino.mkdir(exist_ok=True)
    (destino / "index.html").write_text(html, encoding="utf-8")
    (destino / "datos.json").write_text(
        json.dumps([{k: (v.isoformat() if isinstance(v, date) else v) for k, v in i.items()}
                    for i in informes], ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"repositorio/index.html · {len(informes)} análisis · {len(html)/1024:.0f} KB")
    for i in informes:
        print(f"  {i['nombre'][:34]:34} {i['fecha']} · {i['dias']:3} días · {i['precio_informe']} €")


if __name__ == "__main__":
    main()
