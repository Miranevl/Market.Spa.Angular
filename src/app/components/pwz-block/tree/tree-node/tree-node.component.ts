import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent {
  @Input() node: any;
  isExpanded?: boolean;
  state: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.node.state = 0;
  }

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  toggleCheckbox(node: any) {
    if (node.state === 0) {
      node.state = 1;
      this.toggleChildrenCheckbox(node);
    } else {
      node.state = 0;
    }
  };

  toggleChildrenCheckbox(node: any) {
    if (node?.children) {
      node.children.forEach((child: any) => {
        child.state = 1;
        this.toggleChildrenCheckbox(child);
      });
    }
  }

}
