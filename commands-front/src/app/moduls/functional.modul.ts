import { NgModule } from '@angular/core';
import { FunctionalPageComponent } from '../pages/functional/functional-page/functional-page.component';
import { NavigationComponent } from '../components/navigation/navigation.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [FunctionalPageComponent],
  imports: [NavigationComponent, AppRoutingModule, CommonModule],
  providers: [],
  exports: [FunctionalPageComponent],
})
export class FunctionalModule {}
