import { Subject } from 'rxjs';

export class HeaderService {
  private currentPath: string;
  pathChange = new Subject();

  dispatchCurrentView(pathcode:string) {
    this.currentPath = pathcode;
    this.pathChange.next(pathcode);
  }
}