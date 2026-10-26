# Prompt para Copilot — Sección de Reseñas (estilo Google, selección aleatoria)

> **Instrucciones de uso:** pega este documento completo como prompt en GitHub Copilot Chat (o Copilot en modo "Edit"/"Agent"), con el repositorio abierto en la rama donde esté la integración de Sanity. Si Copilot necesita dividir el trabajo, indícale que siga el orden de las secciones tal como están numeradas aquí.

---

## Contexto del proyecto

Trabajas sobre una aplicación Angular 19 standalone (signals, `input()`, control flow `@if`/`@for`) para la web de una clínica veterinaria. El contenido editorial vive en Sanity CMS (`studio-valdeoso/`), con un patrón ya establecido:

- Cada sección del sitio (Servicios, Promociones, Horarios, Contacto, Seguros) tiene un **schema singleton** en Sanity (`servicesSection`, `promotionsSection`, etc.) con un array `items`.
- `src/app/services/sanity.service.ts` hace **una única query GROQ** que trae todo el contenido dinámico, y lo fusiona con los valores por defecto (`APP_DEFAULTS` en `app-data.service.ts`) mediante `UtilsService.mergeWithDefaults()`.
- Cada sección es un componente Angular independiente en `src/app/components/sections/<nombre>/`, que recibe sus datos vía `input.required<...>()` y se pinta condicionalmente en `home.component.html`.
- Los iconos se gestionan con FontAwesome (`@fortawesome/angular-fontawesome` en la app, `@fortawesome/react-fontawesome` + `IconPicker.tsx` en el Studio).
- La paleta de colores vive en `src/styles.scss` como variables CSS: `--primary-color`, `--primary-darker-color`, `--primary-soft-background`, `--gray-background`, `--text-color-footer`, `--border-color`, `--border-radius` (0.5rem).
- El patrón de tarjeta ya usado en `PromotionsComponent`/`InsurancesComponent`: fondo blanco, `border-radius: var(--border-radius)`, `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`, borde `1px solid var(--border-color)`.

## Objetivo de esta tarea

Añadir una **nueva sección "Reseñas"** al home, con estas características:

1. **Fuente de datos:** documentos independientes de tipo `review` en Sanity (no un singleton con array, porque las reseñas se importan en bloque vía NDJSON y se gestionan como documentos sueltos — crear, editar o eliminar cualquiera sin tocar un array gigante).
2. **Selección aleatoria:** de todas las reseñas publicadas en Sanity, la web debe mostrar **10 elegidas al azar en cada carga de página** (no las 10 más recientes, no las destacadas — aleatorio real sobre el conjunto completo).
3. **Estilo visual:** inspirado en cómo Google muestra sus reseñas (foto/avatar con inicial, nombre, estrellas doradas, fecha relativa, texto con truncado si es muy largo), pero **adaptado a la identidad visual de esta web** (misma tipografía, mismo radio de borde, misma paleta de color ya definida — nada de verde/azul genérico de Google).
4. Un botón/enlace final tipo **"Ver todas las opiniones en Google"** que apunte a la URL pública de reseñas del negocio.

---

## Tarea 1 — Schema de Sanity: registrar `review` y añadirlo a la navegación del Studio

**Archivo a crear:** `studio-valdeoso/schemaTypes/review.ts`

```typescript
import { defineField, defineType } from 'sanity';

export const reviewSchema = defineType({
  name: 'review',
  title: 'Reseña',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Nombre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Puntuación',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      options: {
        list: [1, 2, 3, 4, 5],
      },
    }),
    defineField({
      name: 'text',
      title: 'Texto de la reseña',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'published',
      title: 'Publicada',
      type: 'boolean',
      initialValue: true,
      description: 'Desmarca para ocultar esta reseña de la web sin borrarla.',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'text',
      rating: 'rating',
    },
    prepare: ({ title, subtitle, rating }) => ({
      title: `${title} — ${'⭐'.repeat(rating ?? 0)}`,
      subtitle,
    }),
  },
});
```

**Archivo a modificar:** `studio-valdeoso/sanity.config.ts`

