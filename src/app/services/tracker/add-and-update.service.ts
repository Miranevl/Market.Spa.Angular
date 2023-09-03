import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddAndUpdateService {
  showBlock1 = false;
  showBlock2 = false;
  callbackFunc: any = null;
  CompliteOrNot = false;
  saveTitle = '';

  private trackerUpdatedSubject = new BehaviorSubject<boolean>(false);
  trackerAdded = this.trackerUpdatedSubject.asObservable();
  constructor() { }

  triggerTrackerUpdated() {
    this.trackerUpdatedSubject.next(true);
  }

  handleClickOnYes(title: string) {
    this.saveTitle = title;
    this.CompliteOrNot = !this.CompliteOrNot;
    if (this.CompliteOrNot && this.callbackFunc) {
      this.callbackFunc();
    }
  }

  setCallback(callback: any) {
    this.callbackFunc = callback;
  }
}
