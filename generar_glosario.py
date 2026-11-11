"""Genera la página de glosario de criteriofinanciero.org."""
from __future__ import annotations

from pathlib import Path

RAIZ = Path(__file__).resolve().parent
SITIO = "https://criteriofinanciero.org"

ESTILO = """<style>
:root{--navy:#0A1628;--gold:#C9963A;--cream:#F7F3EA;--muted:#5A6478}
*{box-sizing:border-box}
body{margin:0;background:var(--cream);color:var(--navy);
     font-family:'DM Sans',system-ui,sans-serif;line-height:1.7;font-size:16.5px}
header{background:var(--navy);padding:18px 24px}
header a{color:var(--gold);text-decoration:none;font-family:'Cormorant Garamond',serif;font-size:22px}
main{max-width:780px;margin:0 auto;padding:48px 24px 72px}
h1{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:500;margin:0 0 10px}
.intro{color:var(--muted);margin-bottom:34px}
h2{font-family:'Cormorant Garamond',serif;font-size:27px;font-weight:600;
   margin:44px 0 4px;padding-bottom:8px;border-bottom:1px solid #E3DCCB}
dt{font-weight:600;margin-top:20px;font-size:17px}
dt .sig{color:var(--muted);font-weight:400;font-size:13px;margin-left:6px}
dd{margin:4px 0 0;color:#1E2A3D}
dd em{color:#8A6420;font-style:normal}
.indice{background:#fff;border:1px solid #E3DCCB;border-radius:8px;padding:18px 22px;margin:26px 0 10px}
.indice p{margin:0 0 8px;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
.indice a{display:inline-block;margin:3px 12px 3px 0;color:#8A6420;font-size:14.5px}
footer{background:var(--navy);color:rgba(255,255,255,.5);padding:26px 24px;font-size:13px;text-align:center}
footer a{color:rgba(255,255,255,.65);text-decoration:none;margin:0 8px}
</style>"""

