import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})

export class StartComponent implements OnInit {
  
  rules: string[] = [
    'Solo tendras 15 segundos para elegir una respuesta',
    'Por cada respuesta acertada sumaras 1 punto',
    'Si respondes incorrectamente, se te acaba el tiempo o no respondes, no ganas, ni pierdes puntos',
  ];

  check: boolean = false;

  constructor() { }

  ngOnInit(): void {
    window.addEventListener('blur', () => {
      console.log('blur');
    });

    window.addEventListener('visibilitychange', () => {
      console.log('visibilitychange');
    });
  }

}
