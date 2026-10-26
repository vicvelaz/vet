import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ReviewItem, ReviewsSection } from '../../../services/app-data.interface';
import { RevealOnScrollDirective } from '../../ui/reveal-on-scroll.directive';

@Component({
  selector: 'app-reviews',
  imports: [MatButtonModule, RevealOnScrollDirective],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewsComponent {
  data = input.required<ReviewsSection>();

  getStars(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, index) => index < rating);
  }

  getInitial(author: string): string {
    return author?.trim().charAt(0).toUpperCase() || '?';
  }

  getRelativeDate(dateStr: string): string {
    const date = new Date(dateStr);
    const diffDays = Math.floor((Date.now() - date.getTime()) / 86_400_000);

    if (!Number.isFinite(diffDays)) return '';
    if (diffDays < 1) return 'hoy';
    if (diffDays === 1) return 'hace 1 día';
    if (diffDays < 30) return `hace ${diffDays} días`;

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths === 1) return 'hace 1 mes';
    if (diffMonths < 12) return `hace ${diffMonths} meses`;

    const diffYears = Math.floor(diffMonths / 12);
    return diffYears === 1 ? 'hace 1 año' : `hace ${diffYears} años`;
  }

  trackByAuthorAndDate(_index: number, item: ReviewItem): string {
    return `${item.author}-${item.date}`;
  }
}