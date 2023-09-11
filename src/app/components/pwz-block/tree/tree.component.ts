import { Component, ViewChild } from '@angular/core';
import { TrackingPwzService } from 'src/app/services/tracker/TrackingPwz/tracking-pwz.service';
import { TreeNodeComponent } from './tree-node/tree-node.component';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
})
export class TreeComponent {
  treeData: any[] = [];

  constructor(private trackingPwzService: TrackingPwzService) { }

  ngOnInit(): void {
    this.trackingPwzService.getTreePwz(1).subscribe(
      (response: any) => {
        this.treeData = response.data;
        this.addCheckedProperty(this.treeData);
      }
    )
  }

  addCheckedProperty(items: any[]) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.state = 0;
      if (item.children) {
        this.addCheckedProperty(item.children);
      }
    }
  }
}
