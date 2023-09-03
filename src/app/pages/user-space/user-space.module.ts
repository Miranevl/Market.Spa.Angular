import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSpaceComponent } from './user-space/user-space.component';
import { Navbar } from 'src/app/components/navbar/navbar.component';
import { Header } from 'src/app/components/header/header.component';
import { Content } from 'src/app/components/content/content.component';
import { AgGridModule } from 'ag-grid-angular';
import { MonitoringPositionComponent } from '../monitoring-position/monitoring-position.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateTracker } from '../monitoring-position/update-tracker.component';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { AddedAndUpdateTrackingBlockComponent } from 'src/app/components/added-and-update-tracking-block/added-and-update-tracking-block.component';
import { TitleLinkComponent } from '../monitoring-position/titleLink/title-link.component';

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
  declarations: [UserSpaceComponent, Navbar, Header, Content, MonitoringPositionComponent, UpdateTracker, DialogComponent, AddedAndUpdateTrackingBlockComponent, TitleLinkComponent],
  imports: [RouterModule.forChild(appRoutes), AgGridModule, CommonModule, FormsModule],
  providers: [],
})
export class UserSpaceModule { }
