import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Telecommunications-front';
  header = true;

  onActivate(component: any) {
    if (component.headerEmitter) {
      component.headerEmitter.subscribe((data: boolean) => {
        this.header = data;
      });
      console.log('onActivate');
      
    }
  }

}
