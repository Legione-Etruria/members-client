import { Pipe } from '@angular/core';

@Pipe({
  name: 'phone',
})
export class PhonePipe {
  transform(rawNum: string) {
    return `<a href="tel:+39${rawNum}" class="text-blue-400 hover:underline ">${rawNum}</a>`;
  }
}
