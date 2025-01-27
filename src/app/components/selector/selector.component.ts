import { NgFor } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
@Component({
  standalone: true,
  selector: 'app-selector',
  imports: [NgFor, FormsModule],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: SelectorComponent,
      multi: true
    }
  ]
})
export class SelectorComponent implements ControlValueAccessor, OnInit, Validator {
  @Input() items: {id: any, name: string}[] = [];
  @Input() selected: any;

  public firstSelected: any;
  
  public onTouched: () => void = () => {};

  public onChange: (value: any) => void = (value: any) => {};

  public onSelectionChange(event: any): void {
    this.onTouched();
    this.selected = event.target.value;
    this.onChange(event.target.value);
  }

  public ngOnInit(): void {
    this.selected = this.selected ? this.selected : this.items[0].id;
    this.firstSelected = this.selected;
  }

  public writeValue(value: any): void {
    this.selected = value ? value : this.selected;
  }

  public registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    if (this.selected === this.firstSelected) {
      return {required: true};
    }
    return null;
  }
}
