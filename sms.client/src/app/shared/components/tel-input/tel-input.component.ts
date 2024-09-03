import {
  Component,
  ElementRef,
  forwardRef,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import {
  PhoneNumber,
  PhoneNumberFormat,
  PhoneNumberUtil,
} from 'google-libphonenumber';

import { phoneNumberValidator } from '../../custom-validators/phone-number-validator';
import { IntelPhoneNumber } from '../../models/intel-phone-number';
import intlTelInput from 'intl-tel-input';


@Component({
  selector: 'app-tel-input',
  templateUrl: './tel-input.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TelInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TelInputComponent),
      multi: true,
    },
  ],
})
export class TelInputComponent implements OnInit, ControlValueAccessor, Validator {
  phoneNumberUtil = PhoneNumberUtil.getInstance();
  value?: IntelPhoneNumber;
  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };
  disabled: boolean = false;

  @ViewChild('telInputElement') input!: ElementRef;
  iti!: any;
  isoCode: string = "ke";
  constructor() { }


  ngOnInit(): void { }
  ngOnChanges(changes: SimpleChanges) {

  }
  handleInput(event: Event) {

    const value = (event.target as HTMLInputElement).value;
    this.value = this.buildValue(value);

    this.onChange(this.value.intelNumber);
  }
  buildValue(value: string): IntelPhoneNumber {
    var countryInfo = this.iti.getSelectedCountryData();

    let intelNumber = '';
    let nationalNumber: any = value;
    var number = this.getParsedNumber(value, countryInfo.iso2);
    if (number) {
      intelNumber = this.phoneNumberUtil.format(number, PhoneNumberFormat.E164);
      nationalNumber = number.getNationalNumber()?.toString()
    }

    return {
      countryCode: countryInfo.dialCode,
      phoneNumber: nationalNumber,
      iso2: countryInfo.iso2,
      intelNumber: intelNumber,
    };
  }
  private getParsedNumber(
    phoneNumber: string,
    countryCode: string
  ): PhoneNumber {
    let number: PhoneNumber;
    try {
      number = this.phoneNumberUtil.parse(
        phoneNumber,
        countryCode.toUpperCase()
      );
      number = this.phoneNumberUtil.parse(
        number.getNationalNumber()?.toString(),
        countryCode.toUpperCase()
      );
    } catch (e) { }
    // @ts-ignore
    return number;
  }

  ngAfterViewInit() {
    this.iti = intlTelInput(this.input.nativeElement, {
      initialCountry: this.isoCode,
      // preferredCountries: ['ke'],

    });
    this.input.nativeElement.addEventListener('countrychange', () => {
      const countryData = this.iti.getSelectedCountryData();
      this.isoCode = countryData.iso2;
      let phoneNumber = this.value ? this.value.phoneNumber : '';
      this.value = this.buildValue(phoneNumber);
      this.onChange(this.value.intelNumber);
    });


  }

  writeValue(value: string): void {


    this.value = { phoneNumber: value };
    if (this.value.phoneNumber && this.value.phoneNumber.startsWith("+")) {

      const number = this.phoneNumberUtil.parse(this.value.phoneNumber);
      var phoneCode = number.getCountryCode()!;

      this.isoCode = this.phoneNumberUtil.getRegionCodeForCountryCode(phoneCode);
      var internationNumber = this.phoneNumberUtil.format(number, PhoneNumberFormat.E164)
      //const number = this.phoneNumberUtil.parseAndKeepRawInput(this.value.phoneNumber, "");
      this.value = {
        phoneNumber: number.getNationalNumber()?.toString() ?? "",
        countryCode: phoneCode.toString(),
        intelNumber: internationNumber,
        iso2: this.isoCode
      };
      if (this.iti) {
        this.iti.setCountry(this.isoCode!)
      }
    }


  }
  registerOnChange(fn: any): void {

    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {

    this.disabled = isDisabled;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    let validNumber, required = false;
    var numberValue = this.value?.phoneNumber ?? "";
    try {

      required = control.hasValidator(Validators.required)
      const phoneNumber = this.phoneNumberUtil.parseAndKeepRawInput(
        numberValue, this.isoCode
      );
      validNumber = this.phoneNumberUtil.isValidNumber(phoneNumber);
    } catch (e) { }


    if (!numberValue && !required) {
      return null;
    }
    return validNumber ? null : { phoneNumber: true }
  }
  registerOnValidatorChange?(fn: () => void): void {

  }
}
