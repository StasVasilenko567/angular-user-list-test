import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsTodayPipe } from '../../pipes/is-today.pipe';
@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, IsTodayPipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  currentDate = new Date();
  days = Array.from({ length: 35 }, (_, i) => new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i - 1));
  daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
}
