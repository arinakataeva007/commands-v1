import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take, tap } from 'rxjs';
import { IProjectRequest } from 'src/app/models/request/project-request.models';
import { IUpdateUserInfo } from 'src/app/models/request/user-request.models';
import { IProjectResponce } from 'src/app/models/responce/project-responce.models';
import { IUser } from 'src/app/models/responce/user-responce.models';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthorizationService,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id_user')!;
      this.authService
        .getUser(this.userId)
        .pipe(take(1))
        .subscribe((data) => {
          this.userInfo = data as IUser;
        });
    });
  }

  protected userId!: string;
  protected userInfo!: IUser;
  protected addingProject = false;

  private cdr = inject(ChangeDetectorRef);

  protected async addProject() {
    this.addingProject = true;
  }

  protected closeModal() {
    this.addingProject = false;
  }

  protected saveProject(event: IProjectRequest): void {
    this.projectService
      .createProject(event)
      .pipe(
        switchMap((projectId) =>
          this.projectService.getProjectInfoById(projectId)
        ),
        switchMap((project: IProjectResponce) => {
          if (!this.userInfo.projectsId) {
            this.userInfo.projectsId = [];
          }

          if (!this.userInfo.projectsId.includes(project.id)) {
            this.userInfo.projectsId.push(project.id);
          }
          const requestUser: IUpdateUserInfo = {
            userId: this.userId,
            projectsId: this.userInfo.projectsId,
          }
          console.log(this.userInfo);
          return this.authService.updateUserInfo(requestUser);
        }),
      )
      .subscribe({
        next: (response) => {
          console.log('User info updated successfully', response);
        },
        error: (err) => {
          console.error('Error occurred:', err.error.errors);
        },
      });
  }
}
