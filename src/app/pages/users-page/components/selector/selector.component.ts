import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
@Component({
  standalone: true,
  selector: 'app-selector',
  imports: [CommonModule],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.css',
})
export class SelectorComponent implements AfterViewInit, OnDestroy, OnInit {

  public expanded: boolean = false;
  public firstSelected: any;
  @Input() public items: {id: any, name: string}[] = [];
  @Input() public selected: any;
  @Output() public onUpdate: EventEmitter<any> = new EventEmitter<any>();
  @ViewChildren('option') public options: QueryList<ElementRef>|undefined;
  @ViewChild('checkmark') public checkmark: ElementRef|undefined;
  private destroy$: Subject<void> = new Subject<void>();

  public ngOnInit(): void {
    this.selected = this.selected ?? this.items[0].id;
    this.firstSelected = this.selected;
  }

  public ngAfterViewInit(): void {
    let index: number = 0;

    this.options?.changes.pipe(
      takeUntil(this.destroy$)
    ).subscribe((c) => { c.toArray().forEach(
      (item: ElementRef) => { 
        if (index === this.getIndexById(this.selected)) {
          item.nativeElement.classList.add('checkmark__selected');
        }
        index++;
      });
      index = 0;
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  public getSelectedIndex(): number {
    return this.items.findIndex(item => item.id === this.selected);
  }

  public onOptionClick(item: {id: any, name: string}): void {
    this.selected = item.id;
    this.expanded = false;
    this.onUpdate.emit(item.id);

    if (this.selected !== this.firstSelected) {
      this.checkmark?.nativeElement.classList.add('checkmark__selected');
    }
  }

  private getIndexById(id: any): number {
    return this.items.findIndex(item => item.id === id);
  }
}