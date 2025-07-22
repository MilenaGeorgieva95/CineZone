import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'starRating',
})
export class StarRatingPipe implements PipeTransform {
  transform(value: number): string {
    const fullStars = Math.floor(value/2);
    const halfStar = value - fullStars >= 0.5;
    const emptyStars =5 - fullStars - (halfStar ? 1 : 0);
    return '★'.repeat(fullStars) + (halfStar ? '⯪' : '')+'☆'.repeat(emptyStars);
  }
}
