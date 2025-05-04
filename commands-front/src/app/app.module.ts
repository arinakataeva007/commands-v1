import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { AuthorizationModule } from './moduls/authorization.module';
import { HomeComponent } from './pages/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddProjectModalComponent } from './modal-windows/add-project-modal/add-project-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    HomeComponent,
    NavigationComponent,
    AddProjectModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthorizationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
