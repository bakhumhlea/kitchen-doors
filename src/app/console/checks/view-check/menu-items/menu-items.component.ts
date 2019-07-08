import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from './menu-items';
import { CheckService } from '../../check/check.service';
import { Item } from '../../check/item.model';
import { isObject } from 'util';

@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styleUrls: ['./menu-items.component.css']
})
export class MenuItemsComponent implements OnInit {
  menus = [];
  activeMenuIndex: number;
  categoryTabs = [];
  activeTab = null;
  activeTabItems = [];
  isItemsContainerActive = true;
  isMenuSelectionActive = false;

  constructor(
    private checkService: CheckService
  ) { }

  ngOnInit() {
    this.initializeMenuItems();
  }
  initializeMenuItems() {
    this.menus = Object.keys(MENU_ITEMS);
    this.activeMenuIndex = 0;
    this.onSetMenuTabs(this.menus[this.activeMenuIndex]);
    this.onClickTabButton(this.categoryTabs[0]);
  }
  onChangeMenu(index:number, menu: string) {
    if (menu || index) {
      this.activeMenuIndex = index;
      this.onSetMenuTabs(menu);
      this.onClickTabButton(this.categoryTabs[0]);
      this.onToggleMenuSelection();
    } else {
      let l = this.menus.length;
      this.activeMenuIndex = this.activeMenuIndex<l-1? this.activeMenuIndex+1:0;
      this.onSetMenuTabs(this.menus[this.activeMenuIndex]);
      this.onClickTabButton(this.categoryTabs[0]);
    }

  }
  onSetMenuTabs(menu:string) {
    this.categoryTabs = Object.keys(MENU_ITEMS[menu]);
  }
  onAddItem(item:Item) {
    this.checkService.addItem(item);
  }
  onClickTabButton(tab:any) {
    this.activeTab = tab;
    this.activeTabItems = MENU_ITEMS[this.menus[this.activeMenuIndex]][tab];
  }
  // Interface control method
  onToggleItemContainer() {
    this.isItemsContainerActive = !this.isItemsContainerActive;
  }
  onToggleMenuSelection() {
    this.isMenuSelectionActive = !this.isMenuSelectionActive;
  }
  formatText(text: string) {
    return text.split('_').join(' ');
  }
}
