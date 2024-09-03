import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import AutoNumeric from 'autonumeric';

export const AUTONUMERIC_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumericInputDirective),
  multi: true
};
@Directive({
  selector: '[appNumericInput]',
  providers: [AUTONUMERIC_CONTROL_VALUE_ACCESSOR],
  host: {
    '(blur)': 'onTouchedFn()'
  },
})
export class NumericInputDirective implements AfterViewInit, OnChanges, OnInit, ControlValueAccessor {

  @Input()
  strategy: 'reset' | 'update' = 'reset';

  @Input() options: any = { decimalPlaces: 2 };
  instance: any;
  private isDisabled = false;
  private initialValue: any;
  @Output()
  formatted = new EventEmitter();
  @Output()
  rawValueModified = new EventEmitter();
  unsubscribeFormat!: () => void;
  unsubscribeRawValueModified!: () => void;

  onChangeFn: (value: any) => void = () => {
  
  }
  onTouchedFn = () => {
  }
  constructor(
    private el: ElementRef,
    private renderer: Renderer2) { }

  writeValue(value: any): void {     
    if (this.instance) {      
      this.instance.set(value);     
    } else {
      // autonumeric hasn't been initialised yet, stor``  e the value for later use
      this.el.nativeElement.value=value
      this.initialValue = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (this.instance) {
      if (this.isDisabled) {
        this.renderer.setProperty(this.instance.domElement, 'disabled', 'disabled');
      } else {
        this.renderer.removeAttribute(this.instance.domElement, 'disabled');
      }
    }
  }
  ngOnInit(): void {

    //this.instance = new AutoNumeric(this.el.nativeElement,this.options);
    /*  this.ctl.valueChanges.pipe(first()).subscribe(s => {
   
     }); */


  }

  ngOnChanges(changes: SimpleChanges): void {
   
  }
  ngAfterViewInit(): void {
  
    this.instance = new AutoNumeric(
      this.el.nativeElement,
      { decimalPlaces: 2, ...this.options}
    );
    this.setDisabledState(this.isDisabled);
    this.unsubscribeFormat = this.renderer.listen(this.el.nativeElement, 'autoNumeric:formatted', ($event) => {
     
      this.formatted.emit($event);
    });
    this.unsubscribeRawValueModified = this.renderer.listen(this.el.nativeElement, 'autoNumeric:rawValueModified', ($event) => {
     
      this.onChangeFn($event.detail.newRawValue);
      this.rawValueModified.emit($event);
    });
  }
  ngOnDestroy(): void {
    this.unsubscribeFormat();
    this.unsubscribeRawValueModified();
    try {
      this.instance.remove(); // remove listeners
    } catch (e) {
    }
  }

}
