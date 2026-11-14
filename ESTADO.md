# Estado del proyecto · para retomar

Última actualización: **14 de noviembre de 2026, 03:00**.
Este documento es el punto de partida de cualquier sesión futura. Léelo primero.

---

## 1. Dónde estamos, en diez líneas

Sebastián Prat, economista y titulado EFPA (nº 35094), ex banca privada. Objetivo:
**5.000 €/mes brutos** sustituyendo el empleo por cuenta ajena. La web y los productos
están **construidos y probados**, pero **sin publicar y sin cobrar**, por dos bloqueos
externos: el **SEPE** (no puede iniciar actividad) y los **créditos de Netlify** (agotados
hasta el próximo ciclo).

Modelo elegido: **análisis independiente y formación**, sin asesoramiento personalizado ni
recomendaciones. Tres productos: informes de empresas cotizadas (66 €), valoración de pymes
(199 €) y curso (149 €). Todo el material existe; falta abrir la puerta.

En paralelo hay una segunda línea: **cuentos infantiles personalizados** (imagen → vídeo →
voz). El pipeline está cerrado salvo la consistencia del personaje.

---

## 2. Qué hay construido

### Línea financiera

| Proyecto | Ruta | Estado |
|---|---|---|
| **Web criteriofinanciero** | `C:\AI\Proyectos\Web\criteriofinanciero` | 58 commits · desplegada en Netlify (versión antigua) |
| **Curso (aula)** | `.../criteriofinanciero/curso/` | 12 lecciones, 82 preguntas, 11 ejercicios, certificado |
| **Curso (venta)** | `.../curso/index.html` | Página de venta con lista de espera |
| **Valoración de pymes** | `.../criteriofinanciero/valoracion/` | Gratis da el rango; 199 € el informe |
| **Generador de informes** | `C:\AI\Proyectos\Analisis` | 5 informes publicados |
| **Motor de valoración pyme** | `C:\AI\Proyectos\Valoracion` | Genera el PDF de pago |
| **Curso Udemy** | `C:\AI\Proyectos\Curso\udemy` | 17 lecciones · 38 min · 2 PDF · **sin subir** |
| **Panel de control** | `C:\AI\Proyectos\Panel` | 5 tareas, build hook, revisión |
| **Newsletter** | `C:\AI\Proyectos\Newsletter` | Se genera sola; falta enviarla |
| **euroaeuro** | `C:\AI\Proyectos\Web\euroaeuro` | 91 artículos · GitHub Pages · push = publicación |

### Línea de cuentos

| Pieza | Estado |
|---|---|
| Ilustraciones (SDXL + ComfyUI) | **Funcionando** · 12 s por imagen |
| Estilo | **PureCartoonXL** para cuentos; Juggernaut da fotorrealismo, no sirve para niños |
| Clips animados (Wan 2.2 I2V) | **Funcionando** · 1,7 min por clip de 4 s |
| **Narración + montaje** | **Funcionando** (`Cuentos\narrar.py`) · 1080×1920, zoom suave |
| Voz | Piper `es_ES-sharvard-medium`. Decisión pendiente: sintética o grabada |
| Personaje con la cara del niño | **Bloqueado** (ver abajo) |

**Medido**: 3 páginas → 52 s de vídeo, 10 MB, 40 s de proceso. 15 páginas ≈ 4-5 min.

---

## 3. Los tres bloqueos

### SEPE
Cobrar exige alta de autónomo, incompatible con el paro (art. 282.1 LGSS). Opciones: esperar
o pedir **compatibilización** (270 días, antes o en los 15 días desde el alta). Mientras,
web en modo pruebas: sin cobro, con lista de espera.

### Créditos de Netlify
300 por ciclo, **15 por despliegue** = 20 al mes. Agotados el 13/11 por pruebas en
producción. La web sigue online. Hasta el próximo ciclo no se despliega.
**Norma: probar siempre en local.**

### Consistencia del personaje (cuentos) · **RESUELTO el 14/11**

