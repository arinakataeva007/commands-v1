import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICheckser } from 'src/app/models/responce/user-responce.models';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-log-in-modal',
  templateUrl: './log-in-modal.component.html',
  styleUrls: ['./log-in-modal.component.scss'],
})
export class LogInModalComponent {
  constructor(
    private authService: AuthorizationService,
    private router: Router,
  ) {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  protected authForm: FormGroup;


  protected async goToSignIn() {
    await this.router.navigate(['/signIn']);
  }

  protected async onClickSubmitBtn() {
    const user: ICheckser = {
      email: this.authForm.get('email')?.value,
      password: this.authForm.get('password')?.value,
    };
    const responce = await this.authService.checkUser(user);
    this.router.navigate(['/homepage', responce.uid]);
  }
}
