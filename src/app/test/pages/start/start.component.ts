import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})

export class StartComponent implements OnInit {
  
  @Output() headerEmitter = new EventEmitter<boolean>();

  rules: string[] = [
    'Solo tendras 15 segundos para elegir una respuesta',
    'Por cada respuesta acertada sumaras 1 punto',
    'Si respondes incorrectamente, se te acaba el tiempo o no respondes, no ganas, ni pierdes puntos',
  ];

  check: boolean = false;
  showStart: boolean = true ;

  constructor() { }

  ngOnInit(): void {

    this.setDisplayNone('start');

    window.addEventListener('blur', () => {
      console.log('blur');
    });
  }
  
  start() :void {
    this.showStart = false;
    this.headerEmitter.emit(this.showStart);
  }

  setDisplayNone(component: string) {
    const element = document.getElementById(component);
    element?.addEventListener('transitionend', () => {
      if (!this.showStart) {
        element.style.display = 'none';
      }
    });
  }

}
