import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackingArticlesService {

  constructor(private httpClient: HttpClient) { }

  getTrackingArticles(trackingId: number) {
    return this.httpClient.get(`/api/TrackingArticles/${trackingId}`);
  }

  clearTrackingArticles(trackerId: number) {
    return this.httpClient.post('/api/TrackingArticles/ClearAll', { trackerId })
  }

  addTrackingArticles(trackerId: number, articles: string[]) {
    return this.httpClient.post('/api/TrackingArticles/Add', { trackerId, articles });
  }

  removeTrackingArticles(trackerId: number, articleIds: number[]) {
    return this.httpClient.post('/api/TrackingArticles/Remove', { trackerId, articleIds });
  }

}
