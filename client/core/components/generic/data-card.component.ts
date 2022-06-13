import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'data-card',
  templateUrl: 'data-card.component.html'
})
export class DataCardComponent<T> {
  @Input() data: T;
  @Input() size: number = 360;
  @Input() cardStyle: string = 'm4 background-card card-outline-accent rounded';
  @Input() contentStyle: string = 'p4 rounded-left';
  @Input() actionStyle: string = 'p4 background-default rounded-right';

  @Input() openIcon = 'launch';
  @Input() openColor = 'color-default';
  @Input() openTooltip = 'Open';
  @Output() open = new EventEmitter<T>();

  @Input() editIcon = 'edit';
  @Input() editColor = 'color-default';
  @Input() editTooltip = 'Edit';
  @Output() edit = new EventEmitter<T>();

  @Input() removeIcon = 'delete';
  @Input() removeColor = 'color-warn';
  @Input() removeTooltip = 'Remove';
  @Output() remove = new EventEmitter<T>();
}