SECCIONES = [
    ("Valoración", "vc", [
        ("PER", "Price/Earnings Ratio",
         "Precio de la acción dividido entre el beneficio por acción. Dice cuántos años de beneficio actual "
         "está pagando el mercado por la empresa. Un PER de 18 significa que pagas 18 euros por cada euro de "
         "beneficio anual. Solo tiene sentido compararlo con empresas del mismo sector y con su propia historia."),
        ("PER futuro", "Forward P/E",
         "Lo mismo pero usando el beneficio estimado para los próximos doce meses. Recoge expectativas, no "
         "realidad: si las estimaciones fallan, el múltiplo engaña."),
        ("EV/EBITDA", "Valor de empresa sobre EBITDA",
         "Relaciona el valor total de la empresa —deuda incluida— con su beneficio operativo antes de "
         "amortizaciones. Es más justo que el PER cuando se comparan empresas con distinto endeudamiento, "
         "porque neutraliza cómo se financia cada una."),
        ("Precio/Valor contable", "Price/Book",
         "Precio frente al patrimonio neto contable. Por debajo de 1 sugiere que el mercado valora la empresa "
         "por debajo de sus libros; en negocios intensivos en activos puede ser una señal, en tecnología casi nunca."),
        ("DCF", "Descuento de flujos de caja",
         "Método que valora una empresa trayendo al presente el dinero que generará en el futuro. Es el más "
         "riguroso y el más sensible a los supuestos: cambiar el crecimiento o la tasa de descuento un punto "
         "mueve el resultado decenas de puntos porcentuales."),
        ("Valor terminal", "Terminal value",
         "En un DCF, el valor de todos los flujos posteriores al último año proyectado. Suele representar entre "
         "el 60 % y el 80 % del valor total, de ahí que el crecimiento perpetuo que se le asigne sea decisivo."),
        ("WACC", "Coste medio ponderado del capital",
         "La rentabilidad mínima que debe generar la empresa para compensar a quien pone el dinero, mezclando "
         "deuda y capital propio. Es la tasa a la que se descuentan los flujos futuros."),
        ("Beta", "β",
         "Mide cuánto se mueve una acción respecto al mercado. Beta 1 se mueve igual; 1,5 un 50 % más; 0,8 un "
         "20 % menos. Se usa para estimar el riesgo y construir la tasa de descuento."),
        ("Prima de riesgo", "Equity risk premium",
         "La rentabilidad extra que se exige a la bolsa frente a un activo sin riesgo. En mercados maduros suele "
         "estimarse entre el 4,5 % y el 6 %."),
        ("Capitalización bursátil", "Market cap",
         "Precio por número de acciones: lo que costaría comprar la empresa entera en bolsa sin prima. No es lo "
         "mismo que el valor de empresa, que suma la deuda y resta la caja."),
    ]),
    ("Rentabilidad y negocio", "rn", [
        ("ROE", "Rentabilidad sobre recursos propios",
         "Beneficio neto dividido entre el patrimonio neto. Mide cuánto gana la empresa por cada euro que han "
         "puesto los accionistas. Un ROE alto con poca deuda es excelente; alto gracias a mucha deuda, engañoso."),
        ("ROCE", "Rentabilidad sobre capital empleado",
         "Beneficio operativo sobre el capital invertido (deuda más patrimonio). Es más difícil de maquillar que "
         "el ROE porque incluye la deuda en el denominador."),
        ("EBITDA", "Beneficio antes de intereses, impuestos, amortizaciones",
         "Aproximación al beneficio puramente operativo. Ignora cómo se financia la empresa y cómo se contabilizan "
         "sus inversiones, así que sirve para comparar negocios, no para saber si hay caja."),
        ("Margen bruto", "Gross margin",
         "Lo que queda de las ventas tras restar el coste directo de producir lo vendido. Un margen bruto alto "
         "suele indicar poder de fijación de precios."),
        ("Margen neto", "Net margin",
         "Beneficio neto sobre ventas: de cada 100 euros facturados, cuántos acaban siendo beneficio. Es la "
         "medida más directa de la eficiencia del negocio de punta a punta."),
        ("BPA", "Beneficio por acción",
         "Beneficio neto repartido entre el número de acciones. Es la base del PER y del dividendo."),
        ("Payout", "Reparto del beneficio",
         "Porcentaje del beneficio que la empresa reparte como dividendo. Por encima del 80 % suele indicar que "
         "queda poco margen para reinvertir o que el dividendo podría recortarse."),
        ("Rentabilidad por dividendo", "Dividend yield",
         "Dividendo anual dividido entre el precio. Un 5 % puede ser una oportunidad o una señal de que el mercado "
         "espera que se recorte."),
    ]),
    ("Caja y deuda", "cd", [
        ("Flujo de caja libre", "Free cash flow",
         "El dinero que genera el negocio después de pagar sus inversiones. Es lo que de verdad puede dedicarse a "
         "dividendos, recompras o reducir deuda. Un beneficio contable alto con flujo libre negativo es una "
         "bandera roja."),
        ("Flujo de caja operativo", "Operating cash flow",
         "El efectivo que entra por la actividad ordinaria. Debe parecerse al beneficio: si se separan mucho y de "
         "forma sostenida, conviene mirar las cuentas por cobrar."),
        ("Deuda neta", "Net debt",
         "Deuda financiera menos caja disponible. Negativa significa que la empresa tiene más caja que deuda: es "
         "una posición de fortaleza."),
        ("Deuda/Patrimonio", "Debt/Equity",
         "Cuántas veces la deuda supera los recursos propios. Por encima de 1-1,5 el apalancamiento empieza a "
         "pesar; en sectores estables como infraestructuras es más tolerable que en tecnología."),
        ("Apalancamiento", "Leverage",
         "Uso de deuda para aumentar la inversión. Multiplica las ganancias cuando las cosas van bien y las "
         "pérdidas cuando van mal."),
    ]),
    ("Análisis técnico", "at", [
        ("Media móvil", "SMA / EMA",
         "Precio medio de los últimos n días. La SMA pondera todos los días igual; la EMA da más peso a los "
         "recientes. Sirven para ver la tendencia sin el ruido del día a día: 50 y 200 sesiones son las estándar."),
        ("RSI", "Índice de fuerza relativa",
         "Oscilador de 0 a 100 que mide la velocidad de las subidas y bajadas. Por encima de 70 se considera "
         "sobrecompra; por debajo de 30, sobreventa. No es una señal de compra o venta por sí solo."),
        ("MACD", "Convergencia/divergencia de medias",
         "Diferencia entre dos medias exponenciales (12 y 26 sesiones), con una línea de señal a 9. Cuando el MACD "
         "cruza por encima de su señal sugiere impulso alcista; por debajo, lo contrario."),
        ("Bandas de Bollinger", "Bollinger Bands",
         "Media de 20 sesiones más y menos dos desviaciones típicas. Cuando el precio está en la banda superior hay "
         "tensión al alza; cuando las bandas se estrechan, el mercado está comprimido y suele venir un movimiento."),
        ("Volatilidad", "σ",
         "Cuánto oscila el precio. Más volatilidad significa más riesgo, pero también más oportunidad. En el DCF "
         "entra indirectamente a través de la beta."),
        ("Soporte y resistencia", "Support / resistance",
         "Niveles de precio donde históricamente aparecen compradores (soporte) o vendedores (resistencia). Son "
         "referencias, no barreras infranqueables."),
        ("Cruce dorado y cruce de la muerte", "Golden cross / Death cross",
         "El cruce dorado ocurre cuando la media de 50 sesiones cruza por encima de la de 200; el de la muerte, al "
         "contrario. Ojo: que el precio esté por debajo de la media de 50 no es un cruce de la muerte."),
        ("Tendencia", "Trend",
         "Dirección predominante del precio: alcista, bajista o lateral. Lo que en un día parece un giro, en un año "
         "suele ser ruido."),
        ("Corrección", "Correction",
         "Caída de entre el 10 % y el 20 % desde un máximo reciente, dentro de una tendencia mayor. No equivale a "
         "un cambio de tendencia."),
        ("Volumen", "Volume",
         "Número de acciones negociadas. Un movimiento de precio con volumen alto tiene más credibilidad que el "
         "mismo movimiento con volumen bajo."),
    ]),
    ("Macro y mercados", "mc", [
        ("Inflación", "IPC / HICP",
         "Subida general de precios. En la zona euro se mide con el IPCA armonizado. Importa porque se come la "
         "rentabilidad real y condiciona los tipos de interés."),
        ("Tipo de interés", "Policy rate",
         "El precio oficial del dinero que fija el banco central. Cuando sube, encarece la deuda de las empresas y "
         "presiona a la baja las valoraciones, sobre todo de los negocios que crecen a largo plazo."),
        ("Facilidad de depósito", "Deposit facility rate",
         "El tipo al que los bancos dejan su dinero en el BCE. Es la referencia práctica del suelo de los tipos en "
         "la zona euro."),
        ("Curva de tipos", "Yield curve",
         "Relación entre rentabilidad y plazo de la deuda. Normalmente es ascendente; cuando se invierte, el "
         "mercado descuenta desaceleración."),
        ("Riesgo de divisa", "FX risk",
         "Efecto de mover el tipo de cambio sobre los ingresos y la deuda de una empresa que opera en varias "
         "monedas. Un euro fuerte resta a las exportadoras europeas."),
        ("Materias primas", "Commodities",
         "Petróleo, gas, metales y agrícolas. Marcan los costes de muchas empresas y son termómetro de la actividad "
         "global."),
        ("Liquidez", "Liquidity",
         "Facilidad para comprar o vender sin mover el precio. Se mide con el volumen medio: en valores poco "
         "líquidos, entrar y salir cuesta caro."),
    ]),
    ("Riesgo y regulación", "rr", [
        ("Perfil de riesgo", "Risk profile",
         "El conjunto de tolerancia a las pérdidas, horizonte y situación personal que determina qué cartera "
         "tiene sentido para cada inversor. No es lo mismo tolerar una caída del 20 % que necesitar el dinero en "
         "dos años."),
        ("Idoneidad", "MiFID II",
         "Norma europea que obliga a evaluar si un producto encaja con el perfil del cliente antes de ofrecerlo. "
         "Un test orientativo no sustituye a esa evaluación."),
        ("Diversificación", "Diversification",
         "Repartir el riesgo entre activos que no se mueven igual. Reduce el sobresalto sin reducir "
         "necesariamente la rentabilidad esperada."),
        ("Riesgo sistémico", "Systemic risk",
         "El que afecta a todo el mercado a la vez y no se elimina diversificando."),
    ]),
]


