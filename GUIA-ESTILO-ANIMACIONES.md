# Guía de Estilo y Animaciones — Angular

> Guía de referencia para rediseñar/refactorizar webs Angular con un lenguaje visual **elegante, orgánico, profesional y adaptable**. Basada en los patrones observados en el proyecto de referencia [`nakao-animal-redesign`](https://github.com/vicvelaz/nakao-animal-redesign) (Next.js + Tailwind + Framer Motion), traducidos a Angular (Angular Animations / CSS + IntersectionObserver).

Esta guía **no es una librería de componentes cerrada**: es un conjunto de reglas y patrones reutilizables. Cada proyecto debe adaptar la paleta de color y las imágenes a su propia identidad, pero debe respetar la **estructura, el ritmo y el tipo de movimiento** descritos aquí.

---

## 1. Principios de diseño

1. **Calma antes que espectáculo.** Las animaciones existen para guiar la atención y dar sensación de cuidado/artesanía, no para impresionar. Duraciones largas (0.8–1.2s), easing suave, poco rebote.
2. **Jerarquía tipográfica clara.** Una fuente *serif* con carácter para titulares (identidad/emoción) + una *sans* neutra y legible para cuerpo de texto (funcionalidad).
3. **Espacio generoso.** Mucho `padding`/`margin` vertical entre secciones (equivalente a `py-24 lg:py-36`). El "aire" es parte del lujo percibido.
4. **Color con propósito.** Paleta corta (fondo, texto, primario, secundario, acento, muted) definida por *design tokens*, nunca colores sueltos en componentes.
5. **Todo se revela, nada aparece de golpe.** Cualquier bloque de contenido que entra en el viewport debe animarse una vez, suavemente, y quedarse fijo (no animaciones infinitas salvo micro-detalles puntuales).
6. **Consistencia > originalidad puntual.** El mismo patrón de "reveal" y las mismas curvas de easing se reutilizan en toda la web.
7. **Accesibilidad primero.** Todo lo anterior se puede desactivar/reducir con `prefers-reduced-motion`.

---

## 2. Design tokens (variables globales)

Definir en `src/styles/tokens.scss` (o `:root` en `styles.scss`) usando el mismo enfoque que el proyecto de referencia: **colores en formato `oklch()`**, radios en escala, y variables semánticas (no “verde-500”, sino “primary”, “accent”, “muted”...).

```scss
:root {
  color-scheme: light;

  /* --- Color base --- */
  --background: oklch(0.975 0.012 95);
  --foreground: oklch(0.27 0.03 175);

  --card: oklch(0.99 0.008 95);
  --card-foreground: oklch(0.27 0.03 175);

  /* --- Marca --- */
  --primary: oklch(0.6 0.09 185);
  --primary-foreground: oklch(0.99 0.01 95);

  --secondary: oklch(0.93 0.02 150);
  --secondary-foreground: oklch(0.32 0.04 175);

  --accent: oklch(0.42 0.06 165);
  --accent-foreground: oklch(0.97 0.012 95);

  --muted: oklch(0.94 0.012 110);
  --muted-foreground: oklch(0.5 0.025 170);

  --destructive: oklch(0.577 0.18 27);
  --border: oklch(0.89 0.018 120);
  --input: oklch(0.89 0.018 120);
  --ring: oklch(0.6 0.09 185);

  /* --- Radios --- */
  --radius: 0.5rem;
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);

  /* --- Tipografía --- */
  --font-heading: 'Fraunces', 'Georgia', serif;
  --font-sans: 'Geist', system-ui, sans-serif;

  /* --- Animación --- */
  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
  --duration-fast: 300ms;
  --duration-base: 600ms;
  --duration-slow: 900ms;
  --duration-hero: 1100ms;
}

.dark {
  color-scheme: dark;
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --primary: oklch(0.75 0.09 185);
  --primary-foreground: oklch(0.145 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
}
```

**Regla de oro:** cada web rediseñada **cambia los valores** (tono/hue del `oklch`, tipografías) pero **mantiene la estructura de variables**. Así el refactor es "recolorear + reutilizar patrones", no reinventar cada vez.

### Cómo elegir la paleta para cada proyecto
- Definir 1 color primario (marca), 1 secundario (soporte, tono similar pero más suave), 1 acento (contraste, para CTAs o detalles), y neutros (background/foreground/muted).
- Usar `oklch()` porque mantiene el brillo perceptual constante al cambiar el tono — más fácil de mantener contraste/accesibilidad al generar variantes.
- Contraste mínimo AA (4.5:1) entre `--foreground` y `--background`, y entre `--primary-foreground` y `--primary`.

---

## 3. Tipografía

| Uso | Fuente | Peso | Notas |
|---|---|---|---|
| Titulares (`h1`–`h3`), citas destacadas | Serif con carácter (ej. Fraunces, Playfair Display, Lora) | 400–500 | `line-height: 1.05–1.15`, tracking normal, permite `<em>` en cursiva como acento de color |
| Cuerpo de texto, UI, botones | Sans neutra (ej. Geist, Inter, Manrope) | 400–500 | `line-height: 1.6` en párrafos |
| Etiquetas/kickers (ej. "QUÉ CUIDADOS OFRECEMOS") | Sans | 500 | `text-transform: uppercase`, `letter-spacing: 0.35em`, tamaño pequeño (12–13px), color `--primary` |

```scss
h1, h2, h3, .font-heading {
  font-family: var(--font-heading);
}

.eyebrow {
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.35em;
  color: var(--primary);
  font-weight: 500;
}
```

Escala tipográfica sugerida (mobile → desktop):
- H1 hero: `2.25rem → 4.5rem` (`text-4xl` → `text-7xl`)
- H2 sección: `1.875rem → 3rem`
- H3 tarjeta: `1.25rem`
- Body: `1rem`, `leading-relaxed`
- Eyebrow/kicker: `0.8125rem`

---

## 4. Layout y espaciado

- **Contenedor máximo:** `max-width: 80rem` (equivalente a `max-w-7xl`), centrado, con padding lateral `1.5rem` (mobile) → `2.5rem` (desktop).
- **Ritmo vertical entre secciones:** `padding-block: 6rem` (mobile) → `9rem` (desktop) (`py-24 lg:py-36`).
- **Grid de 2 columnas asimétrico** para secciones de "storytelling" (texto + imagen o texto + lista de cards): `grid-template-columns: 1fr 1.1fr` en desktop, 1 columna en mobile.
- **Radios generosos:** cards `1.5–1.75rem`, imágenes destacadas `1.75rem`, botones `9999px` (pill).
- **Bordes suaves:** `1px solid var(--border)`, nunca sombras duras; si se usa sombra, muy sutil (`0 10px 30px -15px rgba(0,0,0,.15)`).

---

## 5. Sistema de animación

### 5.1 Curva de easing única
Usar **una sola curva** en todo el sitio para dar coherencia:

```
cubic-bezier(0.22, 1, 0.36, 1)   /* "ease-standard": salida suave, sin rebote agresivo */
```

### 5.2 Duraciones
| Elemento | Duración | Delay típico |
|---|---|---|
| Micro-interacciones (hover botón, hover card) | 250–350ms | 0 |
| Reveal de bloque de texto/imagen al hacer scroll | 800–1000ms | 0–0.3s |
| Reveal de título hero (línea a línea) | 1000–1100ms | escalonado +0.15–0.2s por línea |
| Stagger de listas/cards | hijo 800–900ms | `staggerChildren: 0.12–0.15s` |
| Loop decorativo (flecha "scroll down") | 1.6–2s | infinito, solo elementos muy secundarios |

**Regla:** nunca más de un elemento con animación en loop infinito visible a la vez, y solo para micro-detalles (flecha de scroll, indicador), nunca para bloques grandes de contenido.

### 5.3 Patrón "Reveal on scroll" (equivalente Angular al `Reveal`/`Stagger` de Framer Motion)

En Angular no tenemos Framer Motion; se recrea con una **directiva basada en `IntersectionObserver`** + Angular Animations o clases CSS + `@angular/animations`.

**Directiva `RevealOnScrollDirective`:**

```ts
// reveal-on-scroll.directive.ts
import {
  Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2
} from '@angular/core';

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealOnScrollDirective implements OnInit, OnDestroy {
  @Input() direction: RevealDirection = 'up';
  @Input() delay = 0; // segundos
  @Input() once = true;
  @Input() threshold = 0.25;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, private renderer: Renderer2) {}

  ngOnInit(): void {
    const host = this.el.nativeElement;
    this.renderer.addClass(host, 'reveal');
    this.renderer.addClass(host, `reveal--${this.direction}`);
    this.renderer.setStyle(host, 'transition-delay', `${this.delay}s`);

    // Respeta accesibilidad: sin animación si el usuario lo prefiere
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      this.renderer.addClass(host, 'reveal--visible');
      return;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(host, 'reveal--visible');
          if (this.once) this.observer?.unobserve(host);
        } else if (!this.once) {
          this.renderer.removeClass(host, 'reveal--visible');
        }
      },
      { threshold: this.threshold }
    );
    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
```

```scss
// reveal.scss (importar globalmente)
.reveal {
  opacity: 0;
  transition: opacity var(--duration-slow) var(--ease-standard),
              transform var(--duration-slow) var(--ease-standard);
}
.reveal--up    { transform: translateY(28px); }
.reveal--down  { transform: translateY(-28px); }
.reveal--left  { transform: translateX(28px); }
.reveal--right { transform: translateX(-28px); }
.reveal--none  { transform: none; }

.reveal--visible {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .reveal { transition: none; opacity: 1; transform: none; }
}
```

**Uso en template:**
```html
<p class="eyebrow" appReveal>Qué cuidados ofrecemos</p>
<h2 appReveal [delay]="0.1">Cuidado integral: estético, físico y emocional</h2>
<p appReveal [delay]="0.2">Además de la peluquería respetuosa...</p>
```

### 5.4 Patrón "Stagger" (listas/cards que aparecen escalonadas)

Directiva contenedora que añade `--stagger-index` a cada hijo directo y delega el reveal:

```ts
// stagger.directive.ts
import { AfterContentInit, ContentChildren, Directive, Input, QueryList } from '@angular/core';
import { RevealOnScrollDirective } from './reveal-on-scroll.directive';

@Directive({
  selector: '[appStagger]',
  standalone: true,
})
export class StaggerDirective implements AfterContentInit {
  @Input() staggerStep = 0.14; // segundos entre hijos
  @Input() baseDelay = 0;

  @ContentChildren(RevealOnScrollDirective, { descendants: false })
  children!: QueryList<RevealOnScrollDirective>;

  ngAfterContentInit(): void {
    this.children.forEach((child, i) => {
      child.delay = this.baseDelay + i * this.staggerStep;
    });
  }
}
```

```html
<div appStagger class="cards-grid">
  <article appReveal class="card" *ngFor="let s of services">...</article>
</div>
```

> Alternativa más simple sin directivas: aplicar `appReveal` individualmente a cada card con `[delay]="i * 0.12"` dentro de un `*ngFor` (`let i = index`). Es el enfoque recomendado si no se quiere añadir complejidad extra.

### 5.5 Patrón "Hero de texto línea a línea"
Para el titular del hero, cada línea entra con `translateY(110%) → 0` dentro de un contenedor `overflow: hidden` (efecto "cortina"):

```html
<h1 class="hero-title">
  <span class="hero-line" *ngFor="let line of titleLines; let i = index">
    <span class="hero-line__inner" appReveal direction="none" [delay]="0.3 + i * 0.18">
      {{ line }}
    </span>
  </span>
</h1>
```

```scss
.hero-line { display: block; overflow: hidden; }
.hero-line__inner { display: block; }
```
(Para el efecto de "deslizar desde abajo" en vez de fade, usar una animación CSS con `@keyframes` en lugar del reveal genérico, o Angular Animations `trigger` con `transform: translateY(110%)`.)

### 5.6 Micro-interacciones (hover)
- Botones: `hover:scale-[1.03]` + transición 300ms.
- Cards: cambio de `border-color` y `background` (no elevación con sombra dura); icono cambia de color de fondo al pasar el ratón.
- Enlaces de navegación: subrayado animado con `transform: scaleX()` desde el centro o la izquierda.

```scss
.btn-primary {
  transition: transform var(--duration-fast) var(--ease-standard);
  &:hover { transform: scale(1.03); }
}

.card {
  transition: border-color var(--duration-base) var(--ease-standard),
              background-color var(--duration-base) var(--ease-standard);
  &:hover {
    border-color: color-mix(in oklch, var(--primary) 40%, transparent);
    background-color: color-mix(in oklch, var(--secondary) 30%, transparent);
  }
}
```

### 5.7 Accesibilidad del movimiento
Toda animación (reveal, stagger, hero, hover) debe respetar:
```scss
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 6. Patrones de sección (bloques reutilizables)

### 6.1 Hero a pantalla completa
- `min-height: 100vh`, imagen de fondo a `object-fit: cover` (`position: absolute; inset: 0`), overlay con gradiente (`linear-gradient(to top, rgba(fg,.7), rgba(fg,.2) 60%, rgba(fg,.3))`) para garantizar legibilidad del texto claro.
- Contenido alineado abajo (`justify-content: flex-end`) con padding inferior generoso.
- Eyebrow (kicker) → H1 grande (con una línea en cursiva/color de acento) → párrafo corto + CTA.
- Indicador de scroll opcional, esquina inferior derecha, con loop sutil (`translateY` 0→6px→0, `duration: 1.8s`, infinito).

```html
<section class="hero">
  <img class="hero__bg" src="..." alt="..." />
  <div class="hero__overlay"></div>
  <div class="hero__content">
    <p class="eyebrow" appReveal [delay]="0.2">Kicker</p>
    <h1 class="hero-title">...</h1>
    <div appReveal [delay]="1" class="hero__cta-row">
      <a class="btn-primary" href="#contacto">Llamada a la acción</a>
      <p class="hero__subtext">Frase de apoyo breve.</p>
    </div>
  </div>
  <a class="hero__scroll-cue" href="#siguiente-seccion" appReveal [delay]="1.4">
    Descubre <span class="bounce">↓</span>
  </a>
</section>
```

```scss
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}
.hero__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.hero__overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top,
    color-mix(in oklch, var(--foreground) 70%, transparent),
    color-mix(in oklch, var(--foreground) 20%, transparent) 60%,
    color-mix(in oklch, var(--foreground) 30%, transparent));
}
.hero__content {
  position: relative;
  max-width: 80rem;
  margin-inline: auto;
  padding: 8rem 1.5rem 5rem;
}
.bounce { display: inline-block; animation: bounce 1.8s ease-in-out infinite; }
@keyframes bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }
```

### 6.2 Sección texto + imagen + lista de cards (2 columnas asimétricas)
- Columna izquierda: eyebrow + H2 + párrafo + imagen destacada (aspect-ratio fijo, radio grande), todo con `appReveal` escalonado (`delay` 0, 0.1, 0.2, 0.3).
- Columna derecha: `appStagger` con tarjetas horizontales (icono circular + título + texto).

### 6.3 Grid de tarjetas (cards) estándar
- 1 columna mobile, 2–3 columnas desktop (`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` o breakpoints explícitos).
- Card: `border: 1px solid var(--border); border-radius: var(--radius-2xl); padding: 1.5–2rem; background: var(--card);`
- Hover: cambia borde/fondo, nunca solo sombra.
- Reveal: usar `appStagger` en el contenedor grid.

### 6.4 Testimonios / reseñas
- Grid de 3 columnas, cada card con: fila de iconos (estrellas), cita (`blockquote`, texto grande y legible), separador (`border-top`), autor en serif + detalle en gris/muted.

### 6.5 Sección de contacto / reserva (CTA final)
- Fondo diferenciado (`--secondary` o `--accent` a baja opacidad) para marcar el cierre de la página.
- Formulario simple, inputs con `border-radius: var(--radius-lg)`, focus ring usando `--ring`.
- Reveal del bloque completo al entrar en viewport.

### 6.6 Navegación (site-nav)
- Fija/sticky, transparente sobre el hero y con fondo sólido + sombra sutil al hacer scroll (toggle de clase mediante `HostListener('window:scroll')`).
- Transición de fondo: `background-color 300ms var(--ease-standard)`.
- Menú mobile: overlay a pantalla completa con stagger de los links al abrir.

---

## 7. Componentes Angular sugeridos (estructura de carpetas)

```
src/app/
  shared/
    animations/
      reveal-on-scroll.directive.ts
      stagger.directive.ts
      reveal.scss
    ui/
      button/
      card/
      section-heading/   (eyebrow + h2 + texto reutilizable)
  sections/
    hero/
    intro/
    services/            (grid de cards)
    philosophy/
    reviews/
    contact/
  layout/
    site-nav/
    footer/
