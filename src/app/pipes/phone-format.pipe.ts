import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Elimina todo lo que no sea número o "+"
    const cleaned = value.replace(/[^\d+]/g, '');

    // Si comienza con +34 (España), formatea como "+34 911 222 333"
    if (cleaned.startsWith('+34') && cleaned.length === 12) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
    }

    // Otros formatos genéricos
    return cleaned.replace(/(\+?\d{1,3})(\d{3})(\d{3})(\d+)/, '$1 $2 $3 $4');
  }
}
