import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, map } from 'rxjs';
import { IUser, ICheckser } from '../models/responce/user-responce.models';
import { ICreateUser, IUpdateUserInfo } from '../models/request/user-request.models';

@Injectable()
export class AuthorizationService {
  private apiUrl = 'http://158.160.6.209/api/User';

  constructor(private http: HttpClient) {}

  public createUser(userInfo: ICreateUser): Observable<string> {
    return this.http
      .post<{ id: string }>(this.apiUrl, userInfo)
      .pipe(map((res) => res.id));
  }

  public checkUser(userInfo: ICheckser): Observable<{ uid: string }> {
    return this.http.post<{ uid: string }>(`${this.apiUrl}/login`, userInfo);
  }

  public getUser(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${userId}`);
  }
  /**
   * Метод для обновления полей в информации о пользователе
   * @param userChangesFields объект пользователя с обновленными полями
   * @returns
   */
  public updateUserInfo(userChangesFields: IUpdateUserInfo): Observable<any> {
    return this.getUser(userChangesFields.userId!).pipe(
      switchMap((currentUser) => {
        const updatedFields: any = {};
        Object.keys(userChangesFields).forEach((key) => {
          if (
            userChangesFields[key] &&
            userChangesFields[key] !== currentUser[key]
          ) {
            updatedFields[key] = userChangesFields[key];
          }
        });

        if (Object.keys(updatedFields).length === 0) {
          return of({ message: 'Изменений не обнаружено.' });
        }

        return this.http.put(
          `${this.apiUrl}/${userChangesFields.userId}`,
          updatedFields
        );
      })
    );
  }
}
