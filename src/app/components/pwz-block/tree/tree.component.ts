import { Component } from '@angular/core';
import { TrackingPwzService } from 'src/app/services/tracker/TrackingPwz/tracking-pwz.service';
import { TreeData } from './tree.type';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
})
export class TreeComponent {
  treeData !: TreeData;

  constructor(private trackingPwzService: TrackingPwzService) { }

  ngOnInit(): void {
    this.trackingPwzService.getTreePwz(1).subscribe(
      (response: any) => {
        this.treeData = response.data;
        this.addCheckedProperty(this.treeData);
      }
    )
  }

  addCheckedProperty(items: any[], parent: any = null) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.parent = parent;
      item.state = 0;
      if (item.children) {
        this.addCheckedProperty(item.children, item);
      }
    }
  }
}
