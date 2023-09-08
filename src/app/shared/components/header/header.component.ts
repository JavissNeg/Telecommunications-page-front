import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  
  constructor( public router: Router  ) { }

  goLink(link: string) {
    this.router.navigateByUrl(link);
    console.log(link);
  }


}
