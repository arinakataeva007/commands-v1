import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() userId: string = '';

  constructor(private router: Router){}

  protected goToHomePage(){
    this.router.navigate(['/homepage', this.userId]);
  }

}
