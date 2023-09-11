import { Component, Host, Input } from '@angular/core';
import { TreeComponent } from '../tree.component';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent {
  @Input() node: any;
  @Input() parent: any;
  isExpanded?: boolean;
  constructor() { }



  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  toggleCheckbox(node: any) {
    if (node.state === 0) {
      this.checkedParent(node);
      node.state = 1;
      this.toggleChildrenCheckbox(node);

    } else {
      this.checkedParent(node);

      node.state = 0;
      this.toggleChildrenCheckbox(node);

    }
  };

  toggleChildrenCheckbox(node: any) {
    if (node?.children) {
      node.children.forEach((child: any) => {
        if (child.state === 0) {
          child.state = 1;
          this.toggleChildrenCheckbox(child);
        } else {
          child.state = 0;
          this.toggleChildrenCheckbox(child);
        }
      })
    }
  }

  checkedParent(node: any) {
    if (this.parent.state === 0) {
      this.parent.state = 2;
    } else {
      this.parent.state = 0;
    }
  }

}

