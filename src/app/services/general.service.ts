import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  showDialog = false;
  CompliteOrNot = false;
  callbackFunc: any = null;

  constructor() { }

  handleClickOnYes() {
    this.CompliteOrNot = !this.CompliteOrNot;
    if (this.CompliteOrNot && this.callbackFunc) {
      this.callbackFunc();
    }
  }

  setCallback(callback: any) {
    this.callbackFunc = callback;
  }
}