- Importa `reviewSchema` desde `./schemaTypes/review` y añádelo al array `schema.types`.
- **No** lo añadas al array `SINGLETONS` (es un tipo de múltiples documentos, no un singleton).
- En la función `structure`, añade una entrada nueva usando `S.documentTypeList`, no `S.document().documentId(...)` (eso es solo para singletons):

```typescript
import { reviewSchema } from './schemaTypes/review'

// dentro de schema.types, añade reviewSchema a la lista existente

// dentro de structure, después del último S.divider():
S.listItem()
  .title('⭐ Reseñas')
  .child(
    S.documentTypeList('review')
      .title('Reseñas')
      .defaultOrdering([{ field: 'date', direction: 'desc' }])
  ),
```

Verifica que el resto de la lista de `structure` (header, hero, servicios, horarios, contacto, promociones, seguros) se mantiene intacta — solo añades, no reemplaces nada.

---

## Tarea 2 — Actualizar `AppData` interface y la query de Sanity

**Archivo a modificar:** `src/app/services/app-data.interface.ts`

Añade una nueva interfaz y regístrala en `Sections`:

```typescript
export interface Sections {
  hero: HeroSection;
  services: ServicesSection;
  timetable: TimetableSection;
  contact: ContactSection;
  promotions: PromotionsSection;
  insurances: InsurancesSection;
  reviews: ReviewsSection; // ← añadir
}

export interface ReviewsSection {
  title: string;
  subtitle?: string;
  items: ReviewItem[];
  googleReviewsUrl?: string;
}

export interface ReviewItem {
  author: string;
  rating: number;
  text: string;
  date: string;
}
```

**Archivo a modificar:** `src/app/services/app-data.service.ts`

Añade un bloque `reviews` dentro de `sections`, tanto en el `signal<AppData>({...})` inicial como en el objeto `APP_DEFAULTS` exportado, con `items: []` por defecto (los datos reales llegan siempre de Sanity, nunca hay reseñas "de fallback" hardcodeadas porque no tendría sentido inventarlas):

```typescript
reviews: {
  title: 'Lo que dicen nuestros clientes',
  subtitle: 'Opiniones reales de quienes confían en nosotros',
  items: [],
  googleReviewsUrl: 'https://g.page/r/TU_ID_DE_GOOGLE/review', // sustituir por la URL real
},
```

**Archivo a modificar:** `src/app/services/sanity.service.ts`

Amplía la query GROQ existente para traer **todas** las reseñas publicadas (el muestreo aleatorio de 10 se hace en el cliente, no en la query, para no repetir la misma selección en cada usuario si se usase caché de CDN de Sanity):

```typescript
readonly dynamicContent$: Observable<Partial<AppData>> = from(
  this.client.fetch(`{
    "headerWarning":    *[_type == "header"][0].warning,
    "heroBanner":       *[_type == "hero"][0].banner,
    "services":         *[_type == "servicesSection"][0].items,
    "timetable":        *[_type == "timetableSection"][0].items,
    "contact":          *[_type == "contactSection"][0]{ items, socialMedia },
    "promotions":       *[_type == "promotionsSection"][0].items,
    "insurances":       *[_type == "insurancesSection"][0].items,
    "reviews":          *[_type == "review" && published == true]{ author, rating, text, date },
  }`)
);
```

**Archivo a modificar:** `src/app/services/utils.service.ts`, método `mergeWithDefaults`

Añade el bloque `reviews` al merge, y aquí es donde se hace la selección aleatoria de 10 (así queda centralizado, y tanto SSR como CSR ven la misma lógica):

```typescript
reviews: {
  ...defaults.sections.reviews,
  items: this.pickRandomReviews(sanity.reviews ?? [], 10),
},
```

Y añade el método privado en la misma clase `UtilsService`:

```typescript
/**
 * Selecciona N elementos al azar de un array, sin mutar el original.
 * Usa Fisher-Yates parcial: eficiente incluso con arrays grandes de reseñas.
 */
private pickRandomReviews<T>(items: T[], count: number): T[] {
  if (items.length <= count) {
    return [...items];
  }
  const pool = [...items];
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    result.push(pool[randomIndex]);
    pool.splice(randomIndex, 1);
  }
  return result;
}
```

> **Nota para Copilot:** no uses `Array.prototype.sort(() => Math.random() - 0.5)` para esto — es un patrón conocido por producir una distribución sesgada (no verdaderamente aleatoria). Usa el Fisher-Yates parcial de arriba.

