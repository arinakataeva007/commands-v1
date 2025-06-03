import {
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProjectResponce } from 'src/app/models/responce/project-responce.models';
import { RolesService } from 'src/app/services/roles.service.ts.service';
import { forkJoin, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projectcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projectcard.component.html',
  styleUrls: ['./projectcard.component.scss'],
})
export class ProjectcardComponent implements OnInit {
  @Input() project: IProjectResponce = {} as IProjectResponce;

  constructor(private roleService: RolesService, private router: Router) {}
  ngOnInit(): void {
    if (this.project.projectRoles?.length) {
      forkJoin(
        this.project.projectRoles.map((roleId) =>
          this.roleService.getRoleNameById(roleId).pipe(take(1))
        )
      ).subscribe((roleNames: string[]) => {
        this.projectRolesMap[this.project.id] = roleNames;
        this.cdr.markForCheck();
      });
    }
  }

  protected projectRolesMap: Record<string, string[]> = {};
  private cdr = inject(ChangeDetectorRef);

  protected async goToProject() {
    await this.router.navigate(['/projectPage', this.project.id]);
  }
}