IPAdapter funciona. Receta completa en `Cuentos/README.md`:

```bat
python C:\AI\Proyectos\Cuentos\probar_ipadapter.py --referencia foto.png ^
    --fuerza 0.55 --preset "PLUS (high strength)" --prompt "..."
```

- **Fuerza 0,55**: mantiene cara y ropa y cambia la escena. A 0,85 copia también la composición.
- **Preset PLUS** obligatorio: los adaptadores sin "plus" dan error de dimensiones.
- **Ojo con los nombres**: `CLIP-ViT-H` es el de 2,4 GB; el de 3,5 GB es el bigG. Estaban
  intercambiados y eso dio un error de dimensiones difícil de leer.
- 15-27 s por imagen.
- **Estilo**: PureCartoonXL da 3D brillante, no acuarela. Para acuarela, otro checkpoint o LoRA.

Histórico de lo que se instaló (por si hay que repetirlo):

- ✅ Nodo `ComfyUI_IPAdapter_plus` instalado.
- ✅ `extra_model_paths.yaml` para que ComfyUI encuentre los modelos de `ComfyUI-Shared`.
- ✅ ComfyUI se puede arrancar por consola con el Python correcto
  (`ComfyUI-Installs\ComfyUI\ComfyUI\.venv\Scripts\python.exe`, tiene torch 2.12 + CUDA).
- ✅ Encoder `CLIP-ViT-H-14-laion2B-s32B-b79K.safetensors` (2,4 GB) en `models\clip_vision`.
- ✅ `ip-adapter_sdxl.safetensors` y `ip-adapter_sdxl_vit-h.safetensors` (no dan la
  dimensión 1280: no sirven con este nodo).
- ❌ **`ip-adapter-plus_sdxl_vit-h.safetensors` (850 MB)**: la descarga se corta en segundo
  plano. **Hay que descargarlo en una ventana normal**:

```bat
curl -L -o "%LOCALAPPDATA%\Comfy-Desktop\ComfyUI-Shared\models\ipadapter\ip-adapter-plus_sdxl_vit-h.safetensors" ^
  https://huggingface.co/dsadas/IP-Adapter/resolve/main/sdxl_models/ip-adapter-plus_sdxl_vit-h.safetensors
```

*(La URL correcta es `h94/IP-Adapter`, no `dsadas`: es una errata de esta nota.)*

Después:

```bat
python C:\AI\Proyectos\Cuentos\probar_ipadapter.py ^
  --referencia "ruta\a\la\foto.png" --preset "PLUS (high strength)" --fuerza 0.8 ^
  --prompt "el niño, 6 años, pelo castaño, abrigo azul, paseando por un bosque de otoño, ilustración infantil acuarela"
```

**Por qué el "plus"**: el nodo construye la proyección de 1024 con los adaptadores
normales y de 1280 con los "plus". El modelo descargado espera 1280.

---

## 4. Lo que falta, en orden

### A · Cuando llegue el despliegue de Netlify (30 minutos)
1. Pulsar **"Publicar en Netlify"** en el panel.
2. Comprobar `/`, `/curso/`, `/valoracion/`, `/repositorio/` y el PDF de muestra.

### B · Decisiones que solo puede tomar Sebastián
- [ ] **Titular de LinkedIn** (`C:\AI\Proyectos\Personal\linkedin.md`, tres opciones).
- [ ] **Automatización de bienvenida** en MailerLite (formulario `203841029310252380`).
- [ ] **Subir el curso gratuito a Udemy** (`Curso\udemy\videos` + `guion.md`).
- [ ] **Voz de los cuentos**: sintética (actual) o grabada.

### C · El día que se abra (una mañana)
1. Quitar el modo pruebas: precios y botón de compra (`MODO_PRUEBAS.md`).
2. Desplegar.
3. Primera publicación de LinkedIn (`LINKEDIN.md`, publicación 1).
4. Newsletter con el anuncio.

