import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { TrackerService } from "src/app/services/tracker/tracker.service";

@Component({
    selector: 'app-title-link',
    template: '<a class="transition ease-in-out delay-75 hover:text-blue-600 cursor-pointer"  (click)="handleClick(id)">{{title}}</a>'
})

export class TitleLinkComponent {
    constructor(private TrackerService: TrackerService, public router: Router) { }
    id: number = 0;
    title: string = "";

    agInit(params: any): void {
        this.title = params.data.title;
        this.id = params.data.id;
    }

    handleClick(trackerId: number) {
        this.TrackerService.getTrackerId(trackerId).subscribe(
            response => {
                this.router.navigate([`app/tracker-info/${this.title}/${trackerId}`]);
            },
            error => {
                alert(error);
            }
        );
    }
}