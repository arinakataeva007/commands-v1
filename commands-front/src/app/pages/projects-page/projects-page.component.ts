import { Component } from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { IProjectResponce } from 'src/app/models/responce/project-responce.models';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.scss'],
})
export class ProjectsPageComponent {
  constructor(private projecService: ProjectService) {
    this.projecService.getAllProjects().pipe(take(1)).subscribe((projects: IProjectResponce[])=>{
      this.#projects$$.next(projects);
    })
  }
  #projects$$ = new BehaviorSubject<IProjectResponce[]>([]);
  protected projets$ = this.#projects$$.asObservable();
}
