import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { UserSpaceComponent } from './user-space/user-space.component';
import { Navbar } from 'src/app/components/navbar/navbar.component';
import { Header } from 'src/app/components/header/header.component';
import { Content } from 'src/app/components/content/content.component';

const appRoutes: Routes = [
  {
    path: '',
    component: UserSpaceComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      }
    ],
  },
];

@NgModule({
  declarations: [HomeComponent, UserSpaceComponent, Navbar, Header, Content],
  imports: [RouterModule.forChild(appRoutes)],
  providers: [],
})
export class UserSpaceModule {}
