import { Component } from '@angular/core';

@Component({
    selector: 'main-header-app',
    templateUrl: './header.component.html'
})
export class Header {
    userAvatar = '';
    userName = 'Имя Фамилия'; // тут будет запрос из базы
}