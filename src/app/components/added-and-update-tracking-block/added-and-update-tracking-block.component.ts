import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddAndUpdateService } from 'src/app/services/tracker/add-and-update.service';
import { TrackerService } from 'src/app/services/tracker/tracker.service';

@Component({
  selector: 'app-added-and-update-tracking-block',
  templateUrl: './added-and-update-tracking-block.component.html',
})
export class AddedAndUpdateTrackingBlockComponent implements OnInit {
  constructor(public AddAndUpdateService: AddAndUpdateService, private TrackerService: TrackerService) { }

  TrackerForm: any = {
    nameTracker: '',
    marketplaceId: 1,
  }

  TrackerFromUpdate: any = {
    nameTracker: ''
  };

  ngOnInit(): void {

  }

  addTracker() {
    const { nameTracker, marketplaceId } = this.TrackerForm;
    this.TrackerService.addTracker(nameTracker, marketplaceId).subscribe(
      response => {
        alert('Новый трекер успешно добавлен!');
        this.AddAndUpdateService.showBlock1 = false;
        // Вызов события после успешного добавления трекинга
        this.AddAndUpdateService.triggerTrackerUpdated();
      },
      error => {
        console.log(error);
      }
    )
  }
}
