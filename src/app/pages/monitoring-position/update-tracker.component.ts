import { Component, EventEmitter, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { GeneralService } from 'src/app/services/general.service';
import { AddAndUpdateService } from 'src/app/services/tracker/add-and-update.service';
import { TrackerService } from 'src/app/services/tracker/tracker.service';

@Component({
    selector: 'update-tracker',
    templateUrl: 'update-tracker.component.html',
    styleUrls: ['update-tracker.component.scss']
})
export class UpdateTracker implements ICellRendererAngularComp {
    constructor(private TrackerService: TrackerService, public GeneralService: GeneralService, public AddAndUpdateService: AddAndUpdateService) { }
    @Output() onDelete = new EventEmitter<void>();


    public params!: ICellRendererParams;

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    refresh(params: ICellRendererParams): boolean {
        this.params = params;
        return true;
    }

    handleUpdateClick(id: number): void {
        this.AddAndUpdateService.setCallback(() => {
            this.TrackerService.updateTracker(id, this.AddAndUpdateService.TrackerFromUpdate.nameTrackerUpdate).subscribe(
                (response) => {
                    this.AddAndUpdateService.showBlock2 = false;
                    this.AddAndUpdateService.triggerTrackerUpdated();
                    this.AddAndUpdateService.TrackerFromUpdate.nameTrackerUpdate = '';
                }
            )
        })
        this.AddAndUpdateService.showBlock2 = true;
    }

    handleDeleteClick(id: number): void {
        this.GeneralService.setCallback(() => {
            this.TrackerService.deleteTracker(id).subscribe(
                (response) => {
                    this.params.api.applyTransaction({
                        remove: [this.params.data],
                    });
                    this.AddAndUpdateService.triggerTrackerUpdated();

                    this.GeneralService.showDialog = false;
                },
                (error) => {
                    alert(error);
                }
            );
        });

        this.GeneralService.showDialog = true;
    }
}
