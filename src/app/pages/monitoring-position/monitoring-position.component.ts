import { Component } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { TrackerService } from 'src/app/services/tracker/tracker.service';
import { UpdateTracker } from './update-tracker.component';

@Component({
  selector: 'app-monitoring-position',
  templateUrl: './monitoring-position.component.html',
})


export class MonitoringPositionComponent {

  constructor(private TrackerService: TrackerService) { }
  marketPlace: any = {
    1: 'Wildberries',
    2: 'Ozon',
  }

  showInputBlock = false;

  columnDefs: ColDef[] = [
    { field: 'title', headerName: 'Наименование трекинга', flex: 1 },
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
  }

  loadTrackings() {
    this.TrackerService.getTrackings().subscribe(
      (response: any) => {
        this.rowData = response.data;
        console.log('Обновленные данные:', this.rowData);


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

  onTrackerDeleted(): void {
    this.loadTrackings();
  }
}
