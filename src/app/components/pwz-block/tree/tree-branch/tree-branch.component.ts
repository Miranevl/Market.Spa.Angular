import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tree-branch',
  templateUrl: './tree-branch.component.html',
  styleUrls: ['./tree-branch.component.scss']
})
export class TreeBranchComponent {
  @Input() branch: any;
  isExpanded: boolean = false;


  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

}