def main() -> None:
    filas = []
    indice = []
    for titulo, ancla, terminos in SECCIONES:
        indice.append(f'<a href="#{ancla}">{titulo}</a>')
        filas.append(f'<h2 id="{ancla}">{titulo}</h2>\n<dl>')
        for nombre, sigla, texto in terminos:
            etiqueta = f'<span class="sig">{sigla}</span>' if sigla else ""
            filas.append(f"<dt>{nombre} {etiqueta}</dt>\n<dd>{texto}</dd>")
        filas.append("</dl>")

    total = sum(len(t[2]) for t in SECCIONES)

    html = f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Glosario de términos financieros · CriterioFinanciero</title>
<meta name="description" content="Glosario claro de {total} términos de inversión: PER, EV/EBITDA, ROE, WACC, DCF, RSI, MACD, bandas de Bollinger, inflación y tipos. Explicados sin jerga.">
<link rel="canonical" href="{SITIO}/glosario/">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
{ESTILO}
</head>
<body>
<header><a href="/">CriterioFinanciero</a></header>
<main>
<h1>Glosario</h1>
<p class="intro">Los {total} términos que aparecen en los análisis y en la newsletter, explicados como se
explicarían en una conversación. Sin jerga innecesaria.</p>
<div class="indice">
  <p>Secciones</p>
  {' '.join(indice)}
</div>
{chr(10).join(filas)}
</main>
<footer>
  <a href="/">Inicio</a><a href="/glosario/">Glosario</a><a href="/aviso-legal/">Aviso legal</a>
  <a href="/privacidad/">Privacidad</a><a href="/cookies/">Cookies</a><a href="/contacto/">Contacto</a>
</footer>
</body>
</html>"""

    destino = RAIZ / "glosario"
    destino.mkdir(exist_ok=True)
    (destino / "index.html").write_text(html, encoding="utf-8")
    print(f"glosario/index.html · {total} términos · {len(html)/1024:.0f} KB")


if __name__ == "__main__":
    main()
