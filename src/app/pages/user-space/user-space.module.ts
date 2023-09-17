import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSpaceComponent } from './user-space.component';
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
import { TrackerInfoComponent } from '../tracker-info/tracker-info.component';
import { KeywordsBlockComponent } from 'src/app/components/keywords-block/keywords-block.component';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { ArticlesBlockComponent } from 'src/app/components/articles-block/articles-block.component';
import { PwzBlockComponent } from 'src/app/components/pwz-block/pwz-block.component';
import { TreeComponent } from 'src/app/components/pwz-block/tree/tree.component';
import { TreeNodeComponent } from 'src/app/components/pwz-block/tree/tree-node/tree-node.component';
import { TreeBranchComponent } from 'src/app/components/pwz-block/tree/tree-branch/tree-branch.component';
import { TreeCheckboxComponent } from 'src/app/components/pwz-block/tree/tree-checkbox/tree-checkbox.component';
import { AuthGuard } from 'src/app/services/auth.guard';

const appRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: UserSpaceComponent,
    children: [
      { path: 'monitoring-position', component: MonitoringPositionComponent },
      { path: 'monitoring-position/:title/:id', component: TrackerInfoComponent },
    ]
  },
];


@NgModule({
  declarations: [
    UserSpaceComponent,
    Navbar,
    Header,
    Content,
    MonitoringPositionComponent,
    UpdateTracker,
    DialogComponent,
    AddedAndUpdateTrackingBlockComponent,
    TitleLinkComponent,
    TrackerInfoComponent,
    KeywordsBlockComponent,
    ArticlesBlockComponent,
    PwzBlockComponent,
    TreeComponent,
    TreeNodeComponent,
    TreeBranchComponent,
    TreeCheckboxComponent
  ],
  imports: [RouterModule.forChild(appRoutes), AgGridModule, CommonModule, FormsModule, MonacoEditorModule.forRoot()],
  providers: [],
})
export class UserSpaceModule { }
