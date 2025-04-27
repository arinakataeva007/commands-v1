import { ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user-responce.models';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss'],
})
export class SignInModalComponent {
  constructor(private router: Router, private authService: AuthorizationService, private renderer:Renderer2, private el: ElementRef, private location: Location) {
    this.authForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      name: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  
  protected authForm: FormGroup;
  private cdr = inject(ChangeDetectorRef);

  protected async onClickSubmitBtn(){
    const user: IUser = {
      name: this.authForm.get('name')?.value,
      email: this.authForm.get('email')?.value,
      password: this.authForm.get('password')?.value
    }
    const responce = await this.authService.createUser(user);
  }

  protected async goToLoginIn() {
    await this.router.navigate(['/logIn']);
  }
}
