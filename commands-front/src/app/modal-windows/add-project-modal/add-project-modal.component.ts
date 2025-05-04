import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-project-modal',
  templateUrl: './add-project-modal.component.html',
  styleUrls: ['./add-project-modal.component.scss']
})
export class AddProjectModalComponent {

  @Output() onSaveProject = new EventEmitter();

  constructor(){}

  protected onSaveProjectCick(){

  }
}
