# IV Aniversario EPCO 2026

Sitio web del **IV Aniversario de la Escuela Profesional de Contabilidad — UNAM Filial Ilo**.
Programa oficial del 29 de octubre al 29 de noviembre de 2026 (8 actividades), con cuentas regresivas en vivo.

Sitio estático (HTML + CSS + JavaScript, sin dependencias ni build), listo para GitHub Pages.

## Estructura

```
index.html                Página única con todas las secciones
assets/css/styles.css     Diseño, animaciones y estilos de impresión
assets/js/app.js          Datos del programa e interacciones
assets/img/               Fotos del hero, de cada actividad y de la galería
assets/img/sponsors/      Logotipos de los auspiciadores (SVG)
```

## Contacto

| Dato | Valor |
| --- | --- |
| WhatsApp | +51 949 319 840 |
| Correo | 2024230003@unam.edu.pe |

Se editan en una sola línea: atributos `data-whatsapp` y `data-email` del `<body>` en `index.html`.

## Imágenes: cómo reemplazarlas por las del PPT

Todas las fotos están dentro del proyecto con un nombre fijo. Para cambiar una, sobrescribe el
archivo con la foto real **manteniendo el mismo nombre** (JPG, apaisado, ~1600 px de ancho):

| Archivo | Dónde aparece |
| --- | --- |
| `hero-pabellon.jpg` | Fondo de la portada (pabellón EPCO) |
| `act-crimen.jpg` | Seminario de Crimen Contable |
| `act-miss-mister.jpg` | Miss & Mister Monkey Beach |
| `act-talento.jpg` | Conta Tiene Talento |
| `act-simposio.svg` | Simposio Académico: ¿Qué pagamos y por qué? |
| `act-cadecis.jpg` | II CADECIS |
| `act-saber.jpg` | Saber Contable |
| `act-feria.jpg` | Feria de Emprendimiento y R.S. |
| `act-dia-central.jpg` | Día Central |
| `director.jpg` | Retrato del Dr. Jorge Jinchuña Huallpa (mensaje institucional) |
| `gal-*.jpg` | Galería (8 fotografías referenciales) |
| `gal-talento-1.jpg` | Galería · Conta Tiene Talento, canto en vivo |
| `gal-talento-2.jpg` | Galería · Conta Tiene Talento, danza de tijeras |
| `gal-talento-3.jpg` | Galería · Conta Tiene Talento, coreografía grupal |
| `gal-miss-1.jpg` | Galería · Miss & Mister, pasarela |
| `gal-miss-2.jpg` | Galería · Miss & Mister, público y porras |

Las seis últimas y el retrato del director están ya maquetados: en cuanto el archivo existe en
`assets/img/` con ese nombre, la foto aparece sola en la web (si falta, la tarjeta se oculta y no
queda ningún ícono roto). Las fotos deben ser JPG apaisadas de al menos 1200 px de ancho; el
retrato, vertical y centrado en el rostro.

Si una foto nueva tiene otro nombre o formato, ajusta la ruta en `index.html` (galería y hero) o
en el arreglo `EVENTS` de `assets/js/app.js` (actividades).

## Auspiciadores

La sección `#auspiciadores` muestra tres tarjetas: **KHZ** (auspiciador principal), **Yumi Sweet**
(reportería) y un espacio libre para futuros auspiciadores. Los logotipos son
`assets/img/sponsors/khz.svg` y `yumi-sweet.svg`; puedes reemplazarlos por PNG o SVG con el mismo
nombre, o editar las tarjetas directamente en `index.html`.

## Cómo ver la vista previa

**En este entorno:** el servidor ya está corriendo en el panel *Browser* (puerto 3000).

**En tu computadora:**

```bash
cd ruta/del/proyecto
python3 -m http.server 3000
```

y abrir <http://localhost:3000>. (También funciona abriendo `index.html` con doble clic, aunque el
`.ics` y algunas rutas se comportan mejor con servidor.)

## Cómo publicarlo en GitHub Pages

El repositorio se llama `kasieh-77.github.io`, así que GitHub Pages lo publica como sitio de
usuario en **https://kasieh-77.github.io/**.

1. Subir los cambios a la rama `main` (`git add . && git commit -m "…" && git push`).
2. En GitHub: **Settings → Pages**.
3. En *Build and deployment* elegir **Deploy from a branch**, rama `main`, carpeta `/ (root)` y guardar.
4. Esperar 1–2 minutos: el sitio queda en `https://kasieh-77.github.io/`.
5. Si actualizas archivos, Pages vuelve a publicar solo (puede tardar un minuto; recarga con Ctrl+F5).

La primera vez que se activa Pages hay que hacerlo desde la web de GitHub: no se puede activar
por línea de comandos sin credenciales.

## Funciones

- Cuentas regresivas al segundo (día central, próxima actividad, próximas fechas y cada evento).
- Agenda interactiva: filtros por tipo, detalle con lugar/hora/mapa y navegación con teclado.
- Botón *Añadir al calendario* que genera un archivo `.ics` por actividad.
- Galería con visor a pantalla completa (teclado y botones).
- Menú móvil, barra de progreso de lectura y animaciones al hacer scroll.
- Botón de impresión / guardar PDF con hoja de estilos propia.
- Respeta `prefers-reduced-motion` y es navegable con teclado.

## Créditos

© 2026 Escuela Profesional de Contabilidad · UNAM Filial Ilo. Todos los derechos reservados.
Powered by [@khz.lab](https://www.instagram.com/khz.lab/).
