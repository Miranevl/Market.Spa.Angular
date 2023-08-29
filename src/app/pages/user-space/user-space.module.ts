import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSpaceComponent } from './user-space/user-space.component';
import { Navbar } from 'src/app/components/navbar/navbar.component';
import { Header } from 'src/app/components/header/header.component';
import { Content } from 'src/app/components/content/content.component';

const appRoutes: Routes = [
  {
    path: '',
    component: UserSpaceComponent,
  },
];

@NgModule({
  declarations: [UserSpaceComponent, Navbar, Header, Content],
  imports: [RouterModule.forChild(appRoutes)],
  providers: [],
})
export class UserSpaceModule { }
