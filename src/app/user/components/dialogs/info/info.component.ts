import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  
  @Input() show!: boolean;
  @Input() message!: string;
  @Input() status!: boolean;

  @Output() showInfoEmmiter: EventEmitter<boolean> = new EventEmitter();
  
  close(): void {
    this.showInfoEmmiter.emit(false);
  } 
}
