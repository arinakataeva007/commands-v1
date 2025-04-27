import { ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICreateUser } from 'src/app/models/user-responce.models';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss'],
})
export class SignInModalComponent implements OnDestroy {
  constructor(private router: Router, private authService: AuthorizationService, private renderer:Renderer2, private el: ElementRef, private location: Location) {
    this.authForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      name: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
    this.listenerClickFn = this.renderer.listen('document', 'mousedown', event => {
			const clickedInside = this.el.nativeElement.contains(event.target);
			if (!clickedInside) {
				this.location.back();
			}
		});
  }

  ngOnDestroy(): void {
    this.listenerClickFn();
  }
  
  protected authForm: FormGroup;
  private listenerClickFn = ()=> {};
  private cdr = inject(ChangeDetectorRef);

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
