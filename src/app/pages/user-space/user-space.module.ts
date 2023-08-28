import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserSpaceComponent } from './user-space/user-space.component';
import { Navbar } from 'src/app/components/navbar/navbar.component';
import { Header } from 'src/app/components/header/header.component';
import { Content } from 'src/app/components/content/content.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
];


@NgModule({
    declarations: [
        HomeComponent,
        UserSpaceComponent,
        Navbar,
        Header,
        Content,
    ],
    imports: [
        BrowserModule,
        RouterModule.forChild(appRoutes),
        FormsModule,
    ],
    providers: [],
    bootstrap: [UserSpaceComponent]
})
export class UserSpaceModule { }
