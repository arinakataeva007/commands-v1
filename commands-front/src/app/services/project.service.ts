import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICheckser, IUser } from '../models/responce/user-responce.models';
import { firstValueFrom } from 'rxjs';
import { IProjectRequest } from '../models/request/project-request.models';
@Injectable()
export class ProjectService {
    private apiUrl ='https://localhost:7122/api/Project';

    constructor(private http: HttpClient) {}

    public async createProject(projectInfo: IProjectRequest): Promise<string>{
        const responce = await firstValueFrom(this.http.post<{projectId: string}>(this.apiUrl, projectInfo));
        console.log(responce);
        return responce.projectId;
    }
}