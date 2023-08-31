import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSpaceComponent } from './user-space/user-space.component';
import { Navbar } from 'src/app/components/navbar/navbar.component';
import { Header } from 'src/app/components/header/header.component';
import { Content } from 'src/app/components/content/content.component';
import { AgGridModule } from 'ag-grid-angular';
import { MonitoringPositionComponent } from '../monitoring-position/monitoring-position.component';

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
  declarations: [UserSpaceComponent, Navbar, Header, Content, MonitoringPositionComponent],
  imports: [RouterModule.forChild(appRoutes), AgGridModule],
  providers: [],
})
export class UserSpaceModule { }
