export interface IProjectResponce{
    author: string,
    id: string,
    projectName: string,
    projectDescription?: string,
    projectMembersId?: string[],
    projectRoles?: string[]
}