styles/
  tokens.scss             (variables de la sección 2)
  reveal.scss
  typography.scss
```

**Buenas prácticas Angular:**
- Todas las directivas de animación como **standalone** para poder importarlas sueltas donde haga falta.
- Componentes de sección reciben datos por `@Input()` (arrays de servicios, reseñas, etc.) → reutilizables entre proyectos con solo cambiar el contenido.
- Usar `ChangeDetectionStrategy.OnPush` en componentes de sección, ya que su contenido rara vez cambia tras el render inicial.
- Si el proyecto crece, valorar `@angular/animations` (`trigger`, `state`, `transition`) para animaciones más complejas de entrada/salida de rutas; para reveal-on-scroll, `IntersectionObserver` + CSS es más ligero y con mejor rendimiento.

---

## 8. Checklist para refactorizar una web existente

Al aplicar esta guía a un proyecto ya existente:

- [ ] Sustituir colores hardcodeados por las variables `--background`, `--foreground`, `--primary`, etc. (definir la paleta propia del proyecto en `oklch()`).
- [ ] Unificar tipografías: 1 serif (títulos) + 1 sans (cuerpo), cargadas como variables `--font-heading` / `--font-sans`.
- [ ] Revisar que el hero ocupe `100vh`, con overlay legible y CTA visible sin scroll.
- [ ] Añadir `appReveal` a todos los bloques de texto/imagen relevantes de cada sección (evitar “todo aparece de golpe” al cargar).
- [ ] Convertir grids de tarjetas en `appStagger` + `appReveal` por hijo.
- [ ] Unificar radios de borde según la escala `--radius-*` (nada de valores sueltos tipo `8px`, `12px`, `20px` mezclados).
- [ ] Unificar la curva de easing a `var(--ease-standard)` en todas las transiciones CSS.
- [ ] Sustituir sombras duras por bordes sutiles + cambio de color en hover.
- [ ] Comprobar contraste de color (AA) tras cambiar la paleta.
- [ ] Verificar `prefers-reduced-motion` en todas las animaciones.
- [ ] Responsive: probar el ritmo de `padding` vertical y el paso de grid 2 columnas → 1 columna en mobile.
- [ ] Sustituir botones cuadrados/poco definidos por botones "pill" (`border-radius: 9999px`) con micro-hover de escala.

---

## 9. Resumen de valores clave (referencia rápida)

| Token | Valor de referencia |
|---|---|
| Easing global | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Duración reveal | 800–1000ms |
| Duración hero (línea de título) | 1000–1100ms, delay +0.15–0.2s por línea |
| Stagger entre hijos | 0.12–0.15s |
| Umbral de entrada en viewport | 20–25% visible (`threshold: 0.2–0.25`) |
| Radio cards | `1.5rem–1.75rem` |
| Radio botones | `9999px` (pill) |
| Padding vertical sección | `6rem` mobile → `9rem` desktop |
| Max-width contenedor | `80rem` |
| Fuente titulares | Serif con carácter (ej. Fraunces) |
| Fuente cuerpo | Sans neutra (ej. Geist / Inter) |

---

*Esta guía debe vivir en el repo (`docs/GUIA-ESTILO-ANIMACIONES.md`) y actualizarse cada vez que se detecte un nuevo patrón consistente digno de convertirse en estándar del proyecto.*
