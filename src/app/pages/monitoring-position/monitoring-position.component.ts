import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { TrackerService } from 'src/app/services/tracker/tracker.service';
import { UpdateTracker } from './update-tracker.component';
import { AddAndUpdateService } from 'src/app/services/tracker/add-and-update.service';
import { TitleLinkComponent } from './titleLink/title-link.component';

@Component({
  selector: 'app-monitoring-position',
  templateUrl: './monitoring-position.component.html',
})

export class MonitoringPositionComponent {

  constructor(private TrackerService: TrackerService, public AddAndUpdateService: AddAndUpdateService) { }
  marketPlace: any = {
    1: 'Wildberries',
    2: 'Ozon',
  }

  showInputBlock = true;
  trackersExist: boolean = false;

  columnDefs: ColDef[] = [
    {
      field: 'title', headerName: 'Наименование трекинга', flex: 1, cellRenderer: TitleLinkComponent,
      cellRendererParams: (params: any) => ({ data: params.data })
    },
    {
      field: 'marketplaceId', headerName: 'Маркетплейс', cellRenderer: (params: any) => {
        const marketplaceId = params.value;
        if (this.marketPlace.hasOwnProperty(marketplaceId)) {
          return this.marketPlace[marketplaceId];
        } else {
          return 'Unknown';
        }
      },
    },
    {
      field: 'actions', headerName: 'Действия', cellRenderer: UpdateTracker,
    }
  ];

  rowData: any[] = []

  ngOnInit(): void {
    this.loadTrackings();

    this.AddAndUpdateService.trackerAdded.subscribe(() => {
      this.loadTrackings();
    });
  }

  loadTrackings() {
    this.TrackerService.getTrackings().subscribe(
      (response: any) => {
        this.rowData = response.data;
        this.trackersExist = this.rowData.length > 0; // Проверяем наличие трекеров в массиве

      },
      (error) => {
        console.log(error);
      }
    );
  }

  toggleInputBlock() {
    this.showInputBlock = !this.showInputBlock;
  }

  onTrackerAdded() {
    this.loadTrackings();
  }

}
