import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
    selector: 'update-tracker',
    templateUrl: 'update-tracker.component.html',
})


export class UpdateTracker implements ICellRendererAngularComp {
    private params: any;

    agInit(params: any): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        return false;
    }

    handleUpdateClick(): void {
        alert('Я обновился')
    }

    handleDeleteClick(): void {
        alert('я удалился')
    }
}
