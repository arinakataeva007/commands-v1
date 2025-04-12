import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-modal',
  templateUrl: './log-in-modal.component.html',
  styleUrls: ['./log-in-modal.component.scss']
})
export class LogInModalComponent {
  constructor(private router: Router){}

  protected async goToSignIn(){
    await this.router.navigate(['/signIn']);
  }
}
