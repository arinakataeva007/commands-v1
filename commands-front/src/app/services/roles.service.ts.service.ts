import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  firstValueFrom,
  forkJoin,
  map,
  Observable,
  of,
  take,
} from 'rxjs';
import { IRole } from '../models/responce/role-responce.models'; // путь исправь под себя
import { IProjectResponce } from '../models/responce/project-responce.models';

@Injectable()
export class RolesService {
  #apiUrl = 'https://localhost:7122/api/Role';
  public roles$$: BehaviorSubject<IRole[]> = new BehaviorSubject<IRole[]>([]);
  public userRoles$$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );
  constructor(private http: HttpClient) {}

  public getAllRoles(): void {
    this.http
      .get<IRole[]>(this.#apiUrl)
      .subscribe((roles) => this.roles$$.next(roles));
  }

  public getRoleById(id: string): Observable<IRole> {
    return this.http.get<IRole>(`${this.#apiUrl}/${id}`);
  }

  public getRolesName(project: IProjectResponce): void {
    if (!project.projectRoles || project.projectRoles.length === 0) {
      this.userRoles$$.next([]);
      return;
    }

    const roleObservables = project.projectRoles.map((roleId: string) =>
      this.getRoleById(roleId).pipe(take(1))
    );

    forkJoin(roleObservables)
      .pipe(map((roles) => roles.map((role) => role.rolesName)))
      .subscribe((roleNames: string[]) => {
        this.userRoles$$.next(roleNames);
      });
  }
}
