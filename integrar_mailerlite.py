"""Sustituye la newsletter de Netlify Forms por MailerLite (formulario 203841029310252380)."""
from pathlib import Path

RAIZ = Path(__file__).resolve().parent
INDEX = RAIZ / "index.html"

ACCION = "https://assets.mailerlite.com/jsonp/2784740/forms/203841029310252380/subscribe"

VIEJO = """<form class="nl-form" name="newsletter" method="POST" action="/gracias/"
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

NUEVO = f"""<form class="nl-form" id="nl-form" method="post" action="{ACCION}">
      <input type="email" id="nl-email" name="fields[email]" placeholder="tu@email.com" required
             aria-label="Tu correo electrónico" autocomplete="email">
      <button class="btn-primary" type="submit" id="nl-boton">Suscribirse</button>
    </form>
    <p id="nl-estado" style="font-size:.85rem;margin-top:.7rem;display:none"></p>
    <div id="nl-ok" style="display:none;text-align:center;margin-top:.5rem">
      <p style="font-weight:500;margin:0 0 .35rem">Gracias. Te hemos enviado un correo para confirmar la suscripción.</p>
      <p style="font-size:.8rem;color:var(--muted);margin:0">Hasta que no lo confirmes no recibirás nada. Revisa spam la primera vez.</p>
    </div>
    <p style="font-size:.75rem;color:var(--muted);margin-top:.6rem">
      Al suscribirte aceptas la <a href="/privacidad/" style="color:inherit;text-decoration:underline">política de privacidad</a>.
      Puedes darte de baja cuando quieras.
    </p>
    <script>
    (function () {{
      var form = document.getElementById("nl-form");
      if (!form) return;
      var email = document.getElementById("nl-email");
      var boton = document.getElementById("nl-boton");
      var estado = document.getElementById("nl-estado");
      var ok = document.getElementById("nl-ok");
      var textoBoton = boton.textContent;

      function aviso(t) {{
        estado.textContent = t;
        estado.style.display = "block";
        boton.disabled = false;
        boton.textContent = textoBoton;
      }}

      form.addEventListener("submit", function (ev) {{
        ev.preventDefault();
        if (!email.value.trim()) return;
        boton.disabled = true;
        boton.textContent = "Enviando…";
        estado.style.display = "none";

        var datos = new URLSearchParams();
        datos.set("fields[email]", email.value.trim());
        datos.set("ml-submit", "1");
        datos.set("anticsrf", "true");

        fetch(form.action, {{
          method: "POST",
          body: datos,
          mode: "cors",
          headers: {{ "Accept": "application/json" }}
        }})
          .then(function (r) {{ return r.json(); }})
          .then(function (j) {{
            if (j && j.success) {{
              form.style.display = "none";
              ok.style.display = "block";
            }} else {{
              aviso("No hemos podido completar la suscripción. Revisa que el correo esté bien escrito.");
            }}
          }})
          .catch(function () {{
            aviso("No hemos podido conectar. Inténtalo de nuevo en unos segundos.");
          }});
      }});
    }})();
    </script>"""

html = INDEX.read_text(encoding="utf-8")

if "203841029310252380" in html:
    print("Ya está integrado MailerLite; nada que hacer.")
elif VIEJO in html:
    INDEX.write_text(html.replace(VIEJO, NUEVO, 1), encoding="utf-8")
    print("Newsletter migrada a MailerLite.")
else:
    raise SystemExit("No encuentro el formulario de newsletter. Revisa el estado del index.html.")
