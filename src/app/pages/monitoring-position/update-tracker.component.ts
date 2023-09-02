import { Component, EventEmitter, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { TrackerService } from 'src/app/services/tracker/tracker.service';

@Component({
  selector: 'update-tracker',
  templateUrl: 'update-tracker.component.html',
})
export class UpdateTracker implements ICellRendererAngularComp {
  constructor(private TrackerService: TrackerService) {}
  @Output() onDelete = new EventEmitter<void>();

  public params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    this.params = params;
    return true;
  }

  handleUpdateClick(): void {
    alert('Я обновился');
  }

  handleDeleteClick(id: number): void {
    this.TrackerService.deleteTracker(id).subscribe(
      (response) => {
        this.params.api.applyTransaction({
          remove: [this.params.data],
        });
      },
      (error) => {
        alert(error);
      }
    );
  }
}
