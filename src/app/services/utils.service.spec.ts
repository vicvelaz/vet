import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';
import { APP_DEFAULTS } from './app-data.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('selects ten unique reviews without mutating the source', () => {
    const reviews = Array.from({ length: 15 }, (_, index) => ({
      author: `Author ${index}`,
      rating: 5,
      text: `Review ${index}`,
      date: `2026-01-${String(index + 1).padStart(2, '0')}`,
    }));

    const result = service.mergeWithDefaults(APP_DEFAULTS, { reviews }).sections.reviews.items;

    expect(result).toHaveSize(10);
    expect(new Set(result.map((review) => review.author)).size).toBe(10);
    expect(reviews).toHaveSize(15);
  });

  it('keeps all reviews when there are ten or fewer', () => {
    const reviews = Array.from({ length: 4 }, (_, index) => ({
      author: `Author ${index}`,
      rating: 5,
      text: `Review ${index}`,
      date: '2026-01-01',
    }));

    const result = service.mergeWithDefaults(APP_DEFAULTS, { reviews }).sections.reviews.items;

    expect(result).toEqual(reviews);
  });
});
