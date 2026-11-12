"""Pone el sitio en modo pruebas: sin venta, con aviso y captación de interesados."""
from pathlib import Path

SITIO = Path(r"C:\AI\Proyectos\Web\criteriofinanciero")
ML = "https://assets.mailerlite.com/jsonp/2784740/forms/203841029310252380/subscribe"

# ---------------------------------------------------------------- index
P = SITIO / "index.html"
H = P.read_text(encoding="utf-8")

BANNER = '''
<div style="background:#C9963A;color:#0A1628;text-align:center;padding:9px 16px;font-size:13.5px;
     font-weight:500;letter-spacing:.01em">
  Web en pruebas · Los informes todavía no están a la venta. Déjame tu correo y te aviso el día que abra.
</div>
'''

if "Web en pruebas" in H:
    print("  aviso ya presente en la portada")
else:
    H = H.replace("<body>", "<body>" + BANNER, 1)
    print("  aviso añadido a la portada")

# formulario de pedido -> lista de espera
inicio = H.find('<form name="pedido-analisis"')
if inicio < 0:
    print("  aviso: no encuentro el formulario de pedido")
else:
    fin = H.find("</form>", inicio) + len("</form>")
    FORM = '''<div style="background:#F7F3EA;border:1px solid #E3DCCB;border-radius:10px;padding:26px 24px">
        <h3 style="font-family:var(--serif);font-size:1.5rem;color:var(--navy);margin:0 0 .6rem">
          Todavía no está a la venta</h3>
        <p style="font-size:.92rem;line-height:1.65;color:#3A4459;margin:0 0 1.1rem">
          Estoy terminando el sistema de informes y la web está en pruebas. Si quieres que te avise
          el día que abra, déjame tu correo: te escribiré una vez, sin compromiso y sin pagos.
        </p>
        <form id="espera-form" style="display:flex;gap:.5rem;flex-wrap:wrap">
          <input id="espera-email" type="email" required placeholder="tu@email.com"
                 style="flex:1;min-width:200px;padding:13px 15px;border:1px solid #D9DEE6;
                 border-radius:6px;font-size:15px">
          <button type="submit" style="background:var(--navy);color:#fff;border:none;border-radius:6px;
                  padding:13px 22px;font-size:15px;font-weight:600;cursor:pointer">Avísame</button>
        </form>
        <p id="espera-estado" style="font-size:.85rem;margin:.7rem 0 0"></p>
        <p style="font-size:.74rem;color:var(--muted);margin:.4rem 0 0">
          Al dejarme el correo aceptas la <a href="/privacidad/" style="color:inherit">política de
          privacidad</a>. Solo lo uso para avisarte del lanzamiento.
        </p>
      </div>
      <script>
      (function () {
        var f = document.getElementById('espera-form');
        if (!f) return;
        f.addEventListener('submit', function (ev) {
          ev.preventDefault();
          var email = document.getElementById('espera-email');
          var estado = document.getElementById('espera-estado');
          var boton = f.querySelector('button');
          if (!email.value.trim()) return;
          boton.disabled = true; boton.textContent = 'Enviando…';
          var datos = new URLSearchParams();
          datos.set('fields[email]', email.value.trim());
          datos.set('ml-submit', '1');
          datos.set('anticsrf', 'true');
          fetch('__ML__', { method: 'POST', body: datos, mode: 'cors',
                            headers: { 'Accept': 'application/json' } })
            .then(function (r) { return r.json(); })
            .then(function (j) {
              if (j && j.success) {
                f.style.display = 'none';
                estado.innerHTML = '<strong>Apuntado.</strong> Te aviso el día que abra.';
                estado.style.color = '#06614A';
              } else {
                boton.disabled = false; boton.textContent = 'Avísame';
                estado.textContent = 'No hemos podido completar el registro. Revisa el correo.';
                estado.style.color = '#B23A3A';
              }
            })
            .catch(function () {
              boton.disabled = false; boton.textContent = 'Avísame';
              estado.textContent = 'No hemos podido conectar. Inténtalo de nuevo.';
              estado.style.color = '#B23A3A';
            });
        });
      })();
      </script>'''.replace("__ML__", ML)
    H = H[:inicio] + FORM + H[fin:]
    print("  formulario de pedido sustituido por lista de espera")

