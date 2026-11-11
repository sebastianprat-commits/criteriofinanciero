"""Genera las páginas legales, la de gracias, sitemap y robots de criteriofinanciero.org."""
from __future__ import annotations

from datetime import date
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
SITIO = "https://criteriofinanciero.org"
TITULAR = "Sebastián Prat"
NIF = "09004397N"
DOMICILIO = "Avda. Utretch 22, 28514 Nuevo Baztán (Madrid)"
EMAIL = "sebastian.prat@gmail.com"
ACTUALIZADO = "11 de noviembre de 2026"

ESTILO = """<style>
:root{--navy:#0A1628;--gold:#C9963A;--cream:#F7F3EA;--muted:#5A6478}
*{box-sizing:border-box}
body{margin:0;background:var(--cream);color:var(--navy);
     font-family:'DM Sans',system-ui,sans-serif;line-height:1.7;font-size:16.5px}
header{background:var(--navy);padding:18px 24px}
header a{color:var(--gold);text-decoration:none;font-family:'Cormorant Garamond',serif;font-size:22px}
main{max-width:760px;margin:0 auto;padding:48px 24px 72px}
h1{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:500;margin:0 0 8px}
.fecha{color:var(--muted);font-size:14px;margin-bottom:34px}
h2{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:600;margin:36px 0 10px}
p,li{color:#1E2A3D}
table{border-collapse:collapse;width:100%;margin:18px 0;font-size:15px}
th,td{border:1px solid #DCD4C4;padding:10px 12px;text-align:left;vertical-align:top}
th{background:#EDE6D6;font-weight:600}
ul{padding-left:22px}
a{color:#8A6420}
footer{background:var(--navy);color:rgba(255,255,255,.5);padding:26px 24px;font-size:13px;text-align:center}
footer a{color:rgba(255,255,255,.65);text-decoration:none;margin:0 8px}
.cta{display:inline-block;background:var(--gold);color:var(--navy);font-weight:600;
     padding:14px 26px;border-radius:6px;text-decoration:none;margin-top:18px}
</style>"""


