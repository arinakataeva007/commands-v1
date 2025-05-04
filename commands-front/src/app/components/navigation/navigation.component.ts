import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Output() onAddClick = new EventEmitter();

  constructor(private router: Router, private rout: ActivatedRoute){}

  ngOnInit(): void {
    this.userId = this.rout.snapshot.paramMap.get('id');
  }

  private userId: string | null = null;

  protected goToHomePage(){
    if(this.userId !== null){
      this.router.navigate(['/homepage', this.userId]);
    }
  }
}
