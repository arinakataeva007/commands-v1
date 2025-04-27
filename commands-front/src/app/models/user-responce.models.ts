export interface IUser{
    name: string;
    email: string;
    password: string;
    description?:string;
    rolesId?: string;
    pathIcon?:string;
}

export interface ICheckser{
    email: string;
    password: string;
}