import { NgModule } from '@angular/core';
import { FunctionalPageComponent } from '../pages/functional/functional-page/functional-page.component';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
import { EarlyWatchingComponent } from "../components/early-watching/early-watching.component";
@NgModule({
  declarations: [FunctionalPageComponent],
  imports: [NavigationComponent, AppRoutingModule, CommonModule, EarlyWatchingComponent],
  providers: [],
  exports: [FunctionalPageComponent],
})
export class FunctionalModule {}
