import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateUser } from 'src/app/models/user-responce.models';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss'],
})
export class SignInModalComponent {
  protected authForm: FormGroup;
  constructor(private router: Router, private authService: AuthorizationService) {
    this.authForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      name: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  protected async onClickSubmitBtn(){
    const user: ICreateUser = {
      name: this.authForm.get('name')?.value,
      email: this.authForm.get('email')?.value,
      password: this.authForm.get('password')?.value
    }
    const responce = await this.authService.createUser(user);
    console.log(responce);
  }

  protected async goToLoginIn() {
    await this.router.navigate(['/logIn']);
  }
}