def pagina(titulo: str, descripcion: str, cuerpo: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{titulo} · CriterioFinanciero</title>
<meta name="description" content="{descripcion}">
<link rel="canonical" href="{SITIO}/{"{slug}"}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
{ESTILO}
</head>
<body>
<header><a href="/">CriterioFinanciero</a></header>
<main>
{cuerpo}
</main>
<footer>
  <a href="/">Inicio</a><a href="/aviso-legal/">Aviso legal</a>
  <a href="/privacidad/">Privacidad</a><a href="/cookies/">Cookies</a>
  <a href="/contacto/">Contacto</a>
</footer>
</body>
</html>"""


def escribir(slug: str, titulo: str, descripcion: str, cuerpo: str) -> None:
    destino = RAIZ / slug / "index.html" if slug else RAIZ / "index_generado.html"
    destino.parent.mkdir(parents=True, exist_ok=True)
    html = pagina(titulo, descripcion, cuerpo).replace("{slug}", f"{slug}/" if slug else "")
    destino.write_text(html, encoding="utf-8")
    print(f"  {slug or 'raiz'}/index.html")


AVISO = f"""
<h1>Aviso legal</h1>
<p class="fecha">Última actualización: {ACTUALIZADO}</p>
<p>En cumplimiento del artículo 10 de la LSSI-CE:</p>
<ul>
  <li><strong>Titular:</strong> {TITULAR}</li>
  <li><strong>NIF:</strong> {NIF}</li>
  <li><strong>Asociado EFPA España:</strong> nº 35094</li>
  <li><strong>Domicilio:</strong> {DOMICILIO}</li>
  <li><strong>Correo:</strong> {EMAIL}</li>
  <li><strong>Sitio:</strong> criteriofinanciero.org</li>
</ul>

<h2>Actividad</h2>
<p>Este sitio ofrece contenido informativo sobre finanzas e inversión y, previa solicitud, informes
de análisis de activos cotizados. El titular actúa como persona física, está titulado como European
Financial Advisor (EFPA) y asociado a EFPA España con el número 35094, y <strong>no gestiona dinero de terceros, no capta fondos del público ni
ejecuta órdenes de compra o venta</strong>.</p>

<h2>Naturaleza del contenido</h2>
<p>Los análisis publicados son informativos y educativos. No constituyen asesoramiento de inversión
personalizado ni una recomendación de compra o venta de ningún instrumento financiero. No tienen en
cuenta la situación concreta, los objetivos ni la tolerancia al riesgo de ninguna persona.</p>
<p>Los datos utilizados proceden de fuentes públicas y se indican en cada informe junto con su fecha.
Pueden contener errores o quedar desactualizados. El rendimiento pasado no garantiza resultados futuros.</p>

<h2>Servicios de pago y derecho de desistimiento</h2>
<p>Los informes se solicitan a través del formulario del sitio y se abonan por transferencia o Bizum
tras la confirmación del pedido, con factura. El plazo de entrega indicado es de 24 a 48 horas.</p>
<p>Al tratarse de un contenido digital personalizado que se ejecuta a petición del cliente, una vez
iniciada la elaboración del informe <strong>no procede el derecho de desistimiento</strong>
(art. 103.m del Texto Refundido de la Ley General para la Defensa de los Consumidores). Antes de
iniciar el trabajo se informa de ello y se pide conformidad expresa.</p>

<h2>Propiedad intelectual</h2>
<p>Los textos, informes y elementos gráficos son del titular. La compra de un informe otorga al
cliente una licencia de uso personal: no se permite su reventa, publicación íntegra ni redistribución.</p>

<h2>Responsabilidad</h2>
<p>El titular no responde de las decisiones de inversión que el lector tome a partir de este contenido.
Invertir conlleva riesgo de pérdida del capital. El titular tampoco responde de interrupciones del
servicio ni del contenido de sitios enlazados.</p>

<h2>Legislación aplicable</h2>
<p>Legislación española. Para controversias, juzgados y tribunales de Madrid, salvo fuero legal distinto.</p>
"""

PRIVACIDAD = f"""
<h1>Política de privacidad</h1>
<p class="fecha">Última actualización: {ACTUALIZADO}</p>
<p>Responsable: <strong>{TITULAR}</strong>, NIF {NIF}, {DOMICILIO}. Contacto:
<strong>{EMAIL}</strong>.</p>

<h2>Qué datos se tratan</h2>
<table>
<tr><th>Finalidad</th><th>Datos</th><th>Base legal</th><th>Conservación</th></tr>
<tr><td>Atender una solicitud de análisis</td><td>Email, empresa a analizar, producto elegido y el
contexto que escribas</td><td>Ejecución de un contrato</td><td>Mientras dure la relación y el plazo
legal de conservación fiscal (4 años)</td></tr>
<tr><td>Enviar la newsletter</td><td>Email y fecha de alta</td><td>Consentimiento</td><td>Hasta la baja</td></tr>
<tr><td>Medir las visitas</td><td>Datos de navegación e identificadores de cookie</td>
<td>Consentimiento</td><td>Hasta 14 meses</td></tr>
</table>
<p>No se elaboran perfiles comerciales ni se toman decisiones automatizadas con efectos jurídicos.</p>

<h2>Quién más los ve</h2>
<ul>
  <li><strong>Netlify, Inc.</strong> (EEUU) — alojamiento y recepción de los formularios.</li>
  <li><strong>Google Ireland Limited</strong> — analítica web, solo si aceptas las cookies.</li>
  <li><strong>MailerLite Limited</strong> (Irlanda) — envío de la newsletter, cuando esté activa.</li>
  <li><strong>Proveedor de correo electrónico</strong> — para leer y responder tus mensajes.</li>
</ul>
<p>Las transferencias fuera del EEE se amparan en el Marco de Privacidad de Datos UE-EEUU o en
cláusulas contractuales tipo de la Comisión Europea.</p>

<h2>Tus derechos</h2>
<p>Acceso, rectificación, supresión, limitación, oposición y portabilidad. Escríbeme a {EMAIL}
indicando qué derecho ejercitas; respondo en un mes como máximo. Puedes reclamar ante la
<a href="https://www.aepd.es" rel="noopener">Agencia Española de Protección de Datos</a>.</p>

<h2>Seguridad</h2>
<p>El sitio se sirve por HTTPS. Los formularios llegan a Netlify, que aplica cifrado en tránsito y
controles de acceso. Ningún sistema es infalible; se aplican medidas proporcionadas al tamaño del proyecto.</p>

<h2>Cambios</h2>
<p>Si cambia esta política se actualizará la fecha del encabezado.</p>
"""

COOKIES = f"""
<h1>Política de cookies</h1>
<p class="fecha">Última actualización: {ACTUALIZADO}</p>
<p>Una cookie es un archivo pequeño que el sitio guarda en tu navegador. Este sitio usa muy pocas:</p>
<table>
<tr><th>Cookie</th><th>Titular</th><th>Finalidad</th><th>Duración</th></tr>
<tr><td>consentimiento (almacenamiento local)</td><td>Este sitio</td><td>Recordar tu decisión sobre el aviso</td><td>Hasta que borres los datos</td></tr>
<tr><td>_ga</td><td>Google</td><td>Distinguir usuarios para contar visitas</td><td>2 años</td></tr>
<tr><td>_ga_*</td><td>Google</td><td>Mantener el estado de la sesión de analítica</td><td>2 años</td></tr>
</table>
<p>Las de Google <strong>solo se cargan si pulsas «Aceptar»</strong>. Si eliges «Solo lo necesario» no
se envía ningún dato a Google.</p>
<p>No hay cookies publicitarias ni de redes sociales.</p>

<h2>Cómo cambiar de opinión</h2>
<p>Borra los datos del sitio en tu navegador y el aviso volverá a aparecer. También puedes bloquear
cookies en la configuración de
<a href="https://support.google.com/chrome/answer/95647" rel="noopener">Chrome</a>,
<a href="https://support.mozilla.org/es/kb/borrar-cookies-y-datos-sitios-firefox" rel="noopener">Firefox</a>,
<a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" rel="noopener">Safari</a> o
<a href="https://support.microsoft.com/es-es/microsoft-edge" rel="noopener">Edge</a>.</p>
<p>Más detalle sobre los datos en la <a href="/privacidad/">política de privacidad</a>.</p>
"""

CONTACTO = f"""
<h1>Contacto</h1>
<p>Para consultas sobre los informes, el proceso de asesoría o cualquier duda:</p>
<p style="font-size:24px;font-weight:500;margin:22px 0">
  <a href="mailto:{EMAIL}">{EMAIL}</a>
</p>
<p>{TITULAR} · NIF {NIF} · {DOMICILIO}</p>

<h2>Antes de escribir</h2>
<p>Para solicitar un informe, usa el formulario de la <a href="/#pedido">página principal</a>: llega
con todos los datos y evita idas y vueltas.</p>
<p>Si tu consulta es sobre tu situación personal concreta, ten en cuenta que este sitio no presta
asesoramiento personalizado. Puedo decirte qué analiza un informe o cómo funciona el proceso, pero no
qué producto contratar ni cómo invertir tu dinero.</p>

<h2>Plazo de respuesta</h2>
<p>Dos o tres días laborables. Los pedidos de análisis se confirman en menos de 24 horas.
</p>
"""

GRACIAS = """
<h1>Recibido</h1>
<p class="fecha">Gracias por escribir. Falta un paso para que no se pierda nada.</p>

<p><strong>Si has pedido un análisis</strong>, este es el paso importante: los formularios a veces fallan
y no quiero que tu solicitud se quede en un cajón. Pulsa aquí y me llega directamente:</p>

<a class="cta" href="mailto:sebastian.prat@gmail.com?subject=Pedido%20de%20an%C3%A1lisis&body=Hola%20Sebasti%C3%A1n%2C%0A%0AQuiero%20un%20an%C3%A1lisis%20de%3A%20%0A%0A%C2%B7%20Empresa%3A%20%0A%C2%B7%20Qu%C3%A9%20quiero%20saber%3A%20%0A%0AGracias.">Enviar mi pedido por correo →</a>

<p style="margin-top:1.4rem">Con ese correo te respondo en menos de 24 horas con la confirmación del
pedido, el importe con el descuento de lanzamiento y los datos para pagar por transferencia o Bizum.
El informe se entrega en 24-48 horas desde el pago.</p>

<p style="font-size:.85rem;color:var(--muted)">El botón abre tu programa de correo con el mensaje ya
escrito. Solo tienes que completar la empresa y enviarlo.</p>

<h2>Si te has suscrito a la newsletter</h2>
<p>Recibirás un correo para confirmar la suscripción. Hasta que no lo confirmes no te llegará nada.
Revisa la carpeta de spam la primera vez: es donde suele caer el primer envío.</p>

<p>Mientras tanto, puedes <a href="/repositorio/">ver los análisis publicados</a>,
<a href="/descargas/informe-muestra-indra.pdf">descargar el informe de muestra</a> o volver al
<a href="/">inicio</a>.</p>
"""


def main() -> None:
    print("Generando páginas:")
    escribir("aviso-legal", "Aviso legal", "Titular, condiciones y responsabilidad de CriterioFinanciero.", AVISO)
    escribir("privacidad", "Política de privacidad", "Qué datos se tratan y cómo ejercer tus derechos.", PRIVACIDAD)
    escribir("cookies", "Política de cookies", "Cookies usadas en criteriofinanciero.org y cómo rechazarlas.", COOKIES)
    escribir("contacto", "Contacto", "Cómo escribir a CriterioFinanciero.", CONTACTO)
    escribir("gracias", "Gracias", "Confirmación de tu solicitud.", GRACIAS)

    hoy = date.today().isoformat()
    sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>{SITIO}/</loc><lastmod>{hoy}</lastmod><priority>1.0</priority></url>
  <url><loc>{SITIO}/contacto/</loc><lastmod>{hoy}</lastmod><priority>0.6</priority></url>
  <url><loc>{SITIO}/aviso-legal/</loc><lastmod>{hoy}</lastmod><priority>0.3</priority></url>
  <url><loc>{SITIO}/privacidad/</loc><lastmod>{hoy}</lastmod><priority>0.3</priority></url>
  <url><loc>{SITIO}/cookies/</loc><lastmod>{hoy}</lastmod><priority>0.3</priority></url>
</urlset>
"""
    (RAIZ / "sitemap.xml").write_text(sitemap, encoding="utf-8")
    (RAIZ / "robots.txt").write_text(
        f"User-agent: *\nAllow: /\nSitemap: {SITIO}/sitemap.xml\n", encoding="utf-8")
    print("  sitemap.xml, robots.txt")


if __name__ == "__main__":
    main()
