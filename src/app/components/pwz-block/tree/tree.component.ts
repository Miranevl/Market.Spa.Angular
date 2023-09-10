import { Component } from '@angular/core';
import { TrackingPwzService } from 'src/app/services/tracker/TrackingPwz/tracking-pwz.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
})
export class TreeComponent {
  treeData = [];
  constructor(private trackingPwzService: TrackingPwzService) { }

  ngOnInit(): void {
    this.trackingPwzService.getTreePwz(1).subscribe(
      (response: any) => {
        this.treeData = response.data;
      }
    )
  }
}
