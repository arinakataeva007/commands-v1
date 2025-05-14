import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IRole } from '../models/responce/role-responce.models'; // путь исправь под себя

@Injectable()
export class RolesService {
  #apiUrl = 'https://localhost:7122/api/Role';
  public roles$$: BehaviorSubject<IRole[]> = new BehaviorSubject<IRole[]>([]);
  constructor(private http: HttpClient) {}

  public getAllRoles(): void {
    this.http.get<IRole[]>(this.#apiUrl).subscribe(roles=> this.roles$$.next(roles));
    // return this.http.get<IRole[]>(this.#apiUrl);
  }
}
