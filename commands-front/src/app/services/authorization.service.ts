import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICheckser, IUser } from '../models/responce/user-responce.models';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class AuthorizationService {
  private apiUrl = 'https://localhost:7122/api/User';
  constructor(private http: HttpClient) {}

  public async createUser(userInfo: IUser): Promise<string> {
    const response = await firstValueFrom(
      this.http.post<{ id: string }>(this.apiUrl, userInfo)
    );
    return response.id;
  }

  public async checkUser(userInfo: ICheckser){
    const response = await firstValueFrom(
      this.http.post<{ uid: string }>(`${this.apiUrl}/login`, userInfo)
    );
    return response;
  }

  public async getUser(userId:string){
    const responce = await firstValueFrom(
      this.http.get<IUser>(`${this.apiUrl}/${userId}`)
    );
    return responce;
  }
}
