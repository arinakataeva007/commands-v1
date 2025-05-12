export interface IProjectRequest{
    author: string,
    projectName: string,
    projectDescreption?: string,
    projectMembers?: string[],
    projectRoles?: string[]
}
