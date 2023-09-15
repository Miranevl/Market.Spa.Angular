import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TrackingPwzService } from 'src/app/services/tracker/TrackingPwz/tracking-pwz.service';
import { TreeData, TreeNode } from './tree.type';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
})
export class TreeComponent {
  treeData !: TreeData;
  currentTreeData !: TreeData;
  arrData: any = [];

  @Input() id!: number;
  @Output() diffPwzTree = new EventEmitter<void>();
  @Output() deleteAllData = new EventEmitter<void>();


  constructor(private trackingPwzService: TrackingPwzService) { }

  ngOnInit(): void {
    this.trackingPwzService.getTreePwz(1).subscribe(
      (response: any) => {
        this.treeData = response.data;
        this.addCheckedProperty(this.treeData);
      }
    );
    this.refresh()
  }

  setCheckedStateFromCurrentData(treeData: any[], currentData: any[]) {
    const traverse = (node: any) => {
      const matchingNode = currentData.find((item) => item.id === node.id);
      if (matchingNode) {
        node.state = 1; // Устанавливаем состояние 1 (выбран) для узла, если он существует в currentData
        Object.assign(matchingNode, node);
        this.updateParentState(node.parent);
      } else {
        node.state = 0; // Если узел не найден в currentData, снимаем выбор
      }

      if (node.children) {
        node.children.forEach((child: TreeNode) => {
          traverse(child);
        });
      }
    };
    treeData.forEach((item: TreeNode) => {
      traverse(item);
    });
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
      this.updateParentState(parent.parent); // Рекурсивно обновляем состояние родителей
    }
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
  };

  checkedTreeData() {
    const traverse = (node: TreeNode) => {
      if (node.state === 1 && node.id) {
        this.arrData.push(node.id);
      }
      if (node.children) {
        node.children.forEach((child: TreeNode) => {
          traverse(child);
        });
      }
    };
    this.treeData.forEach((item: any) => {
      traverse(item);
    });
  }

  refresh() {
    this.trackingPwzService.getMyPwz(this.id).subscribe(
      (response: any) => {
        this.currentTreeData = response.data;
        this.setCheckedStateFromCurrentData(this.treeData, this.currentTreeData);
      }
    );
  }

  deleteAll() {
    this.deleteAllData.emit();

    this.trackingPwzService.clearAllMyPwz(this.id).subscribe(
      () => {
        alert('все удалено');
        this.refresh()
      },
      err => {
        console.log(err);
      }
    )
  }

  diffPwz() {
    this.diffPwzTree.emit();
    this.checkedTreeData();
    const myPwzCurrent = new Set(this.currentTreeData.map((item) => item.id));
    const myPwzSelected = new Set(this.arrData.map((item: any) => item))
    const addedPwz = [...myPwzSelected].filter((item: any) => !myPwzCurrent.has(item));
    const removedPwz = this.currentTreeData.filter((item) => !myPwzSelected.has(item.id)).map((node) => node.id);
    this.handleChanges(addedPwz, removedPwz);
  };

  handleChanges(addedPwz: any[], removedPwz: any[]) {
    if (this.id) {
      if (removedPwz.length > 0) {
        this.trackingPwzService.removeMyPwz(this.id, removedPwz).subscribe(
          () => {
            alert('артикулы были обновлены');
            this.refresh();
          },
          error => {
            console.log(error);
          }
        );
      }

      if (addedPwz.length > 0) {
        this.trackingPwzService.addRegionInMyPwz(this.id, addedPwz).subscribe(
          () => {
            alert('новые артикулы добавлены');
            this.refresh();
          },
          error => {
            console.log(error, 'тут ошибкуа');
          }
        );
      }
    }
  };


}
