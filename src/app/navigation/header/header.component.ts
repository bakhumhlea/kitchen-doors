import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthServices } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { CheckService } from 'src/app/console/checks/check/check.service';
import { SaveChangesModalComponent } from 'src/app/common/save-changes-modal.component';
import { AnimationService } from './animation.service';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  @Output() rightnavToggle = new EventEmitter<void>();
  private user = {};
  private path: string;
  isAuth = false;
  sidenavOpen = false;
  activeShortcutTab: string;
  authSubscription: Subscription;
  pathSubscription: Subscription;

  navLinks = [
    {path: '/console/checks',label: 'Checks', icon: 'receipt', tabcode: 'CHCK'},
    {path: '/console/checks/viewcheck/new-check',label: 'Transaction', icon: 'credit_card', tabcode: 'TRSC'},
    {path: '/dashboard',label: 'Dashboard', icon: 'dashboard', tabcode: 'DASH',building: true},
    {path: '/inventories',label: 'Inventories', icon: 'kitchen', tabcode: 'INVE',building:true},
  ];

  constructor(
    private authService: AuthServices,
    private headerService: HeaderService,
    private router: Router,
    private animationService: AnimationService,
    private dialog: MatDialog,
    private checkService: CheckService
  ) { }

  ngOnInit() {
    this.pathSubscription = this.headerService.pathChange.subscribe((currentPath:string) => {
      this.activeShortcutTab = currentPath;
    })
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
      this.user = this.authService.getUser()
    })
  }
  onToggleSidenav() {
    this.sidenavToggle.emit();
    this.animationService.onToggleMenuIcon();
  }
  onToggleSettingPanel() {
    this.rightnavToggle.emit()
  }
  onChangeTab(path:string, tabcode: string) {
    if (this.checkService.hasChanged) {
      const dialogRef = this.dialog.open(SaveChangesModalComponent, { width: '400px',height: '170px' });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.checkService.saveCheck(this.checkService.getCheckId())
          this.activeShortcutTab = tabcode;
          this.router.navigate([path]);
        }
      })
    } else {
      this.activeShortcutTab = tabcode;
      this.router.navigate([path]);
    }
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
