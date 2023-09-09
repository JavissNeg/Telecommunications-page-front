import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  title = 'Telecommunications-front';
  header = true;

  ngOnInit(): void {
    this.setDisplayNone();
  }

  onActivate(component: any) {
    if (component.headerEmitter) {
      component.headerEmitter.subscribe((data: boolean) => {
        const element = document.getElementById('header');
          if (element) {
            if (!this.header) {
              element.style.display = 'block';
              setTimeout(() => {
                this.header = data;
              }, 1);
            } else {
              this.header = data;
            }
        }
      });
    }
  }

  setDisplayNone() : void {
    const element = document.getElementById('header');
    if (element) {
      element.addEventListener('transitionend', (event) => {
        if( !this.header && event.propertyName === 'opacity' ) {
          element.style.display = 'none';
        }
      }); 
    } 
  }

}
