
export class AnimationService {
  sidenavOpen: boolean = false;
  isBtnPanalActive: boolean = false;


  onToggleMenuIcon() {
    var top = document.getElementById('top');
    var mid = document.getElementById('mid');
    var btm = document.getElementById('btm');
    if (!this.sidenavOpen) {
      top.setAttribute ('d',"M2 4 L18 20");
      mid.setAttribute ('d',"M2 4 L18 20");
      btm.setAttribute ('d',"M2 20 L18 4");
    } else {
      top.setAttribute ('d',"M0 4 L20 4");
      mid.setAttribute ('d',"M0 12 L20 12");
      btm.setAttribute ('d',"M0 20 L20 20");
    }
    this.sidenavOpen = !this.sidenavOpen;
  }
  toggleBtnPanel() {
    var panel = document.getElementById('btn-rack-panel');
    if(!this.isBtnPanalActive) {
      panel.style.height = '120px';
      this.isBtnPanalActive = true;
    } else {
      panel.style.height = '40px';
      this.isBtnPanalActive = false;
    }
  }
}