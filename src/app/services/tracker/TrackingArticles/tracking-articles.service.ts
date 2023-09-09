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

  clearTrackingArticles(trackingId: number) {
    return this.httpClient.post('/api/TrackingArticles/ClearAll', { trackingId })
  }

  addTrackingArticles(trackingId: number, articles: string[]) {
    return this.httpClient.post('/api/TrackingArticles/Add', { trackingId, articles });
  }

  removeTrackingArticles(trackingId: number, articleIds: number[]) {
    return this.httpClient.post('/api/TrackingArticles/Remove', { trackingId, articleIds });
  }

}
