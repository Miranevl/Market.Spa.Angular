import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackingPwzService {
  detailsData: any;
  constructor(private httpClient: HttpClient) { }

  getTreePwz(marketplaceId: number) {
    return this.httpClient.get(`/api/Pwz/groups/tree/${marketplaceId}`);
  };

  getPwzDetails(pwzGroupId: number) {
    return this.httpClient.get(`/api/Pwz/details/${pwzGroupId}`)
  }

  getMyPwz(trackingId: number) {
    return this.httpClient.get(`/api/TrackingPwzGroups/${trackingId}/${0}/${5000}`);
  };

  removeMyPwz(trackingId: number, pwzGroupsIds: number[]) {
    return this.httpClient.post('/api/TrackingPwzGroups/remove', { trackingId, pwzGroupsIds });
  };

  clearAllMyPwz(trackingId: number) {
    return this.httpClient.post('/api/TrackingPwzGroups/clearAll', { trackingId });
  };

  addRegionInMyPwz(trackingId: number, pwzGroupsIds: number[]) {
    return this.httpClient.post('/api/TrackingPwzGroups/add', { trackingId, pwzGroupsIds });
  };



}
