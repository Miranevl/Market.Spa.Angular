import { Component, EventEmitter, Output } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { TrackerService } from "src/app/services/tracker/tracker.service";

@Component({
    selector: 'update-tracker',
    templateUrl: 'update-tracker.component.html',
})


export class UpdateTracker implements ICellRendererAngularComp {
    constructor(private TrackerService: TrackerService) { }
    @Output() onDelete = new EventEmitter<void>();

    public params: any;

    agInit(params: any): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        return true;
    }

    handleUpdateClick(): void {
        alert('Я обновился')
    }

    handleDeleteClick(id: number): void {
        this.TrackerService.deleteTracker(id).subscribe(
            response => {
                alert('я удалился!');
                window.location.reload(); // костыль
            },
            error => {
                alert(error);
            }
        )
    }
}
