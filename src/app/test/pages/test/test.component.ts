import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../interfaces/question.interfaces';
import { QuestionService } from '../../services/question/question.service';
import { ScoreService } from '../../services/score/score.service';
import { ScoreRequest } from '../../interfaces/score.intefaces';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  @Output() headerEmitter = new EventEmitter<boolean>();

  rules: string[] = [
    'Solo tendras 30 segundos para elegir una respuesta',
    'Por cada respuesta acertada sumaras 1 punto',
    'Si respondes incorrectamente, se te acaba el tiempo o no respondes, no ganas, ni pierdes puntos',
  ];

  questions: Question[] = [
    {
      question_id: 6,
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

  unit_id: number = 0;
  check: boolean = false;

  showStart: boolean = true;
  showSecond: boolean = false;
  counter: number = 0;
 

  points: number = 0;
  clicked: boolean = false;
  interval: any = 0;
  time: number = 0;
  totalTime: number = 0;
  login_id: number = 0;
  score!: ScoreRequest
  
  constructor( private router: Router, private activatedRoute: ActivatedRoute, 
    private questionService: QuestionService, private scoreService: ScoreService ) { }
  
  ngOnInit(): void {
    this.login_id = Number(localStorage.getItem('login_id'));

    this.activatedRoute.params.subscribe( ({ unit_id }) => {
      
      this.unit_id = unit_id;
      this.questionService.getQuestionsByUnit( unit_id ).subscribe( res => {
        if ( res.success ) {
          let questions: Question[] = [];
          
          res.data?.forEach( ( question: Question ) => {
            questions.push(
              {
                question_id: question.question_id,
                question_name: question.question_name,
                question_answers: JSON.parse(String(question.question_answers)),
                question_correctAnswer: question.question_correctAnswer,
                unit_id: question.unit_id
              }
            );
          });

          this.questions = questions;
        }
      });

    });

    this.setChangeStartToQuestion();
    window.addEventListener('blur', () => {

      if ( this.showSecond ) {
        this.saveDataScore();
        this.sendScore();
        alert('Haz intentado hacer trampa, tus respuestas han sido enviadas')
      }

    });
  }

  setChangeStartToQuestion() :void {
    const element = document.getElementById('window-start');
    element?.addEventListener('transitionend', (e) => {

      if (!this.showStart && e.propertyName === 'opacity') {
        element.style.display = 'none';
        
        const element2 = document.getElementById('window-second');
        if (element2) {
          element2.style.display = 'block';
        }
      }

    });

  }

  startTest() :void {
    this.showStart = false;
    this.showSecond = true;
    this.headerEmitter.emit(this.showStart);
    this.setChangeSecondWindow();
    this.startTimer();
    this.saveDataScore

    const element = document.getElementsByTagName('section');
    if (element) {
      element[0].style.height = '84vh';
    }
  }
  
  selectAnswer( answerID: number ) :void {
    if (!this.clicked) {

      const element = document.getElementById(answerID.toString());
      if (element) {
        if ( this.questions[this.counter].question_correctAnswer == answerID+1 ) {
          this.points+=1; 
          this.saveDataScore();
        }
      }
      
    } 
    
    this.clicked = true;
    this.stopTimer();
    this.showSecond = false;
  }

  setChangeSecondWindow() :void {
      const win_second = document.getElementById('window-second');      
      win_second?.addEventListener('transitionend', (event) => {
        
        if ( !this.showSecond && event.propertyName === 'opacity' ) {
          const nextCounter = this.counter+1;
          
          if ( nextCounter < this.questions.length ) {
            this.counter++;
            this.startTimer();
          } else {
            const cont_question = document.getElementById('cont-questions');
            if (cont_question) { cont_question.style.display = 'none' };
            
            const element2 = document.getElementById('cont-finish');
            if (element2) {
              element2.style.display = 'flex';
            }
          }
        }
        
        this.showSecond = true;
        this.clicked = false;

      });
  }

  finishTest() :void {
    this.saveDataScore();
    this.sendScore();
  }

  startTimer() :void {
    this.time = 10;
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.totalTime++;
        this.time--;
      }else {
        this.stopTimer();
        this.showSecond = false;
      }
    }, 1000);
  }

  stopTimer() :void {
    clearInterval(this.interval);
  }

  saveDataScore() :void {
    this.score = {
      score: this.points,
      time: this.totalTime,
      resume: "",
      login_id: this.login_id,
      unit_id: this.unit_id
    }
  }

  sendScore(): void {
    this.scoreService.addScore( this.score ).subscribe( res => {
      
      if ( res.success ) {
        this.router.navigate(['/home']);
        this.headerEmitter.emit(true); 
      }

    });
  }
}
