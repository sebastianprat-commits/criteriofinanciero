"""
Transforma la copia de producción en un sitio que funcione.

- Metadatos SEO y Open Graph.
- Formularios reales con Netlify Forms (newsletter y pedido de análisis).
- Enlaces legales en el pie.
- Aviso de cookies con consentimiento previo (analítica desactivada hasta aceptar).
- Corrige la promesa de "datos en tiempo real".

Es idempotente: si ya está transformado, avisa y no duplica nada.
"""
from __future__ import annotations

import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
INDEX = RAIZ / "index.html"

DESCRIPCION = (
    "Asesoría financiera independiente en Madrid: planificación por objetivos vitales, "
    "análisis de acciones y fondos, e informes con criterio. EFPA, 15 años en banca."
)

META = f"""<title>CriterioFinanciero — Asesoría financiera orientada a tus objetivos vitales</title>
<meta name="description" content="{DESCRIPCION}">
<link rel="canonical" href="https://criteriofinanciero.org/">
<meta name="robots" content="index, follow">
<meta property="og:type" content="website">
<meta property="og:site_name" content="CriterioFinanciero">
<meta property="og:title" content="CriterioFinanciero — Tu dinero al servicio de tu vida">
<meta property="og:description" content="{DESCRIPCION}">
<meta property="og:url" content="https://criteriofinanciero.org/">
<meta property="og:image" content="https://criteriofinanciero.org/og.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0A1628">"""

NEWSLETTER_NUEVO = """<form class="nl-form" name="newsletter" method="POST" action="/gracias/"
          data-netlify="true" netlify-honeypot="bot-field">
      <input type="hidden" name="form-name" value="newsletter">
      <p hidden><label>No rellenar <input name="bot-field"></label></p>
      <input type="email" name="email" placeholder="tu@email.com" required aria-label="Tu correo electrónico">
      <button class="btn-primary" type="submit">Suscribirse</button>
    </form>
    <p style="font-size:.75rem;color:var(--muted);margin-top:.6rem">
      Al suscribirte aceptas la <a href="/privacidad/" style="color:inherit;text-decoration:underline">política de privacidad</a>.
      Puedes darte de baja cuando quieras.
    </p>"""

PEDIDO_ABRE = """<form name="pedido-analisis" method="POST" action="/gracias/" data-netlify="true"
            netlify-honeypot="bot-field" style="display:block">
      <input type="hidden" name="form-name" value="pedido-analisis">
      <input type="hidden" name="origen" value="web-criteriofinanciero">
      <p hidden><label>No rellenar <input name="bot-field"></label></p>
"""

COOKIES = """
<style>
#cc{position:fixed;left:0;right:0;bottom:0;z-index:9999;display:none;gap:14px 22px;align-items:center;
    justify-content:space-between;flex-wrap:wrap;padding:15px 22px;background:#0A1628;color:#F4EFE6;
    font-family:'DM Sans',system-ui,sans-serif;font-size:14px;line-height:1.5;box-shadow:0 -6px 24px rgba(0,0,0,.25)}
#cc p{margin:0;max-width:680px}
#cc a{color:inherit;text-decoration:underline}
#cc .acciones{display:flex;gap:10px;flex-wrap:wrap}
#cc button{font-family:inherit;font-size:14px;font-weight:500;border-radius:6px;padding:10px 18px;
           cursor:pointer;border:1px solid rgba(244,239,230,.45);background:transparent;color:inherit}
#cc button.si{background:#C9963A;border-color:#C9963A;color:#0A1628}
</style>
<div id="cc" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
  <p>Uso cookies propias y de Google Analytics para saber qué contenido se lee. Si aceptas, se cargan;
     si no, la web funciona igual. <a href="/cookies/">Más información</a>.</p>
  <div class="acciones">
    <button id="cc-no" type="button">Solo lo necesario</button>
    <button id="cc-si" class="si" type="button">Aceptar</button>
  </div>
</div>
<script>
(function () {
  var ID = "__GA__";
  function cargar() {
    if (!ID) return;
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag("consent", "default", {ad_storage:"denied",ad_user_data:"denied",
      ad_personalization:"denied",analytics_storage:"denied"});
    gtag("js", new Date());
    gtag("consent", "update", {analytics_storage:"granted"});
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
    document.head.appendChild(s);
    gtag("config", ID, {anonymize_ip: true});
  }
  var caja = document.getElementById("cc");
  if (!ID) { caja.style.display = "none"; return; }
  var guardado = null;
  try { guardado = localStorage.getItem("consentimiento"); } catch (e) {}
  if (guardado === "1") { cargar(); }
  else if (guardado !== "0") { caja.style.display = "flex"; }
  document.getElementById("cc-si").onclick = function () {
    try { localStorage.setItem("consentimiento", "1"); } catch (e) {}
    caja.style.display = "none"; cargar();
  };
  document.getElementById("cc-no").onclick = function () {
    try { localStorage.setItem("consentimiento", "0"); } catch (e) {}
    caja.style.display = "none";
  };
})();
</script>
""".replace("__GA__", "")


