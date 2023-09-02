import { Component, EventEmitter, Output } from '@angular/core';
import { TrackerService } from 'src/app/services/tracker/tracker.service';

@Component({
  selector: 'app-add-tracker',
  templateUrl: './add-tracker.component.html',
})
export class AddTrackerComponent {

  constructor(private TrackerService: TrackerService) { }

  @Output() close = new EventEmitter<void>();
  @Output() trackerAdded = new EventEmitter<void>();

  closeComponent() {
    this.close.emit();
  }

  TrackerForm: any = {
    nameTracker: '',
    marketplaceId: 1,
  }

  addTracker() {
    const { nameTracker, marketplaceId } = this.TrackerForm;
    this.TrackerService.addTracker(nameTracker, marketplaceId).subscribe(
      response => {
        alert('Новый трекер успешно добавлен!')
        this.trackerAdded.emit()
        this.closeComponent();
      },
      error => {
        console.log(error);
      }
    )
  }

}
