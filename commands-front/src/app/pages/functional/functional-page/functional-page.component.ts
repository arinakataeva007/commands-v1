import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, take } from 'rxjs';
import { IProjectResponce } from 'src/app/models/responce/project-responce.models';
import { ProjectService } from 'src/app/services/project.service';
import { RolesService } from 'src/app/services/roles.service.ts.service';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-functional-page',
  templateUrl: './functional-page.component.html',
  styleUrls: ['./functional-page.component.scss'],
})
export class FunctionalPageComponent {
  constructor(
    private localStorage: StorageService,
    private roleService: RolesService,
    private projectService: ProjectService
  ) {
    this.projectService
      .getAllProjects()
      .pipe(take(1))
      .subscribe((projects: IProjectResponce[]) => {
        projects.forEach((p) => {
          if (p.projectRoles?.length) {
            forkJoin(
              p.projectRoles.map((roleId) =>
                this.roleService.getRoleNameById(roleId).pipe(take(1))
              )
            ).subscribe((roleNames: string[]) => {
              this.projectRolesMap[p.id] = roleNames;
              // this.cdr.markForCheck();
            });
          }
        });
        this.projects$$.next(projects);
      });
  }
  private projects$$ = new BehaviorSubject<IProjectResponce[]>([]);
  protected projects$ = this.projects$$.asObservable();
  protected projectRolesMap: Record<string, string[]> = {};
  protected addingProject = false;
}