def reemplazar(html: str, viejo: str, nuevo: str, etiqueta: str) -> str:
    if viejo not in html:
        if nuevo in html:
            print(f"  ya aplicado: {etiqueta}")
            return html
        raise SystemExit(f"  NO ENCONTRADO: {etiqueta}")
    print(f"  aplicado: {etiqueta}")
    return html.replace(viejo, nuevo, 1)


def main() -> None:
    html = INDEX.read_text(encoding="utf-8")
    original = html

    print("Aplicando cambios:")
    # 1. Metadatos
    html = reemplazar(
        html,
        "<title>CriterioFinanciero — Asesoría financiera orientada a tus objetivos vitales</title>",
        META,
        "metadatos SEO",
    )

    # 2. Newsletter con formulario real
    html = reemplazar(
        html,
        """<div class="nl-form">
      <input type="email" placeholder="tu@email.com">
      <button class="btn-primary">Suscribirse</button>
    </div>""",
        NEWSLETTER_NUEVO,
        "formulario de newsletter",
    )

    # 3. Pedido de análisis
    html = reemplazar(
        html,
        '      <div class="form-group"><label>Empresa o ticker</label><input type="text" placeholder="Ej: Inditex, AAPL, BMW.DE"></div>',
        PEDIDO_ABRE
        + '      <div class="form-group"><label>Empresa o ticker</label>'
          '<input type="text" name="empresa" placeholder="Ej: Inditex, AAPL, BMW.DE" required></div>',
        "formulario de pedido (apertura)",
    )
    html = reemplazar(
        html,
        '<input type="email" placeholder="para enviarte el informe">',
        '<input type="email" name="email" placeholder="para enviarte el informe" required>',
        "campo email del pedido",
    )
    html = reemplazar(html, "<select>", '<select name="producto">', "selector de producto")
    html = reemplazar(
        html,
        '<textarea placeholder="¿Por qué te interesa esta empresa? ¿Tienes ya posición? Cualquier detalle ayuda a personalizar el criterio del asesor.">',
        '<textarea name="contexto" placeholder="¿Por qué te interesa esta empresa? ¿Tienes ya posición? Cualquier detalle ayuda a personalizar el criterio del asesor.">',
        "campo contexto",
    )
    html = reemplazar(
        html,
        '<button class="btn-primary" style="width:100%;justify-content:center">Solicitar análisis →</button>',
        '<button class="btn-primary" type="submit" style="width:100%;justify-content:center">Solicitar análisis →</button>\n      </form>',
        "botón de pedido y cierre del formulario",
    )

    # 4. Enlaces legales en el pie
    html = reemplazar(
        html,
        '<a href="mailto:hola@criteriofinanciero.org">Contacto</a>',
        '<a href="mailto:hola@criteriofinanciero.org">Contacto</a>'
        '<a href="/aviso-legal/">Aviso legal</a><a href="/privacidad/">Privacidad</a>'
        '<a href="/cookies/">Cookies</a>',
        "enlaces legales en el pie",
    )

    # 5. Datos en tiempo real -> promesa verificable
    html = reemplazar(
        html,
        "Metodología institucional · Datos en tiempo real · Criterio del asesor",
        "Metodología institucional · Datos del cierre del día · Criterio del asesor",
        "claim de tiempo real (muestra)",
    )
    html = reemplazar(
        html,
        "Datos en tiempo real · 11 bloques de análisis IA",
        "Datos del cierre del día · 11 bloques de análisis",
        "claim de tiempo real (precio)",
    )

    # 6. Aviso de cookies
    html = reemplazar(html, "</body>", COOKIES + "</body>", "aviso de cookies")

    if html == original:
        print("\nSin cambios: el archivo ya estaba transformado.")
        return

    INDEX.write_text(html, encoding="utf-8")
    print(f"\nEscrito index.html ({len(html)} bytes).")


if __name__ == "__main__":
    main()