---

## Tarea 3 — Componente `ReviewsComponent`

**Carpeta a crear:** `src/app/components/sections/reviews/`

### `reviews.component.ts`

```typescript
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { ReviewItem, ReviewsSection } from '../../../services/app-data.interface';

@Component({
  selector: 'app-reviews',
  imports: [MatButtonModule, FaIconComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent {
  data = input.required<ReviewsSection>();

  readonly starSolid = faStarSolid;
  readonly starRegular = faStarRegular;

  /** Devuelve un array [true, true, true, false, false] para pintar 5 estrellas. */
  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < rating);
  }

  /** Inicial del nombre para el avatar circular, estilo Google ("María G." → "M"). */
  getInitial(author: string): string {
    return author?.trim().charAt(0).toUpperCase() ?? '?';
  }

  /** Fecha relativa estilo Google ("hace 2 meses") en lugar de fecha absoluta. */
  getRelativeDate(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'hoy';
    if (diffDays === 1) return 'hace 1 día';
    if (diffDays < 30) return `hace ${diffDays} días`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return 'hace 1 mes';
    if (diffMonths < 12) return `hace ${diffMonths} meses`;

    const diffYears = Math.floor(diffMonths / 12);
    return diffYears === 1 ? 'hace 1 año' : `hace ${diffYears} años`;
  }

  trackByAuthorAndDate(index: number, item: ReviewItem): string {
    return `${item.author}-${item.date}`;
  }
}
```

> **Nota para Copilot:** si `@fortawesome/free-regular-svg-icons` no está instalado todavía en `package.json`, instálalo (`npm install @fortawesome/free-regular-svg-icons`) — se necesita para las estrellas vacías en outline, que es el estilo exacto que usa Google (estrella sólida dorada para las puntuadas, estrella de contorno gris para el resto).

### `reviews.component.html`

```html
@if (data().items.length > 0) {
<section id="resenas" class="reviews">
  <div class="container">
    <div class="section-texts">
      <h2 class="section-title">{{ data().title }}</h2>
      <p class="section-description">{{ data().subtitle }}</p>
    </div>

    <div class="reviews-cards">
      @for (item of data().items; track trackByAuthorAndDate($index, item)) {
      <div class="review-card">
        <div class="review-header">
          <div class="avatar">{{ getInitial(item.author) }}</div>
          <div class="author-info">
            <span class="author-name">{{ item.author }}</span>
            <span class="review-date">{{ getRelativeDate(item.date) }}</span>
          </div>
        </div>

        <div class="stars" [attr.aria-label]="item.rating + ' de 5 estrellas'">
          @for (filled of getStars(item.rating); track $index) {
          <fa-icon [icon]="filled ? starSolid : starRegular" class="star"></fa-icon>
          }
        </div>

        <p class="review-text">{{ item.text }}</p>
      </div>
      }
    </div>

    @if (data().googleReviewsUrl) {
    <div class="reviews-cta">
      <a
        mat-stroked-button
        class="google-reviews-btn"
        [href]="data().googleReviewsUrl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver todas las opiniones en Google
      </a>
    </div>
    }
  </div>
</section>
}
```

### `reviews.component.scss`

Sigue el mismo patrón visual que `promotions.component.scss` (sección con `padding-top: 6rem`, título `clamp()`, tarjetas con `border-radius: var(--border-radius)`), pero con el layout propio de una reseña estilo Google (avatar + nombre + estrellas + texto):

```scss
.reviews {
  padding: 60px 0;
  padding-top: 6rem;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--gray-background);

  @media (max-width: 720px) {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .container {
    max-width: 1400px;
  }
}

.section-texts {
  text-align: center;

  .section-title {
    font-size: clamp(2rem, 5vw, 4rem);
    line-height: 1;
    font-weight: 700;
  }

  .section-description {
    font-size: clamp(0.5rem, 4vw, 1.25rem);
    line-height: 1.75rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    color: var(--text-color-footer);
    margin-top: 2rem;
  }
}

.reviews-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 3rem;
  width: 100%;
}

.review-card {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border: 1px solid var(--border-color);
  gap: 0.75rem;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  color: var(--primary-contrast-color);
  font-weight: 700;
  font-size: 1.1rem;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.review-date {
  font-size: 0.8rem;
  color: var(--text-color-footer);
}

.stars {
  display: flex;
  gap: 2px;

  .star {
    font-size: 0.95rem;
    color: var(--primary-color);
  }
}

.review-text {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #333;

  // Trunca reseñas muy largas a 5 líneas, estilo Google
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.reviews-cta {
  margin-top: 2.5rem;

  .google-reviews-btn {
    border-radius: calc(0.5rem - 2px);
    padding: 0.5rem 1.5rem;
  }
}

@media (max-width: 720px) {
  .reviews-cards {
    grid-template-columns: 1fr;
  }
}
```

