import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, forkJoin, switchMap, take } from 'rxjs';
import { IProjectRequest } from 'src/app/models/request/project-request.models';
import { IUpdateUserInfo } from 'src/app/models/request/user-request.models';
import { IProjectResponce } from 'src/app/models/responce/project-responce.models';
import { IUser } from 'src/app/models/responce/user-responce.models';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ProjectService } from 'src/app/services/project.service';
import { RolesService } from 'src/app/services/roles.service.ts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthorizationService,
    private projectService: ProjectService,
    private rolesService: RolesService
  ) {
    this.editingForm = new FormGroup({
      description: new FormControl(),
      userIconUrl: new FormControl(),
    });
  }
  // protected photoUrl ='http://158.160.91.26';
  protected photoUrl = 'https://localhost:7122';
  protected textAreaeDesciption = '';

  #photoUrl = '';
  public ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id_user')!;
      this.authService
        .getUser(this.userId)
        .pipe(take(1))
        .subscribe((data) => {
          this.userInfo = data as IUser;
          this.photoUrl = this.photoUrl + this.userInfo.userIconUrl;
          this.textAreaeDesciption = this.userInfo.description || '';
          console.log(this.photoUrl);
          if (data.projectsId && data.projectsId.length > 0) {
            data.projectsId.forEach((projId) => {
              this.projectService
                .getProjectInfoById(projId)
                .pipe(take(1))
                .subscribe((project) => {
                  const current = this.userProjects$$.value;
                  if (project.projectRoles?.length) {
                    forkJoin(
                      project.projectRoles.map((roleId) =>
                        this.rolesService.getRoleNameById(roleId).pipe(take(1))
                      )
                    ).subscribe((roleNames: string[]) => {
                      this.projectRolesMap[project.id] = roleNames;
                      this.cdr.markForCheck();
                    });
                  }

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
  protected projectRolesMap: Record<string, string[]> = {};
  protected addingProject = false;
  protected editMode = false;

  private editingForm: FormGroup;
  private cdr = inject(ChangeDetectorRef);

  protected async addProject() {
    this.addingProject = true;
  }

  protected closeModal() {
    this.addingProject = false;
  }

  protected async goToProject(projId: string) {
    await this.router.navigate(['/projectPage', projId]);
  }

  protected endEdit() {
    this.editMode = false;
    const updateFields: IUpdateUserInfo = {
      userId: this.userInfo.userId!,
      description: this.textAreaeDesciption,
      userIconUrl: this.#photoUrl,
      projectsId: this.userInfo.projectsId,
    };
    this.authService.updateUserInfo(updateFields).subscribe({
      next: (response: IUser) => {
        this.userInfo = response;
        this.updateProjects(response.projectsId);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error occurred:', err.error.errors);
      },
    });
  }

  protected onFileLoaded(event: File) {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!allowedTypes.includes(event.type)) {
      console.warn(
        'Неверный формат файла. Допустимы только изображения JPG, PNG, GIF, WEBP.'
      );
      return;
    }
    this.authService
      .uploadPhoto(this.userInfo.userId!, event)
      .pipe(take(1))
      .subscribe((urlPhoto) => {
        this.#photoUrl = urlPhoto;
        this.cdr.detectChanges();
      });
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

          if (!this.userInfo.rolesId) {
            this.userInfo.rolesId = [];
          }

          if (!this.userInfo.projectsId.includes(project.id)) {
            this.userInfo.projectsId.push(project.id);
          }
          const requestUser: IUpdateUserInfo = {
            userId: this.userId,
            rolesId: [
              ...this.userInfo.rolesId!,
              project.projectRoles![project.projectRoles!.length - 1],
            ],
            projectsId: this.userInfo.projectsId,
          };
          if (project.projectRoles?.length) {
            forkJoin(
              project.projectRoles.map((roleId) =>
                this.rolesService.getRoleNameById(roleId).pipe(take(1))
              )
            ).subscribe((roleNames: string[]) => {
              this.projectRolesMap[project.id] = roleNames;
              this.cdr.markForCheck();
            });
          }

          return this.authService.updateUserInfo(requestUser);
        })
      )
      .subscribe({
        next: (response: IUser) => {
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
