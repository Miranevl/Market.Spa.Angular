import { Component } from '@angular/core';
import { TrackingPwzService } from 'src/app/services/tracker/TrackingPwz/tracking-pwz.service';

@Component({
  selector: 'app-pwz-block',
  templateUrl: './pwz-block.component.html',
})
export class PwzBlockComponent {

  constructor(private trackingPwzService: TrackingPwzService) { }


}
