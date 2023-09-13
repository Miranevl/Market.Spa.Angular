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
      node.state = 1; // Помечаем текущий узел как выбранный (или частично выбранный)
      this.toggleChildrenCheckbox(node, 1); // Выбираем всех детей
      this.updateParentState(node.parent);
    } else {
      node.state = 0; // Снимаем выбор с текущего узла
      this.toggleChildrenCheckbox(node, 0); // Снимаем выбор со всех детей
      this.updateParentState(node.parent);
    }
  }

  updateParentState(parent: any) {
    if (parent) {
      const childStates = parent.children.map((child: any) => child.state);
      if (childStates.every((state: number) => state === 1)) {
        parent.state = 1; // Если все дети выбраны, родитель выбран
      } else if (childStates.some((state: number) => state === 1 || state === 2)) {
        parent.state = 2; // Если хотя бы один ребенок выбран или частично выбран, родитель частично выбран
      } else {
        parent.state = 0; // В противном случае, ни один ребенок не выбран
      }
      this.updateParentState(parent.parent);
    }
  }

  toggleChildrenCheckbox(node: any, state: number) {
    if (node.children) {
      node.children.forEach((child: any) => {
        child.state = state;
        this.toggleChildrenCheckbox(child, state);
      });
    }
  }
}

