import { Component, EventEmitter, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { GeneralService } from 'src/app/services/general.service';
import { TrackerService } from 'src/app/services/tracker/tracker.service';

@Component({
    selector: 'update-tracker',
    templateUrl: 'update-tracker.component.html',
})
export class UpdateTracker implements ICellRendererAngularComp {
    constructor(private TrackerService: TrackerService, public GeneralService: GeneralService) { }
    @Output() onDelete = new EventEmitter<void>();
    @Output() onUpdate = new EventEmitter<void>();


    public params!: ICellRendererParams;

    agInit(params: ICellRendererParams): void {
        this.params = params;
    }

    refresh(params: ICellRendererParams): boolean {
        this.params = params;
        return true;
    }

    handleUpdateClick(): void {
        this.onUpdate.emit();
    }

    handleDeleteClick(id: number): void {
        this.GeneralService.setCallback(() => {
            this.TrackerService.deleteTracker(id).subscribe(
                (response) => {
                    this.params.api.applyTransaction({
                        remove: [this.params.data],
                    });
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
