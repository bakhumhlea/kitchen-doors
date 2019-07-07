import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthServices } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { AnimationService } from '../header/animation.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  authSubscription: Subscription;
  isAuth = false;

  constructor(
    private authService: AuthServices,
    private animationService: AnimationService
  ) { }

  onCloseSideNav() {
    this.sidenavToggle.emit();
    this.animationService.onToggleMenuIcon();
  }
  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
    this.onCloseSideNav();
  }
}
