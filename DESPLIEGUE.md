# Cómo publicar criteriofinanciero.org

## Lo primero: usar el proyecto correcto

En Netlify hay (al menos) dos proyectos:

- El que tiene el dominio `criteriofinanciero.org` — **es donde hay que publicar**.
- `spectacular-muffin-5bd5d9` — un proyecto nuevo creado por error al arrastrar la carpeta.

En la lista de proyectos, el que tiene dominio lo muestra bajo el nombre. Si dudas, abre cada uno y
mira **Domain management**.

## Publicar (arrastrando, 2 minutos)

1. Abre el proyecto que tiene el dominio.
2. Pestaña **Deploys**.
3. Botón **Deploy manually** (o la zona de arrastre al final de la página).
4. Arrastra la carpeta `C:\AI\Proyectos\Web\criteriofinanciero` **entera**.

Espera el deploy y comprueba:

- `https://criteriofinanciero.org/aviso-legal/` carga.
- `https://criteriofinanciero.org/sitemap.xml` muestra el XML.
- El pie tiene Aviso legal · Privacidad · Cookies.

## Después del primer deploy: activar avisos de formularios

Netlify detecta los formularios al desplegar. Una vez desplegado:

1. En el proyecto: **Forms** → deben aparecer `pedido-analisis` y `newsletter`.
2. **Forms → Form notifications → Add notification → Email notification**.
3. Destinatario: `sebastian.prat@gmail.com`.
4. Repite para cada formulario.

Sin ese paso, los envíos se guardan en el panel pero **no te llega ningún aviso**.

## Qué hay en la carpeta

```
index.html          portada completa (formularios, consentimiento, metadatos)
assets/img/         foto del asesor
aviso-legal/        páginas legales
privacidad/
cookies/
contacto/
gracias/            destino tras enviar un formulario
sitemap.xml
robots.txt
```

No subas la carpeta `.git` (Netlify la ignora, pero no aporta nada).

## El formulario de newsletter

Va a MailerLite (formulario `203841029310252380`, cuenta `2784740`), no a Netlify. Los suscriptores
aparecen en MailerLite. El de pedidos sí va a Netlify Forms, para que quede registro y aviso.

## Pendiente cuando esté desplegado

1. **GA4**: crear propiedad para este dominio y pegar el `G-...` en `index.html` (constante `ID` del
   script de cookies). Mientras esté vacío, el aviso no aparece.
2. **Correo profesional**: hoy el contacto es `sebastian.prat@gmail.com`. Cuando exista
   `hola@criteriofinanciero.org`, cambiar en `index.html` y en las cuatro páginas legales
   (`generar_paginas.py`, constante `EMAIL`).


## Publicar automáticamente (una sola vez)

Hoy la web se publica arrastrando la carpeta. Para que cada commit publique solo:

1. **Crea el repositorio en GitHub** (vacío, sin README ni licencia).
2. Ejecuta **conectar_github.bat** y pega la URL. Sube el historial completo.
3. En **Netlify → Site configuration → Build and deploy → Link repository**:
   - Repositorio: el que acabas de crear.
   - Rama: master.
   - Comando de build: *(vacío)*.
   - Directorio de publicación: /.
4. A partir de ahí, cada git push despliega en un minuto.

El panel ejecuta ctualizar.py --publicar, que hace commit. Con el repositorio
conectado, basta añadir el push para que el lunes quede todo publicado sin
tocar nada.
