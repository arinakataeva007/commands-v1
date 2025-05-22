export interface IUpdateUserInfo {
    userName?: string;
    userId: string;
    email?: string;
    password?: string;
    description?:string;
    rolesId?: string[];
    userIconUrl?:string;
    projectsId?: string[],
    [key: string]: string | string[] | undefined; 
}