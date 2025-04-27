import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  userId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id_user')!;
      // Здесь можно сразу загрузить данные пользователя
      console.log('User ID:', this.userId);
      // например: this.loadUserData(this.userId);
    });
  }
}
