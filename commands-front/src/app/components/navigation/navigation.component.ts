import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  @Output() onAddClick = new EventEmitter();

  constructor(private router: Router, private rout: ActivatedRoute){}

  ngOnInit(): void {
    this.userId = this.rout.snapshot.paramMap.get('id_user');
  }

  private userId: string | null = null;

  protected goToMainPage(){
    if(this.userId !== null){
      this.router.navigate(['/functionalPage', this.userId]);
    }
  }
  protected goToUserPage(){
    if(this.userId !== null){
      this.router.navigate(['/homepage', this.userId]);
    }
  }
}
