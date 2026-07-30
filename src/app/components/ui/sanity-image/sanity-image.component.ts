import { NgIf } from '@angular/common';
import { Component, computed, inject, input, PLATFORM_ID } from '@angular/core';
import { SanityService } from '../../../services/sanity.service';

export interface SanityImageConfig {
  width?: number;
  height?: number;
  quality?: number; // 1-100, default 80
  format?: 'webp' | 'jpg' | 'png' | 'auto';
  fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
}

@Component({
  selector: 'app-sanity-image',
  standalone: true,
  imports: [NgIf],
  template: `
    <img
      *ngIf="src()"
      [src]="src()"
      [srcset]="srcset()"
      [width]="resolvedWidth()"
      [height]="resolvedHeight()"
      [alt]="alt() ?? ''"
      [attr.loading]="loading()"
      [attr.decoding]="'async'"
      [class]="className()"
    />
  `,
})
export class SanityImageComponent {
  private readonly sanity = inject(SanityService);
  private readonly platformId = inject(PLATFORM_ID);

  // ── Inputs ──────────────────────────────────────────────────────────
  /** Sanity image object (con asset._ref) */
  readonly image = input.required<any | null | undefined>();

  /** Alt text. Si no se pasa, usa image.alt del schema de Sanity */
  readonly alt = input<string | undefined>(undefined);

  /** Ancho de salida en px */
  readonly width = input<number | undefined>(undefined);

  /** Alto de salida en px */
  readonly height = input<number | undefined>(undefined);

  /** Calidad 1-100 (default: 80) */
  readonly quality = input<number>(80);

  /** Formato de salida (default: webp) */
  readonly format = input<'webp' | 'jpg' | 'png' | 'auto'>('webp');

  /** Comportamiento de recorte */
  readonly fit = input<'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'>('max');

  /**
   * loading="lazy" por defecto. Usar "eager" para imágenes above-the-fold
   * (hero, LCP) — mejora el Core Web Vital LCP.
   */
  readonly loading = input<'lazy' | 'eager'>('lazy');

  /** Clase CSS aplicada al <img> */
  readonly className = input<string>('');

  // ── Computed signals ─────────────────────────────────────────────────

  /** URL base con los parámetros de transformación */
  readonly src = computed(() => {
    // const img = this.image();
    // if (!img?.asset?._ref) return null;
    // let builder = this.sanity.imageUrl(img).quality(this.quality()).fit(this.fit()).auto('format'); // sirve webp a browsers que lo soportan
    // if (this.width()) builder = builder.width(this.width()!);
    // if (this.height()) builder = builder.height(this.height()!);
    // return builder.url();
  });

  /**
   * srcset responsivo automático.
   * Si se especifica width genera 1x y 2x.
   * Si no, genera una escala estándar de breakpoints.
   */
  readonly srcset = computed(() => {
    // const img = this.image();
    // if (!img?.asset?._ref) return null;

    // const w = this.width();

    // const buildUrl = (px: number) =>
    //   this.sanity.imageUrl(img).width(px).quality(this.quality()).fit(this.fit()).auto('format').url();

    // if (w) {
    //   // Retina: 1x y 2x del tamaño solicitado
    //   return `${buildUrl(w)} 1x, ${buildUrl(w * 2)} 2x`;
    // }

    // // Sin width explícito: breakpoints estándar
    // const breakpoints = [320, 640, 768, 1024, 1280, 1536];
    // return breakpoints.map((bp) => `${buildUrl(bp)} ${bp}w`).join(', ');
    return null; // TODO: srcset responsivo
  });

  /** Ancho inferido del _ref si no se proporciona (para el atributo HTML width) */
  readonly resolvedWidth = computed(() => {
    if (this.width()) return this.width();
    return this.extractDimension('width');
  });

  /** Alto inferido del _ref si no se proporciona (para el atributo HTML height) */
  readonly resolvedHeight = computed(() => {
    if (this.height()) return this.height();
    return this.extractDimension('height');
  });

  // ── Helpers ──────────────────────────────────────────────────────────

  /**
   * Extrae ancho o alto directamente del _ref.
   * "image-abc123-1024x768-webp" → width: 1024, height: 768
   * Evita layout shift (CLS) sin necesitar una petición extra a la API.
   */
  private extractDimension(dimension: 'width' | 'height'): number | undefined {
    const ref = this.image()?.asset?._ref;
    if (!ref) return undefined;

    // Formato: image-{hash}-{W}x{H}-{ext}
    const match = ref.match(/-(\d+)x(\d+)-/);
    if (!match) return undefined;

    return dimension === 'width' ? parseInt(match[1], 10) : parseInt(match[2], 10);
  }
}
