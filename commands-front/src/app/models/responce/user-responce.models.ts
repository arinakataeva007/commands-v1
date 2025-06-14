export interface IUser{
    userName: string;
    userId?: string;
    email: string;
    password: string;
    description?:string;
    rolesId?: string[];
    userIconUrl?:string;
    projectsId?: string[],
    [key: string]: string | string[] | undefined; 
}

export interface ICheckser{
    email: string;
    password: string;
}
