import { TemplatePortal } from '@angular/cdk/portal';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isToday'
})
export class IsTodayPipe implements PipeTransform {

  transform(value: Date, day: number): string {
    return day === new Date().getDate() ? "calendar__today" : "";
  }

}