# el botón del resultado del test y el de la muestra
H = H.replace(
    '<button class="m-next" onclick="cerrarOnboarding();window.location.href=\'/repositorio/\'">Aprovechar la oferta →</button>',
    '<button class="m-next" onclick="cerrarOnboarding();document.getElementById(\'espera-form\').scrollIntoView({behavior:\'smooth\'})">Avísame cuando abra →</button>',
)
H = H.replace(
    '<a href="#pedido" class="btn-primary" style="white-space:nowrap">Solicitar análisis →</a>',
    '<a href="#pedido" class="btn-primary" style="white-space:nowrap">Avísame →</a>',
)
print("  llamadas a la acción ajustadas")

# fuera la oferta y los precios de la portada mientras esté cerrado
for viejo, nuevo in [
    ('<div class="precio-val" style="display:flex;align-items:baseline;gap:.6rem;justify-content:flex-end">'
     '<span style="font-size:.9rem;color:rgba(255,255,255,.45);text-decoration:line-through">89 €</span>'
     '<span>66,75 €</span></div>',
     '<div class="precio-val" style="font-size:1.1rem;color:rgba(255,255,255,.6)">Próximamente</div>'),
]:
    if viejo in H:
        H = H.replace(viejo, nuevo, 1)
        print("  precio sustituido por «Próximamente»")

P.write_text(H, encoding="utf-8")

# ---------------------------------------------------------------- repositorio y checkout
R = SITIO / "generar_repositorio.py"
RT = R.read_text(encoding="utf-8")

if "MODO_PRUEBAS" in RT:
    print("  repositorio ya en modo pruebas")
else:
    RT = RT.replace('PROMO_LANZAMIENTO = 0.25',
                    'PROMO_LANZAMIENTO = 0.25\n\n# Si está en True, el catálogo no vende: solo avisa del lanzamiento.\nMODO_PRUEBAS = True', 1)
    RT = RT.replace(
        '<a class="btn" href="{enlace}">Comprar este informe</a>',
        '<span class="btn" style="background:#E3DCCB;color:#5A6478;cursor:default">Disponible próximamente</span>', 1)
    RT = RT.replace(
        '''  <strong>El precio baja con el tiempo.</strong>''',
        '''  <strong>Catálogo en pruebas.</strong> Estos son los informes que habrá disponibles en el lanzamiento.
  Todavía no se pueden comprar: la web está en fase de preparación.<br><br>
  <strong>El precio bajará con el tiempo.</strong>''', 1)
    R.write_text(RT, encoding="utf-8")
    print("  repositorio en modo pruebas")

C = SITIO / "generar_checkout.py"
CT = C.read_text(encoding="utf-8")
if "Aún no está abierto" in CT:
    print("  checkout ya avisa")
else:
    CT = CT.replace(
        '  <h1>Finalizar compra</h1>',
        '''  <h1>Todavía no está abierto</h1>
  <div style="background:#fff;border:1px solid #E3DCCB;border-radius:10px;padding:26px 28px;margin-bottom:24px">
    <p style="margin:0 0 10px;font-size:16px;line-height:1.7">La web está en pruebas y los informes
    todavía no se pueden comprar.</p>
    <p style="margin:0;font-size:14px;color:#5A6478">Si quieres que te avise el día del lanzamiento,
    deja tu correo en la <a href="/#pedido" style="color:#8A6420">página principal</a>.</p>
  </div>''', 1)
    CT = CT.replace('  <div class="resumen" id="resumen">', '  <div class="resumen" id="resumen" style="display:none">', 1)
    CT = CT.replace('  <form name="compra-informe"', '  <form name="compra-informe" style="display:none"', 1)
    C.write_text(CT, encoding="utf-8")
    print("  checkout en modo aviso")
