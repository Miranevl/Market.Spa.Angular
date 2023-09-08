import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackingKeywordsService {
  constructor(private httpClient: HttpClient) { }

  getTrackingKeywords(trackingId: number) {
    return this.httpClient.get(`/api/TrackingKeywords/${trackingId}`);
  };

  addTrackingKeywords(trackingId: number, keywords: string[]) {
    return this.httpClient.post('/api/TrackingKeywords/add', { trackingId, keywords });
  }

  clearAllTrackingKeywords(trackingId: number) {
    return this.httpClient.post('/api/TrackingKeywords/clearAll', { trackingId });
  }

  removedTrackingKeywords(trackingId: number, keywordsIds: number[]) {
    return this.httpClient.post('/api/TrackingKeywords/remove', { trackingId, keywordsIds });
  }

  suggestKeywords(keyword: string) {
    return this.httpClient.get(`/api/Keywords/Suggest?keyword=${keyword}`);
  }
}
