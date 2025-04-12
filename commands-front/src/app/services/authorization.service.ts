import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateUser } from '../models/user-responce.models';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AuthorizationService {
  private apiUrl = 'https://localhost:7122/api/User';
  constructor(private http: HttpClient) {}

  public async createUser(userInfo: ICreateUser): Promise<string> {
    const response = await firstValueFrom(
      this.http.post<{ id: string }>(this.apiUrl, userInfo)
    );
    return response.id;
  }
}
