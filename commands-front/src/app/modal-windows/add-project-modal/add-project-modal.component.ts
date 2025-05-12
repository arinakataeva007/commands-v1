import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IProjectRequest } from 'src/app/models/request/project-request.models';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss']
})
export class AddProjectModalComponent {
  @Input({required:true}) userId = '';

  @Output() onSaveProject = new EventEmitter<IProjectRequest>();

  constructor(){
    this.projectForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      descreption: new FormControl(''),
      authorRole: new FormControl('',[Validators.required]),
      otherRoles: new FormControl(),

      // TODO: скрыто до реализации бэкенда
      // startDate: new FormControl(),
      // endDate: new FormControl()
    })
  }

  protected projectForm: FormGroup;

  protected onSaveProjectCick(){
    const newProject: IProjectRequest = {
      author: this.userId,
      projectName: this.projectForm.get('name')?.value,
      projectDescreption: this.projectForm.get('descreption')?.value || '',
      projectMembers: [this.userId],
      projectRoles:[...this.projectForm.get('otherRoles')?.value,  this.projectForm.get('authorRole')?.value]
    }
    this.onSaveProject.emit(newProject);
  }
}
