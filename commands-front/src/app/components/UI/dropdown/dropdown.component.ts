import { Component, Input, Output, EventEmitter, Renderer2, ChangeDetectorRef, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IRole } from 'src/app/models/responce/role-responce.models';
import { RolesService } from 'src/app/services/roles.service.ts.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownMultiSelectComponent {
  @Input() placeholder: string = 'Выберите элементы';
  @Output() selectionChange = new EventEmitter<string[]>();
  constructor(private roleService: RolesService, private renderer: Renderer2, private cdr: ChangeDetectorRef, private el: ElementRef) {
    this.roleService.getAllRoles();
    this.roles$ = this.roleService.roles$$.asObservable();
    this.listenerClickFn = this.renderer.listen('document', 'click', event => {
			const clickedInside = this.el.nativeElement.contains(event.target);
			if (!clickedInside) {
				this.isOpen = false;
				this.cdr.detectChanges();
			} else {
				el.nativeElement.blur();
			}
		});
  }
  private listenerClickFn = () => {};

	public ngOnDestroy(): void {
		this.listenerClickFn();
	}

  protected roles$: Observable<IRole[]>;
  selectedItems: string[] = [];
  isOpen = false;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  isSelected(option: string): boolean {
    return this.selectedItems.includes(option);
  }

  toggleSelection(option: string): void {
    if (this.isSelected(option)) {
      this.selectedItems = this.selectedItems.filter((item) => item !== option);
    } else {
      this.selectedItems.push(option);
    }
    this.selectionChange.emit(this.selectedItems);
  }

  closeDropdown(): void {
    this.isOpen = false;
  }
}
