import { Component } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { AddAndUpdateService } from 'src/app/services/tracker/add-and-update.service';

@Component({
  selector: 'app-user-space',
  templateUrl: './user-space.component.html',
})
export class UserSpaceComponent {
  constructor(public GeneralService: GeneralService, public AddAndUpdateService: AddAndUpdateService) { }
}
