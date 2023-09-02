import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddAndUpdateService {
  showBlock = false;

  private trackerAddedSubject = new BehaviorSubject<boolean>(false);
  trackerAdded = this.trackerAddedSubject.asObservable();
  constructor() { }

  triggerTrackerAdded() {
    this.trackerAddedSubject.next(true);
  }
}
