import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { IProjectRequest } from 'src/app/models/request/project-request.models';
import { RolesService } from 'src/app/services/roles.service.ts.service';
import { IRole } from 'src/app/models/responce/role-responce.models';
import { Observable, take } from 'rxjs';
@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss'],
})
export class AddProjectModalComponent {
  @Input({ required: true }) userId = '';

  @Output() onSaveProject = new EventEmitter<IProjectRequest>();
  @Output() onCloseClick = new EventEmitter();

  constructor(private roleService: RolesService) {
    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      descreption: new FormControl(''),
      authorRole: new FormControl('Выберите свою роль', [Validators.required]),
      otherRoles: new FormControl('Выберите необходимые роли'),
    });
    
  }

  protected projectForm: FormGroup;

  protected updateOtherRoleField(event: string[]){
    this.projectForm.patchValue({
        otherRoles: event
    });
  }
  protected updateAuthorField(event: string[]){
    this.projectForm.patchValue({
        authorRole: event
    });
  }

  protected onSaveProjectCick() {
    const newProject: IProjectRequest = {
      author: this.userId,
      projectName: this.projectForm.get('name')?.value,
      projectDescreption: this.projectForm.get('descreption')?.value || '',
      projectMembers: [this.userId],
      projectRoles: [
        ...this.projectForm.get('otherRoles')?.value,
        ...this.projectForm.get('authorRole')?.value,
      ],
    };
    this.onSaveProject.emit(newProject);
    setTimeout(() => this.onCloseClick.emit(), 200);
  }
}
