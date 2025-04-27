import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/models/user-responce.models';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  protected userId!: string;
  protected userInfo!: IUser;

  constructor(private route: ActivatedRoute, private authService: AuthorizationService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id_user')!;
      this.authService.getUser(this.userId).then(data=> {
        this.userInfo = data as IUser;
        console.log("Data",data, this.userInfo);
      });
      console.log('User ID:', this.userId, this.userInfo);
    });
  }
}
