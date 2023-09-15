import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(private httpClient: HttpClient, private AuthService: AuthService) { }

  getTrackings(): Observable<any> {
    return this.httpClient.get('/api/Tracking/List');
  }

  addTracker(title: string, marketplaceId: number = 1): Observable<any> {
    return this.httpClient.post('/api/Tracking/Create', { title, marketplaceId });
  }

  deleteTracker(trackingId: number): Observable<any> {
    return this.httpClient.post(`/api/Tracking/Remove/${trackingId}`, {});
  }

  updateTracker(trackingId: number, title: string): Observable<any> {
    return this.httpClient.post('/api/Tracking/Update', { trackingId, title });
  }

  getTrackerId(trackingId: number): Observable<any> {
    return this.httpClient.get(`/api/Tracking/${trackingId}`);
  }
}
