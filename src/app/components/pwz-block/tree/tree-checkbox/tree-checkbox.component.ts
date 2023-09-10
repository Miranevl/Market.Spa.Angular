import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tree-checkbox',
  templateUrl: './tree-checkbox.component.html',
  styleUrls: ['./tree-checkbox.component.scss']
})
export class TreeCheckboxComponent {
  @Input() state?: number;

}
