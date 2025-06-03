import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FunctionalModule } from './moduls/functional.modul';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { AuthorizationModule } from './moduls/authorization.module';
import { HomeComponent } from './pages/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AddProjectModalComponent } from './modal-windows/add-project-modal/add-project-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from './services/project.service';
import { RolesService } from './services/roles.service.ts.service';
import { ProjectPageComponent } from './pages/project-page/project-page.component';
import { DropdownMultiSelectComponent } from 'src/app/components/UI/dropdown/dropdown.component';
import { CheckDownloadDirective } from './pages/home/filedirective/check-download.directive';
import { ProjectsPageComponent } from './pages/projects-page/projects-page.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    HomeComponent,
    AddProjectModalComponent,
    ProjectPageComponent,
    DropdownMultiSelectComponent,
    CheckDownloadDirective,
    ProjectsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthorizationModule,
    FormsModule, 
    ReactiveFormsModule,
    NavigationComponent,
    FunctionalModule,
  ],
  providers: [ProjectService, RolesService],
  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
