# Auditoría de criteriofinanciero.org

11 de noviembre de 2026 · copia de producción guardada en `index.html` (commit inicial)

## 1. Qué es hoy, técnicamente

| Dato | Valor |
|---|---|
| Alojamiento | Netlify (`75.2.60.5`, CNAME a `criteriofinanciero.netlify.app`) |
| Estructura | **una sola página**: `index.html` de 48 KB |
| Estilos | un `<style>` en línea |
| JavaScript | un `<script>` en línea |
| Fuentes | Google Fonts (Cormorant Garamond, DM Sans, DM Mono) |
| Secciones | 8 (`diferenciador`, `proceso`, `analisis`, `pedido`, `videos`, `sobre`…) |
| Rutas existentes | solo `/`. Todo lo demás, 404. |

No hay Next.js, ni Astro, ni React. Es HTML a mano con CSS y JS propios. **Tenemos el código
completo**: es el archivo que acabo de guardar y versionar.

## 2. Lo que está bien

- El diseño es bueno y el mensaje también: el enfoque "¿para qué quieres el dinero?" diferencia.
- El test de perfil en cuatro fases funciona y está bien planteado.
- El informe de muestra de Indra da credibilidad: enseña el producto antes de pedir dinero.
- El posicionamiento es coherente con tu perfil: asesor independiente, sin productos que vender.

## 3. Lo que no funciona (por orden de gravedad)

### a) La web no captura nada
Hay cuatro campos de formulario, pero **no existe ni un solo `<form>`**, ni `fetch`, ni Netlify
Forms, ni MailerLite. Consecuencias:

- La suscripción a la newsletter **no suscribe a nadie**.
- La solicitud de análisis de 89 € **no llega a ningún sitio**.
- El test de perfil se calcula en el navegador y se pierde al cerrar la pestaña.

Es decir: el embudo tiene el mejor escaparate que vas a tener y la puerta cerrada.

### b) No hay páginas legales
`/aviso-legal/`, `/privacidad/`, `/cookies/` y `/contacto/` devuelven **404**. Vendiendo servicios
y captando correos, es obligatorio (LSSI y RGPD). Y es lo primero que mira un cliente que se
plantea pagar 89 €.

### c) No hay metadatos ni medición
- Sin `meta description`, sin `canonical`, sin Open Graph: al compartir el enlace no sale nada.
- Sin `sitemap.xml` ni `robots.txt`.
- **Sin analítica de ningún tipo**: no sabes cuánta gente entra ni qué sección mira.

### d) "Datos en tiempo real" no es cierto
Aparece dos veces, una junto al informe de muestra gratuito. Si ese informe es estático, la frase
es publicidad engañosa. O se sostiene (generación con datos del día) o se cambia.

## 4. El plan de hace año y medio: qué se queda

| Pieza del plan antiguo | Veredicto |
|---|---|
| Web en Next.js | **Descartado.** Ya hay una web que funciona; Next añade complejidad sin beneficio |
| Scraper con `yfinance` | **Se queda**, pero como script local, no dentro de la web |
| Análisis con API de Claude | **Sustituido** por LM Studio en local: mismo resultado, coste 0 |
| PDFs corporativos | **Se queda**: es el producto que vendes a 89 € |
| Newsletter con Mailchimp/Resend | **Sustituido** por MailerLite (ya lo tienes) |
| Stripe con planes 9/29 € | **Prematuro.** Primero vender packs sueltos; Stripe Payment Links en 10 minutos cuando haya demanda |
| Cursos con vídeo | **Después.** Requiere audiencia primero |
| Avatar IA de Higgsfield (39-99 €/mes) | **Descartado.** Caro y peor que tu propia cara. La voz ya la generamos en local |

Lo importante: **casi todo el plan técnico sigue siendo válido, pero ahora cuesta cero** porque
corre en tu máquina.

## 5. Plan de trabajo

### Hoy (tomar el control)
1. ✅ Copiar producción y versionarla (hecho).
2. Hacer que los formularios funcionen: Netlify Forms para la solicitud de análisis (llega a tu
   panel y a tu correo, sin backend) y MailerLite para la newsletter.
3. Páginas legales: aviso, privacidad, cookies y contacto.
4. Metadatos, sitemap, robots y Open Graph.
5. Consentimiento de cookies y analítica, igual que en euroaeuro.

### Después
6. Página de precios y proceso de compra claro (qué recibe el cliente, en cuánto tiempo).
7. Decidir si la web crece: blog de análisis, páginas por servicio o se queda como landing.
8. Conectar el motor de análisis local (datos + informe + PDF) cuando haya pedidos reales.

## 6. Decisiones pendientes

1. **¿Cómo desplegamos?** Recomiendo conectar Netlify a un repositorio de GitHub: cada `push`
   publica. Alternativa rápida: arrastrar la carpeta a Netlify a mano (funciona, pero es manual).
2. **¿Netlify Forms o MailerLite también para los pedidos?** Mi voto: Netlify Forms para pedidos
   (te llega el aviso y queda registro) y MailerLite solo para la newsletter.
3. **Email profesional**: la web usa `hola@criteriofinanciero.org`. ¿Está creado y funcionando?
4. **Los 89 €**: ¿hay alguien que los haya pagado ya? Si no, hay que validar el precio antes de
   construir toda la maquinaria alrededor.
