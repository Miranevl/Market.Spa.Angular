import { Component, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { TrackingPwzService } from 'src/app/services/tracker/TrackingPwz/tracking-pwz.service';

@Component({
  selector: 'app-pwz-block',
  templateUrl: './pwz-block.component.html',
})
export class PwzBlockComponent {
  @Input() id: any;

  constructor(private trackingPwzService: TrackingPwzService) { }

}
