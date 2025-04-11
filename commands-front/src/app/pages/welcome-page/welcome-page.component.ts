import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent {
  constructor(private router: Router){}
  protected goToLogIn(){
    this.router.navigate(['/logIn']);
  }
  protected goToSignIn(){
    this.router.navigate(['/signIn']);
  }
}
