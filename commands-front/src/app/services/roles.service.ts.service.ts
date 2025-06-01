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
  #apiUrl = 'http://158.160.6.209:8080/api/Role';
  public roles$$: BehaviorSubject<IRole[]> = new BehaviorSubject<IRole[]>([]);

  constructor(private http: HttpClient) {}

  public getAllRoles(): void {
    this.http
      .get<IRole[]>(this.#apiUrl)
      .subscribe((roles) => this.roles$$.next(roles));
  }
  public getRoleNameById(id: string): Observable<string> {
    return this.http
      .get<IRole>(`${this.#apiUrl}/${id}`)
      .pipe(map((role) => role.rolesName));
  }
}
