import { Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import intlTelInput from 'intl-tel-input';

// (input)="onInputChange($event.target!.value)"
@Component({
  selector: 'app-intl-tel-input',
  template: `
  <input type="tel" class="form-control px-5" [value]="value"  
  
  >
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IntlTelInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IntlTelInputComponent),
      multi: true,
    },
  ]
})
export class IntlTelInputComponent implements ControlValueAccessor, Validator {
  @Input() value: any = '';
  countryCode: string = 'ke'
  phoneUtil = PhoneNumberUtil.getInstance();

  onChange: any = () => { };
  onTouch: any = () => { };
  iti: any;

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }


  ngAfterViewInit() {
    //console.log('ngAfterViewInit');
    this.iti = intlTelInput(this.elementRef.nativeElement, {
      initialCountry: 'ke',
      preferredCountries: ['ke'],

    });
    this.elementRef.nativeElement.addEventListener('countrychange', () => {
      const countryData = this.iti.getSelectedCountryData();
      this.countryCode = countryData.iso2;
      //this.onChange(this.value);
      this.onInputChange(this.value)
    });

    //console.log(this.input.nativeElement.value);
  }

  writeValue(value: any): void {

    if (value) {

      //const number =this.phoneUtil.parse(value, this.countryCode);
      const number = this.phoneUtil.parseAndKeepRawInput(value, this.countryCode);
      this.value = number.getNationalNumber()?.toString();
    }
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', this.value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }


  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onInputChange(value: string): void {
    debugger
    var intelNumber = value;
    try {
      const number = this.phoneUtil.parseAndKeepRawInput(value, this.countryCode);
      this.value = number.getNationalNumber()?.toString();
      intelNumber = this.phoneUtil.format(number, PhoneNumberFormat.E164)
    } catch (e) { }
    this.onChange(intelNumber);
    this.onTouch();
  }
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    let validNumber, required = false;
    try {

      required = control.hasValidator(Validators.required)
      const phoneNumber = this.phoneUtil.parseAndKeepRawInput(
        this.value, this.countryCode
      );
      validNumber = this.phoneUtil.isValidNumber(phoneNumber);
    } catch (e) { }

    var value = control.value
    if (!value && !required) {
      return null;
    }
    return validNumber ? null : { phoneNumber: true }
  }
  registerOnValidatorChange?(fn: () => void): void {

  }
}