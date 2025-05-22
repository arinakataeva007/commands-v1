import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { LogInModalComponent } from './modal-windows/log-in-modal/log-in-modal.component';
import { SignInModalComponent } from './modal-windows/sign-in-modal/sign-in-modal.component';
import { HomeComponent } from './pages/home/home.component';
import { FunctionalPageComponent } from './pages/functional/functional-page/functional-page.component';
import { ProjectPageComponent } from './pages/project-page/project-page.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'welcome', component: WelcomePageComponent },
      { path: 'logIn', component: LogInModalComponent },
      { path: 'signIn', component: SignInModalComponent },
    ],
  },
  {
    path: 'homepage/:id_user', component: HomeComponent
  },
  {
    path: 'functionalPage/:id_user', component:FunctionalPageComponent
  },
  {
    path: 'projectPage/:id_project', component: ProjectPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
