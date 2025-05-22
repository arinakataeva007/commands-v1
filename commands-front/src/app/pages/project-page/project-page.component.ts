import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, pipe, switchMap, forkJoin } from 'rxjs';
import { IProjectResponce } from 'src/app/models/responce/project-responce.models';
import { IUser } from 'src/app/models/responce/user-responce.models';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ProjectService } from 'src/app/services/project.service';
import { RolesService } from 'src/app/services/roles.service.ts.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private authService: AuthorizationService,
    private roleService: RolesService,
    private localStorage: StorageService,
    private route: ActivatedRoute
  ) {
    this.#projId = this.route.snapshot.paramMap.get('id_project');
  }
  public ngOnInit() {
    if (this.#projId) {
      this.projectService
        .getProjectInfoById(this.#projId)
        .pipe(
          take(1),
          switchMap((pr: IProjectResponce) => {
            this.project = pr;
            if (pr.projectRoles) {
              forkJoin(
                pr.projectRoles.map((roleId) =>
                  this.roleService.getRoleNameById(roleId).pipe(take(1))
                )
              ).subscribe((roleNames: string[]) => {
                this.roles = roleNames;
              });
            }
            return this.authService.getUser(pr.author);
          })
        )
        .subscribe((auth: IUser) => {
          this.authorName = auth.userName;
          return;
        });
    }
  }
  protected project: IProjectResponce = {author: '', id: '', projectName: ''};
  protected authorName: string = '';
  protected roles: string[] = [];
  #projId: string | null;
}
