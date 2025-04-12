import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LogInModalComponent } from '../modal-windows/log-in-modal/log-in-modal.component';
import { SignInModalComponent } from '../modal-windows/sign-in-modal/sign-in-modal.component';
import { AuthorizationService } from '../services/authorization.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [LogInModalComponent, SignInModalComponent],
  imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [AuthorizationService],
  exports: [LogInModalComponent, SignInModalComponent],
})
export class AuthorizationModule {}
