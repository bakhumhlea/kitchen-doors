import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthServices } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CheckService } from 'src/app/console/checks/check/check.service';
import { SaveChangesModalComponent } from 'src/app/common/save-changes-modal.component';
import { AnimationService } from './animation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  sidenavOpen = false;
  activeShortcutTab: string;
  authSubscription: Subscription;

  navLinks = [
    {path: '/signup',label: 'Dashboard', icon: 'dashboard', tabcode: 'DASH'},
    {path: '/console/checks',label: 'Checks', icon: 'receipt', tabcode: 'CHCK'},
    {path: '/dashboard',label: 'Shift Report', icon: 'notes', tabcode: 'SHIF'},
    {path: '/login',label: 'Inventories', icon: 'kitchen', tabcode: 'INVE'},
  ]
  constructor(
    private authService: AuthServices,
    private router: Router,
    private animationService: AnimationService,
    private dialog: MatDialog,
    private checkService: CheckService
  ) { }

  onToggleSidenav() {
    this.sidenavToggle.emit();
    this.animationService.onToggleMenuIcon();
  }
  onChangeTab(path:string, tabcode: string) {
    if (this.checkService.hasChanged) {
      const dialogRef = this.dialog.open(SaveChangesModalComponent, { width: '400px',height: '170px' });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.checkService.saveCheck(this.checkService.getCurrentCheckId())
          this.activeShortcutTab = tabcode;
          this.router.navigate([path]);
        }
      })
    } else {
      this.activeShortcutTab = tabcode;
      this.router.navigate([path]);
    }
    
  }
  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
