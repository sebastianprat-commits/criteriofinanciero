"""Sección de Informes, enlace a euroaeuro y ajustes de pago y muestra."""
import re
from pathlib import Path

P = Path(r"C:\AI\Proyectos\Web\criteriofinanciero\index.html")
H = P.read_text(encoding="utf-8")


def cambiar(viejo, nuevo, etiqueta):
    global H
    if nuevo in H:
        print(f"  ya aplicado: {etiqueta}")
        return
    if viejo not in H:
        print(f"  AVISO no encontrado: {etiqueta}")
        return
    H = H.replace(viejo, nuevo, 1)
    print(f"  aplicado: {etiqueta}")


# ---------------------------------------------------------------- 1. nota de pago arriba
cambiar(
    '''<button class="btn-primary" type="submit" style="width:100%;justify-content:center">Solicitar análisis →</button>
      </form>
      <p style="font-size:.75rem;color:var(--muted);margin-top:.75rem;text-align:center">Pago por Bizum al +34 686 875 142 tras la confirmación. Factura incluida.</p>''',
    '''<p style="font-size:.86rem;color:var(--navy);margin:0 0 .8rem;text-align:center;line-height:1.5">
        <strong>Pago por Bizum</strong> al +34 686 875 142 tras la confirmación · Factura incluida
      </p>
      <button class="btn-primary" type="submit" style="width:100%;justify-content:center">Solicitar análisis →</button>
      </form>''',
    "nota de pago sobre el botón",
)

# ---------------------------------------------------------------- 2. muestra: solo "Ver informe"
cambiar(
    '''<div class="kpi" style="display:flex;flex-direction:column;justify-content:center"><div class="kpi-label">Rango estimado</div><div class="kpi-val" style="font-size:1.05rem">44,35 – 79,51 €</div><a href="/descargas/informe-muestra-indra.pdf" download style="font-size:.78rem;color:#8A6420;text-decoration:underline;margin-top:4px">Ver informe</a></div>''',
    '''<div class="kpi" style="display:flex;flex-direction:column;justify-content:center"><a href="/descargas/informe-muestra-indra.pdf" download style="font-size:1.15rem;font-weight:600;color:#8A6420;text-decoration:none;letter-spacing:.02em">Ver informe →</a></div>''',
    "muestra sin rango",
)

# ---------------------------------------------------------------- 3. pestaña Informes
cambiar(
    '<li><a href="#analisis">Análisis</a></li>',
    '<li><a href="#analisis">Análisis</a></li>\n        <li><a href="#informes">Informes</a></li>',
    "pestaña Informes",
)

SECCION = '''
<!-- INFORMES -->
<section class="informes" id="informes" style="padding:5rem 0;background:var(--white)">
  <div style="max-width:1100px;margin:0 auto;padding:0 2rem">
    <span class="section-label">Informes publicados</span>
    <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:2rem;flex-wrap:wrap;margin-bottom:2rem">
      <h2 style="font-family:var(--serif);font-size:clamp(1.6rem,2.5vw,2.2rem);color:var(--navy);font-weight:500;margin:0">
        Análisis ya escritos, listos para descargar</h2>
      <a href="/repositorio/" style="font-size:.9rem;color:#8A6420">Ver todos →</a>
    </div>
    <div id="lista-informes" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.2rem">
      <p style="color:var(--muted);font-size:.9rem">Cargando informes…</p>
    </div>
  </div>
</section>

<script>
(function () {
  var caja = document.getElementById('lista-informes');
  if (!caja) return;

  function euros(v) {
    var t = Number(v).toFixed(2).replace('.', ',');
    return t.endsWith(',00') ? t.slice(0, -3) : t;
  }

  fetch('/repositorio/datos.json')
    .then(function (r) { return r.json(); })
    .then(function (lista) {
      if (!lista.length) {
        caja.innerHTML = '<p style="color:var(--muted);font-size:.9rem">El primer informe estará aquí en cuanto se publique.</p>';
        return;
      }
      caja.innerHTML = lista.slice(0, 6).map(function (i) {
        var fecha = i.fecha.split('-').reverse().join('/');
        var nuevo = i.dias <= 7
          ? '<span style="position:absolute;top:-9px;right:14px;background:#C9963A;color:#0A1628;'
            + 'font-size:10.5px;font-weight:700;letter-spacing:.08em;padding:3px 9px;border-radius:10px;'
            + 'text-transform:uppercase">¡Nuevo!</span>'
          : '';
        return '<a href="/checkout/?ref=' + encodeURIComponent(i.slug) + '" style="position:relative;display:block;'
          + 'background:#F7F3EA;border:1px solid #E3DCCB;border-radius:10px;padding:20px 22px;'
          + 'text-decoration:none;color:inherit">' + nuevo
          + '<div style="font-family:var(--serif);font-size:1.15rem;color:#0A1628;margin-bottom:2px">'
          + i.nombre + '</div>'
          + '<div style="font-size:12px;color:#5A6478;margin-bottom:12px">' + i.ticker + ' · ' + fecha + '</div>'
          + '<div style="font-size:13px;color:#3A4459">Cotización en el informe <strong>'
          + (i.precio_accion || 'n/d') + ' €</strong></div>'
          + '<div style="display:flex;align-items:baseline;gap:8px;margin-top:14px;padding-top:12px;'
          + 'border-top:1px solid #E3DCCB">'
          + '<span style="font-family:var(--serif);font-size:1.5rem;font-weight:600;color:#0A1628">'
          + euros(i.precio_informe) + ' €</span>'
          + '<span style="font-size:12px;color:#A9A292;text-decoration:line-through">89 €</span>'
          + '<span style="font-size:11px;background:#ECFDF5;color:#06614A;padding:2px 7px;border-radius:4px">−25 %</span>'
          + '</div></a>';
      }).join('');
    })
    .catch(function () {
      caja.innerHTML = '<p style="color:var(--muted);font-size:.9rem">No se han podido cargar los informes. '
        + '<a href="/repositorio/" style="color:#8A6420">Verlos en el catálogo</a>.</p>';
    });
})();
</script>
'''

cambiar("<!-- NEWSLETTER -->", SECCION + "<!-- NEWSLETTER -->", "sección de Informes")

# ---------------------------------------------------------------- 4. enlace a euroaeuro
cambiar(
    '<a href="/contacto/">Contacto</a>',
    '<a href="/contacto/">Contacto</a>\n        <a href="https://euroaeuro.eu" rel="noopener" '
    'style="color:inherit;text-decoration:none">euroaeuro.eu</a>',
    "enlace a euroaeuro en el pie",
)

P.write_text(H, encoding="utf-8")
print(f"\nindex.html guardado ({len(H)/1024:.0f} KB)")
