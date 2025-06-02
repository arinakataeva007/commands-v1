import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { IProjectRequest } from '../models/request/project-request.models';
import { IProjectResponce } from '../models/responce/project-responce.models';

@Injectable()
export class ProjectService {
  private apiUrl = 'http://158.160.91.26/api/Project';
  // private apiUrl = 'https://localhost:7122/api/Project'
 
  #projId: string = '';

  constructor(private http: HttpClient) {}

  public getAllProjects(): Observable<IProjectResponce[]>{
    return this.http.get<IProjectResponce[]>(this.apiUrl);
  }

  public createProject(projectInfo: IProjectRequest): Observable<string> {
    return this.http.post<string>(this.apiUrl, projectInfo).pipe(
      tap(id => this.#projId = id)
    );
  }

  public getProjectInfoById(projectId: string): Observable<IProjectResponce> {
    return this.http.get<IProjectResponce>(`${this.apiUrl}/${projectId}`);
  }
}
