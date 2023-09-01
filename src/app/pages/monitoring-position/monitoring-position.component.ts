import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
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

  columnDefs: ColDef[] = [
    { field: 'title', headerName: 'Наиƒменование трекинга', flex: 1 },
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
    { field: 'actions', headerName: 'Действия', cellRenderer: UpdateTracker }
  ];

  rowData: any = []




  ngOnInit(): void {
    this.TrackerService.getTrackings().subscribe(
      (response: any) => {
        this.rowData = response.data
      },
      error => {
        console.log(error);
      }
    )
  }


  addTracker() {
    this.TrackerService.addTracker('тест', 1).subscribe(
      response => {
        console.log('Добавлено')
      },
      error => {
        console.log(error);
      }
    )
  }

}
