import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/models/user-responce.models';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthorizationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id_user')!;
      this.authService.getUser(this.userId).then((data) => {
        this.userInfo = data as IUser;
        console.log(data.userIconUrl);
      });
    });
  }

  protected userId!: string;
  protected userInfo!: IUser;
  protected addingProject = false;

  private cdr = inject(ChangeDetectorRef);

  protected addProject(){
    this.addingProject = true;

  }

  protected closeModal(){
    this.addingProject = false;
  }
}
