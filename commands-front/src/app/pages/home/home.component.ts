import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap, take, tap } from 'rxjs';
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
export class HomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthorizationService,
    private projectService: ProjectService
  ) {}

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id_user')!;
      this.authService
        .getUser(this.userId)
        .pipe(take(1))
        .subscribe((data) => {
          this.userInfo = data as IUser;
          if (data.projectsId && data.projectsId.length > 0) {
            data.projectsId.forEach((projId) => {
              this.projectService
                .getProjectInfoById(projId)
                .pipe(take(1))
                .subscribe((project) => {
                  const current = this.userProjects$$.value;
                  this.userProjects$$.next([...current, project]);
                });
            });
          }
        });
    });
  }

  protected userId!: string;
  protected userInfo!: IUser;
  private userProjects$$ = new BehaviorSubject<IProjectResponce[]>([]);
  protected userProjects$ = this.userProjects$$.asObservable();
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
          };
          return this.authService.updateUserInfo(requestUser);
        })
      )
      .subscribe({
        next: (response: IUser) => {
          console.log('User info updated successfully', response);
          this.userInfo = response;
          this.updateProjects(response.projectsId);
        },
        error: (err) => {
          console.error('Error occurred:', err.error.errors);
        },
      });
  }
  private updateProjects(projectsId: string[] | undefined) {
    if (!projectsId) return;

    projectsId.forEach((projId) => {
      this.projectService
        .getProjectInfoById(projId)
        .pipe(take(1))
        .subscribe((project) => {
          const current = this.userProjects$$.value;
          const exists = current.some((usPr) => usPr.id === projId);
          if (!exists) {
            this.userProjects$$.next([...current, project]);
          }
        });
    });
  }
}
