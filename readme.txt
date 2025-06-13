# Documentación técnica – Tomás Verde Web App

## Tecnologías

- ^[**HTML5 + CSS3 (Flexbox/Grid)**: estructura semántica y responsive.]({"attribution":{"attributableIndex":"0-1"}})
- ^[**Sass/SCSS**: variables, mixins, nesting. Aprende aquí: sass-lang.com/guide y documentación oficial]({"attribution":{"attributableIndex":"0-2"}})  [oai_citation:0‡netlify.com](https://www.netlify.com/blog/from-legacy-to-leading-edge-sustainable-success-with-netlify/?utm_source=chatgpt.com) [oai_citation:1‡sass-lang.com](https://sass-lang.com/guide/?utm_source=chatgpt.com).
- ^[**JavaScript + GSAP + ScrollTrigger**: animaciones basadas en scroll, entradas al viewport, pin, scrub. Tutoriales:]({"attribution":{"attributableIndex":"400-0"}})
  - ^[GSAP ScrollTrigger docs]({"attribution":{"attributableIndex":"400-1"}})  [oai_citation:2‡gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/?utm_source=chatgpt.com)
  - ^[ScrollTrigger beginner guide]({"attribution":{"attributableIndex":"567-0"}})  [oai_citation:3‡ihatetomatoes.net](https://ihatetomatoes.net/scrolltrigger-tutorial-for-beginners/?utm_source=chatgpt.com)
- ^[**Lightbox JS**: GLightbox, Fancybox u otro para galería.]({"attribution":{"attributableIndex":"634-0"}})
- ^[**Hosting**: Netlify (Jamstack, CI/CD). Nota sobre “green hosting”]({"attribution":{"attributableIndex":"634-1"}})  [oai_citation:4‡answers.netlify.com](https://answers.netlify.com/t/is-netlify-powered-by-renewable-energy/3951?utm_source=chatgpt.com).
- ^[**Accesibilidad**: aria-label, focus, contraste.]({"attribution":{"attributableIndex":"796-0"}})

## Estilo visual

- ^[Paleta: verde oscuro (#1f3d2e), ocre (#c78f4b), beige (#f2e8d5).]({"attribution":{"attributableIndex":"796-1"}})
- ^[Tipografía: “Libre Baskerville” + “Open Sans”.]({"attribution":{"attributableIndex":"796-2"}})
- ^[Texturas: grano ligero, ilustraciones vectoriales.]({"attribution":{"attributableIndex":"796-3"}})
- ^[Imágenes: formato WebP, con lazy-loading.]({"attribution":{"attributableIndex":"796-4"}})

## Estructura del código
project/
├── index.html
├── css/
│   ├── styles.css   ← generado por Sass
│   └── styles.scss
├── js/
│   ├── main.js      ← GSAP, ScrollTrigger, animaciones
│   ├── lightbox.js
├── img/
│   ├── hero.webp
│   └── galería/
├── assets/
│   └── svgs/
├── form-handler.js  ← integración con WhatsApp / API
└── README.txt

## Flujo de trabajo

1. ^[`sass --watch css/styles.scss:css/styles.css`]({"attribution":{"attributableIndex":"796-5"}})
2. ^[Construir estructura HTML.]({"attribution":{"attributableIndex":"796-6"}})
3. ^[Estilizar con Sass.]({"attribution":{"attributableIndex":"796-7"}})
4. ^[Añadir JS (GSAP animaciones, lightbox).]({"attribution":{"attributableIndex":"796-8"}})
5. Validación, accesibilidad.
6. ^[Optimización (imágenes, lazy-loading).]({"attribution":{"attributableIndex":"796-9"}})
7. ^[Deploy en Netlify con git push.]({"attribution":{"attributableIndex":"796-10"}})

## Recursos adicionales

- ^[Sass Guide: sass-lang.com/guide]({"attribution":{"attributableIndex":"796-11"}})  [oai_citation:5‡sass.hk](https://www.sass.hk/en/guide.htm?utm_source=chatgpt.com) [oai_citation:6‡sass-lang.com](https://sass-lang.com/guide/?utm_source=chatgpt.com) [oai_citation:7‡loubagel.com](https://www.loubagel.com/blog/getting-started-with-gsap-scrolltrigger/?utm_source=chatgpt.com) [oai_citation:8‡netguru.com](https://www.netguru.com/blog/what-is-netlify?utm_source=chatgpt.com) [oai_citation:9‡answers.netlify.com](https://answers.netlify.com/t/green-hosting-at-netlify/50626?utm_source=chatgpt.com)  
- ^[GSAP ScrollTrigger docs: gsap.com/docs/v3/Plugins/ScrollTrigger]({"attribution":{"attributableIndex":"1799-0"}})  [oai_citation:10‡gsap.com](https://gsap.com/docs/v3/Plugins/ScrollTrigger/?utm_source=chatgpt.com)  
- ^[ScrollTrigger for beginners: ihatetomatoes.net ScrollTrigger tutorial]({"attribution":{"attributableIndex":"1887-0"}})  [oai_citation:11‡ihatetomatoes.net](https://ihatetomatoes.net/scrolltrigger-tutorial-for-beginners/?utm_source=chatgpt.com)  
- ^[Netlify hosting overview: netguru.com blog]({"attribution":{"attributableIndex":"1995-0"}})  [oai_citation:12‡netguru.com](https://www.netguru.com/blog/what-is-netlify?utm_source=chatgpt.com)
- ^[Green hosting info: Wikipedia, Netlify forum]({"attribution":{"attributableIndex":"2063-0"}})  [oai_citation:13‡en.wikipedia.org](https://en.wikipedia.org/wiki/Green_hosting?utm_source=chatgpt.com)