### D · Pendiente técnico, sin prisa
- [ ] Adaptador **plus** de IPAdapter (arriba) y prueba con foto real.
- [ ] Regenerar informes de **REP, TEF y FER** (eléctricas y concesionarias fallan).
- [ ] Añadir curso y valoración al `sitemap.xml`, quitarles el `noindex`.
- [ ] Enlazar `/valoracion/` desde la portada.
- [ ] Escribir el cuento completo de Luna (15 páginas) y medir el tiempo real.

---

## 5. Cómo funciona cada cosa

```bat
:: Panel de control
C:\AI\Proyectos\Panel\lanzar.bat

:: Ver el curso en local
C:\AI\Proyectos\Web\criteriofinanciero\VER_CURSO.bat

:: Pruebas de los 11 componentes del curso
http://127.0.0.1:8000/curso/pruebas.html

:: Informes de la cola
C:\AI\Proyectos\Analisis\.venv\Scripts\python.exe siguiente.py

:: Cuento narrado (imágenes + voz)
C:\AI\Proyectos\Voz\.venv\Scripts\python.exe Cuentos\narrar.py ^
  --carpeta salida --narracion narracion.txt --salida videos/cuento.mp4

:: ComfyUI por consola (si la app no arranca)
"C:\Users\sebas\AppData\Local\Comfy-Desktop\ComfyUI-Installs\ComfyUI\ComfyUI\.venv\Scripts\python.exe" ^
  "C:\Users\sebas\AppData\Local\Comfy-Desktop\ComfyUI-Installs\ComfyUI\ComfyUI\main.py" ^
  --listen 127.0.0.1 --port 8188
```

**Datos que hay que recordar**
- LM Studio: `127.0.0.1:1234`, modelo `qwen/qwen3.8-27b`. Si da ENOENT, falta
  `C:\Users\sebas\.lmstudio\.internal\temp`.
- ComfyUI: modelos en `C:\Users\sebas\AppData\Local\Comfy-Desktop\ComfyUI-Shared\models`.
- Modelo de 27B en 16 GB: cerrar Ollama antes de generar.

---

## 6. Documentos que importan

| Documento | Para qué |
|---|---|
| `criteriofinanciero/MODO_PRUEBAS.md` | Qué está desactivado y cómo se reactiva |
| `criteriofinanciero/PLAN_MARKETING.md` | Perfiles, canales y calendario |
| `criteriofinanciero/LINKEDIN.md` | Las doce publicaciones, escritas |
| `criteriofinanciero/DESPLIEGUE.md` | Cómo se publica |
| `Panel/README.md` | Tareas, build hook y cola |
| `Curso/guion.md` | Programa de las 12 lecciones |
| `Curso/udemy/guion.md` | Ficha del curso gratuito |
| `Cuentos/README.md` | Pipeline de imágenes, vídeo y narración |
| `ComfyUI/PLAN.md` | Qué modelos hay y para qué sirve cada uno |

**Promoción**: `Curso\capturas\` (10 tarjetas 1200×630) y `criteriofinanciero\assets\img\curso-*.png`.

---

## 7. Reglas que han costado un error aprenderlas

1. **Probar en local, nunca en producción.** Cada despliegue son 15 créditos.
2. **No parchear HTML con PowerShell.** El `$` de JavaScript se interpreta y rompe el archivo.
3. **PowerShell escribe BOM.** Los archivos de configuración, con Python.
4. **Tras tocar estructura, contar etiquetas** (`<div>` abiertos = cerrados).
5. **Cada componente interactivo, con su prueba** (`curso/pruebas.html`).
6. **Cada archivo de modelo tiene un nombre que el nodo espera.** Si el patrón no coincide,
   el nodo dice "model not found" aunque el archivo esté ahí.
7. **Las descargas grandes, en primer plano.** En segundo plano se quedan a cero.

---

## 8. Para retomar en otra sesión

> «Lee `C:\AI\Proyectos\ESTADO.md` y dime en qué punto estamos.»
