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

  TrackerFromUpdate: any = {
    nameTrackerUpdate: '',
  };

  private trackerUpdatedSubject = new BehaviorSubject<boolean>(false);
  trackerAdded = this.trackerUpdatedSubject.asObservable();
  constructor() { }

  triggerTrackerUpdated() {
    this.trackerUpdatedSubject.next(true);
  }

  handleClickOnYes(title: string) {
    this.CompliteOrNot = true;
    if (this.CompliteOrNot && this.callbackFunc) {
      this.callbackFunc();

    }
  }

  setCallback(callback: any) {
    this.callbackFunc = callback;
  }
}
