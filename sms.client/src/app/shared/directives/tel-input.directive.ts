import { Directive, ElementRef, HostListener, OnInit, Optional, Renderer2, Self } from '@angular/core';
import intlTelInput from 'intl-tel-input';

import { ControlValueAccessor, NgControl, NG_VALIDATORS} from '@angular/forms';
import { PhoneNumber, PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';



import { IntelPhoneNumber } from '../models/intel-phone-number';
import { phoneNumberValidator } from '../custom-validators/phone-number-validator';



@Directive({
  selector: '[appTelInput]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: phoneNumberValidator,
      multi: true,
    }
  ]

})
export class TelInputDirective implements ControlValueAccessor , OnInit{

  //Obosolute
   phoneNumberUtil = PhoneNumberUtil.getInstance();
  iti: any;
  value?: IntelPhoneNumber;
  disabled = false;
  onChange = (value: IntelPhoneNumber) => { };
  onTouched = () => { };
  constructor(
    @Self() @Optional() private control: NgControl,
    private el: ElementRef,
    private renderer: Renderer2

  ) {
    this.control.valueAccessor = this;
debugger
    this.iti = intlTelInput(el.nativeElement, {
      initialCountry: "ke",
      preferredCountries: ['ke'],

    });


  }
  ngOnInit(): void {

    this.el.nativeElement.addEventListener("countrychange", () => {

      let p:string=this.value ?this.value?.phoneNumber : '';
      var countryInfo = this.iti.getSelectedCountryData();
       var phone=  this.getParsedNumber(p,countryInfo.iso2!);
       if(phone){

         var national=phone.getNationalNumber();
         if(national){
          p=national.toString()
         }


       }


      this.onInput(p)
    });
  }
  private removeDialCode(phoneNumber: string): string {
    debugger;
    var countryInfo = this.iti.getSelectedCountryData();
		const number = this.getParsedNumber(phoneNumber, countryInfo.dialCode!);
		phoneNumber = this.phoneNumberUtil.format(
			number,
			PhoneNumberFormat.INTERNATIONAL
		);
		if (phoneNumber.startsWith('+') ) {
			phoneNumber = phoneNumber.substr(phoneNumber.indexOf(' ') + 1);
		}
		return phoneNumber;
	}
  private getParsedNumber(
		phoneNumber: string,
		countryCode: string
	): PhoneNumber {
		let number: PhoneNumber;
		try {
			number = this.phoneNumberUtil.parse(phoneNumber, countryCode.toUpperCase());
		} catch (e) {}
		// @ts-ignore
    return number;
	}


  registerOnValidatorChange?(fn: () => void): void {
    throw new Error('Method not implemented.');
  }
  writeValue(obj: any): void {
    debugger
    if (obj === undefined || obj === null || obj.phoneNumber===null) {
      obj = '';
    }
    this.renderer.setAttribute(
      this.el.nativeElement,
      'value',
      obj.phoneNumber
    );
    if (!this.value) {

      setTimeout(() => {
        this.onInput(obj)
      }, 1);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange=fn

  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }
  @HostListener('input', ['$event.target.value']) onInput = (_: any) => {
    console.log("onchange  =>", _);
    var countryInfo = this.iti.getSelectedCountryData();
    //var national=this.phoneNumberUtil.format(_, PhoneNumberFormat.NATIONAL)
    //console.log("onchange national  =>", national);
    var number=  this.getParsedNumber(_,countryInfo.iso2!);
    console.log("number => => ",number);
    this.value = {
      countryCode: countryInfo.dialCode,
      phoneNumber: _,
      iso2: countryInfo.iso2,
      intelNumber:number ? this.phoneNumberUtil.format(number, PhoneNumberFormat.E164): '',
    }





    this.control.control?.setValue(this.value)

  };
  @HostListener('keypress', ['$event']) onInputKeyPress(event: KeyboardEvent) {
    debugger;
    const allowedChars = /[0-9\+\-\(\)\ ]/;
    const allowedCtrlChars = /[axcv]/; // Allows copy-pasting
    const allowedOtherKeys = [
      'ArrowLeft',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown',
      'Home',
      'End',
      'Insert',
      'Delete',
      'Backspace',
    ];

    if (
      !allowedChars.test(event.key) &&
      !(event.ctrlKey && allowedCtrlChars.test(event.key)) &&
      !allowedOtherKeys.includes(event.key)
    ) {
      event.preventDefault();
    }
  }


}


