import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-next',
  templateUrl: './button-next.component.html',
  styleUrls: ['./button-next.component.scss']
})

export class ButtonNextComponent {
  @Input() text!: string;
  @Input() valid!: boolean;
  @Input() red!: boolean;
  @Input() green!: boolean;
}
