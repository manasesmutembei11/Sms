import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'trueOrFalse',
})
export class TrueOrFalsePipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}
  transform(value: boolean, ...args: unknown[]): SafeHtml {
    var checked = '';
    if (value) {
      checked = 'checked';
    }
    var html = `<input class="form-check-input" type="checkbox" ${checked}   disabled/>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
}
