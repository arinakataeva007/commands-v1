import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICheckser } from 'src/app/models/responce/user-responce.models';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { map, tap } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-log-in-modal',
  templateUrl: './log-in-modal.component.html',
  styleUrls: ['./log-in-modal.component.scss'],
})
export class LogInModalComponent {
  constructor(
    private authService: AuthorizationService,
    private router: Router,
    private localStorage: StorageService
  ) {
    this.authForm = new FormGroup({
      email: new FormControl('kataevaarinka@gmail.com', [Validators.required]),
      password: new FormControl('arinka785', [Validators.required]),
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
    this.authService
      .checkUser(user)
      .pipe(
        map((res) => res.uid),
        tap((uid) => this.router.navigate(['/homepage', uid]))
      )
      .subscribe({
        next: (userId: string) => {
          this.localStorage.setItem(userId, JSON.stringify(user));
        },
        error: (err) => {
          console.error('Ошибка при проверке пользователя', err);
        },
      });
  }
}
