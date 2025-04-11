import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { LogInModalComponent } from './modal-windows/log-in-modal/log-in-modal.component';
import { SignInModalComponent } from './modal-windows/sign-in-modal/sign-in-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    LogInModalComponent,
    SignInModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
