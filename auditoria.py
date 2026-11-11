"""Auditoría rápida del sitio criteriofinanciero.org: HTML, formularios, scripts y rutas."""
from __future__ import annotations

import re
from urllib.parse import urljoin, urlparse

import httpx

BASE = "https://criteriofinanciero.org"
cliente = httpx.Client(timeout=25.0, follow_redirects=True,
                       headers={"User-Agent": "Mozilla/5.0 (auditoria)"})


def estado(ruta: str) -> tuple[int, int]:
    try:
        r = cliente.get(urljoin(BASE, ruta))
        return r.status_code, len(r.content)
    except Exception as exc:
        return 0, 0


print("=== PORTADA ===")
r = cliente.get(BASE)
html = r.text
print("status:", r.status_code, "| bytes:", len(r.content), "| server:", r.headers.get("server"))

print("\n=== SEO BÁSICO ===")
for patron, etiqueta in [
    (r"<title>(.*?)</title>", "title"),
    (r'<meta\s+name="description"\s+content="([^"]*)"', "description"),
    (r'<link\s+rel="canonical"\s+href="([^"]*)"', "canonical"),
    (r'<meta\s+property="og:title"\s+content="([^"]*)"', "og:title"),
]:
    m = re.search(patron, html, re.I | re.S)
    print(f"  {etiqueta}: {m.group(1).strip()[:110] if m else 'NO'}")

print("\n=== TECNOLOGÍA ===")
pistas = {
    "Next.js": "_next/" in html,
    "Astro": "astro-island" in html or "astro-" in html,
    "React/Vite": "/assets/index-" in html,
    "Google Analytics": "gtag(" in html or "googletagmanager.com/gtag" in html,
    "GTM": "googletagmanager.com/gtm" in html,
    "Plausible": "plausible.io" in html,
    "Stripe": "js.stripe.com" in html,
}
for nombre, presente in pistas.items():
    print(f"  {nombre}: {'sí' if presente else 'no'}")

print("\n=== SCRIPTS EXTERNOS ===")
for src in sorted(set(re.findall(r'<script[^>]+src="([^"]+)"', html))):
    print("  ", src[:120])

print("\n=== FORMULARIOS ===")
for form in re.findall(r"<form\b.*?</form>", html, re.I | re.S):
    accion = re.search(r'action="([^"]*)"', form)
    metodo = re.search(r'method="([^"]*)"', form)
    campos = re.findall(r'<(?:input|textarea|select)[^>]*name="([^"]+)"', form)
    print(f"  action={accion.group(1) if accion else '(sin action)'} method={metodo.group(1) if metodo else '?'}")
    print(f"    campos: {', '.join(campos) or '(ninguno)'}")

print("\n=== ENLACES INTERNOS ===")
rutas = set()
for href in re.findall(r'href="([^"]+)"', html):
    p = urlparse(urljoin(BASE, href))
    if p.netloc.endswith("criteriofinanciero.org"):
        rutas.add(p.path or "/")
for ruta in sorted(rutas):
    print("  ", ruta)

print("\n=== RUTAS CLAVE ===")
for ruta in ["/aviso-legal/", "/privacidad/", "/cookies/", "/contacto/", "/blog/",
             "/sitemap.xml", "/robots.txt", "/sobre/", "/analisis/"]:
    codigo, tam = estado(ruta)
    print(f"  {ruta:16} -> {codigo} ({tam} bytes)")
