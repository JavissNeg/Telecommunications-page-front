import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Question } from '../../interfaces/question.interfaces';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})

export class StartComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {

    this.setChangeStartToQuestion();
    window.addEventListener('blur', () => {
      console.log('blur');
    });

  }



  @Output() headerEmitter = new EventEmitter<boolean>();
  rules: string[] = [
    'Solo tendras 30 segundos para elegir una respuesta',
    'Por cada respuesta acertada sumaras 1 punto',
    'Si respondes incorrectamente, se te acaba el tiempo o no respondes, no ganas, ni pierdes puntos',
  ];
  check: boolean = false;
  showStart: boolean = true;
  
  start() :void {
    this.showStart = false;
    this.showAnswers = true;
    this.headerEmitter.emit(this.showStart);
  }

  setChangeStartToQuestion() :void {
    const element = document.getElementById('window-start');
    
    element?.addEventListener('transitionend', () => {
      if (!this.showStart) {
        element.style.display = 'none';
        
        const element2 = document.getElementById('window-question');
        if (element2) {
          element2.style.display = 'flex';
        }
      }
    });

  }


  showAnswers: boolean = false;
  counter: number = 0;
  questions: Question[] = [
    {
      question_id: 6,
      question_number: 1,
      question_name: "Que es un componente?",
      question_answers: [ 
        'Un componente es aquel que se encarga de gestionar la vista de la aplicación',
        'Un componente es aquel que se encarga de gestionar la lógica de la aplicación',
        'Un componente es aquel que se encarga de gestionar la vista y la lógica de la aplicación',
        'Un componente es aquel que se encarga de gestionar la vista, la lógica y los datos de la aplicación',
      ],
      question_correctAnswer: 1,
      unit_id: 1
    },
    {
      question_id: 6,
      question_number: 2,
      question_name: "Que es el decorador @Component?",
      question_answers: [
        'El decorador @Component es el que se encarga de gestionar la vista de la aplicación',
        'El decorador @Component es el que se encarga de gestionar la lógica de la aplicación',
        'El decorador @Component es el que se encarga de gestionar la vista y la lógica de la aplicación',
        'El decorador @Component es el que se encarga de gestionar la vista, la lógica y los datos de la aplicación', 
      ],
      question_correctAnswer: 2,
      unit_id: 1
    },
  ];
  points: number = 0;

  selectAnswer(answerID: number ) :void {
    console.log(answerID+1);
    this.showAnswers = false;

    const element = document.getElementById(answerID.toString());
    element?.addEventListener('transitionend', () => {
      if ( this.showAnswers == false ) {
        this.questions[this.counter].question_correctAnswer === answerID+1 ? this.points+=1 : this.points+=0
        this.counter++;
        
        if (this.counter < this.questions.length) {
          this.showAnswers = true;
        } else {
          this.showAnswers = false;
          // this.showStart = true;
          // this.headerEmitter.emit(true);
        }
      }
    });

  }

}
