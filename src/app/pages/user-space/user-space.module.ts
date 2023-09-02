import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSpaceComponent } from './user-space/user-space.component';
import { Navbar } from 'src/app/components/navbar/navbar.component';
import { Header } from 'src/app/components/header/header.component';
import { Content } from 'src/app/components/content/content.component';
import { AgGridModule } from 'ag-grid-angular';
import { MonitoringPositionComponent } from '../monitoring-position/monitoring-position.component';
import { AddTrackerComponent } from '../monitoring-position/add-tracker/add-tracker.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateTracker } from '../monitoring-position/update-tracker.component';
import { UpdateTrackerBlockComponent } from '../monitoring-position/update-tracker-block/update-tracker-block.component';

const appRoutes: Routes = [
  {
    path: '',
    component: UserSpaceComponent,
    children: [
      { path: 'monitoring-position', pathMatch: 'full', component: MonitoringPositionComponent },
    ]
  },


];

@NgModule({
  declarations: [UserSpaceComponent, Navbar, Header, Content, MonitoringPositionComponent, AddTrackerComponent, UpdateTracker, UpdateTrackerBlockComponent],
  imports: [RouterModule.forChild(appRoutes), AgGridModule, CommonModule, FormsModule],
  providers: [],
})
export class UserSpaceModule { }