---

## Tarea 4 — Registrar la sección en `home.component.html`

**Archivo a modificar:** `src/app/pages/home/home.component.html`

Añade la nueva sección, idealmente entre "Seguros" y "Contacto" (las reseñas funcionan bien como refuerzo de confianza justo antes del formulario de contacto):

```html
<!-- Hero Section -->
<app-hero [data]="data().sections.hero"></app-hero>

<!-- Services Section -->
<app-services [data]="data().sections.services"></app-services>

<!-- Promotions Section -->
<app-promotions [data]="data().sections.promotions"></app-promotions>

<!-- Timetible Section -->
<app-timetable [data]="data().sections.timetable"></app-timetable>

<!-- Insurance Section -->
<app-insurances [data]="data().sections.insurances"></app-insurances>

<!-- Reviews Section -->
<app-reviews [data]="data().sections.reviews"></app-reviews>

<!-- Contact Section -->
<app-contact [data]="data().sections.contact"></app-contact>
```

**Archivo a modificar:** `src/app/pages/home/home.component.ts`

Añade `ReviewsComponent` al array `imports` del decorador `@Component`, junto al resto de componentes de sección ya importados.

**Archivo a modificar (si existe un barrel export):** `src/app/components/sections/index.ts` (o como se llame el archivo que reexporta los componentes de sección) — añade `export * from './reviews/reviews.component';` siguiendo el mismo patrón que el resto.

---

## Tarea 5 — Enlace de navegación (opcional pero recomendado)

**Archivo a modificar:** `src/app/services/app-data.service.ts`, dentro de `header.links`

Añade un enlace a la nueva sección para que sea navegable desde el menú:

```typescript
links: [
  { label: 'Servicios', url: 'servicios' },
  { label: 'Promociones', url: 'promociones' },
  { label: 'Horario', url: 'horario' },
  { label: 'Planes', url: 'seguros' },
  { label: 'Reseñas', url: 'resenas' },  // ← añadir
  { label: 'Contacto', url: 'contacto' },
],
```

---

## Criterios de aceptación (verifica esto antes de dar la tarea por terminada)

- [ ] El tipo `review` aparece en el Studio de Sanity como una lista navegable de documentos (no como un singleton), ordenada por fecha descendente.
- [ ] Una reseña con `published: false` no aparece en la web, pero sigue existiendo en Sanity.
- [ ] En cada recarga completa de la página, el conjunto de 10 reseñas mostradas puede variar (verifícalo recargando varias veces con más de 10 reseñas en el dataset).
- [ ] Si hay 10 o menos reseñas en total en Sanity, se muestran todas (sin duplicados ni errores).
- [ ] Si no hay ninguna reseña publicada, la sección completa no se renderiza (gracias al `@if (data().items.length > 0)`).
- [ ] Las estrellas se ven doradas/color primario para la puntuación y en contorno gris para el resto, replicando el patrón visual de Google pero con el color corporativo de la clínica, no con las estrellas amarillas estándar de Google.
- [ ] El texto de reseñas muy largas se trunca visualmente (no rompe el layout de la tarjeta).
- [ ] El botón "Ver todas las opiniones en Google" abre en una pestaña nueva (`target="_blank"` + `rel="noopener noreferrer"`).
- [ ] La sección respeta el espaciado, tipografía y colores (`var(--primary-color)`, `var(--border-radius)`, etc.) del resto del sitio — a simple vista no debe parecer un widget insertado de un proveedor externo.
- [ ] `npm run build` compila sin errores de tipos en `ReviewsSection`/`ReviewItem`.
