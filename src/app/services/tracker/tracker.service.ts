import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(private httpClient: HttpClient, private AuthService: AuthService) { }

  getTrackings() {
    return this.httpClient.get('/api/Tracking/List');
  }

  addTracker(title: string, marketplaceId: number = 1) {
    return this.httpClient.post('/api/Tracking/Create', { title, marketplaceId });
  }

}
