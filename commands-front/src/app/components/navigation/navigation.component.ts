import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class NavigationComponent implements OnInit {
  @Input() fromUser = false;
  @Input() inUser = false;
  @Input() withAddProjectBtn = false;
  @Input() userIdFromProject = '';
  @Output() onAddClick = new EventEmitter();

  constructor(private router: Router, private rout: ActivatedRoute){}

  ngOnInit(): void {
    this.userId = localStorage.getItem('token');
  }

  private userId: string | null = null;

  protected goToMainPage(){
    if(this.userId !== null){
      this.router.navigate(['/functionalPage', this.userId]);
    }
  }
  protected goToUserPage(){
    if(this.userId !== null && !this.router.url.includes('projectPage')){
      this.router.navigate(['/homepage', this.userId]);
    }else if(this.router.url.includes('projectPage')){
      this.router.navigate(['/homepage', this.userIdFromProject]);
    }
  }
  protected goToProjectsPage(){
    this.router.navigate(['/projects']);
  }
}
