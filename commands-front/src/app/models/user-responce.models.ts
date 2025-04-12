export interface ICreateUser{
    name: string;
    email: string;
    password: string;
    description?:string;
    rolesId?: string;
    pathIcon?:string;
}