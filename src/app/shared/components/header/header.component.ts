import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  
  constructor( public router: Router, private loginService: LoginService  ) { }

  hasLogin: boolean = this.loginService.is_logged_in();
  
  goLink(link: string) {
    this.router.navigateByUrl(link);
  }

  logout() {
    this.loginService.logged_out();
    this.router.navigateByUrl('/home');
    window.location.reload();
  }
}
