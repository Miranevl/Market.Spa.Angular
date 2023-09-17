import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TrackingPwzService } from 'src/app/services/tracker/TrackingPwz/tracking-pwz.service';
import { TreeData, TreeNode } from './tree.type';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
})
export class TreeComponent {
  treeData !: TreeData;
  currentTreeData !: TreeData;
  arrData: number[] = [];

  @Input() id!: number;
  @Output() diffPwzTree = new EventEmitter<void>();
  @Output() deleteAllData = new EventEmitter<void>();


  constructor(private trackingPwzService: TrackingPwzService, public generalService: GeneralService) { }

  ngOnInit(): void {
    this.loadTreeData(1);
    this.refresh()
  }

  private loadTreeData(id: number): void {
    this.trackingPwzService.getTreePwz(id).subscribe((response: any) => {
      this.treeData = response.data;
      this.addCheckedProperty(this.treeData);
    });
  }

  refresh(): void {
    this.trackingPwzService.getMyPwz(this.id).subscribe(
      (response: any) => {
        this.currentTreeData = response.data;
        this.setCheckedStateFromCurrentData(this.treeData, this.currentTreeData);
      }
    );
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

  updateParentState(parent: TreeNode) {
    if (parent) {
      if (parent.children && parent.children.length > 0) {
        const childStates = parent.children.map((child: TreeNode) => child.state);
        if (childStates.every((state: number) => state === 1)) {
          parent.state = 1; // Если все дети выбраны, родитель выбран
        } else if (childStates.some((state: number) => state === 1 || state === 2)) {
          parent.state = 2; // Если хотя бы один ребенок выбран или частично выбран, родитель частично выбран
        } else {
          parent.state = 0; // В противном случае, ни один ребенок не выбран
        }
        if (parent.parent && typeof parent.parent === 'object') {
          this.updateParentState(parent.parent as TreeNode); // Рекурсивно обновляем состояние родителей
        }
      }
    }
  }

  addCheckedProperty(items: any[], parent: TreeNode | null = null) {
    for (let i = 0; i < items.length; i++) {
      const item: TreeNode = items[i];
      item.parent = parent;
      item.state = 0;
      if (item.children) {
        this.addCheckedProperty(item.children, item);
      }
    }
  }

  checkedTreeData() {
    const traverse = (node: TreeNode) => {
      if (node.id && node.state === 1) {
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

  deleteAll() {
    this.deleteAllData.emit();
    this.generalService.setCallback(() => {
      this.trackingPwzService.clearAllMyPwz(this.id).subscribe(
        () => {
          alert('все удалено');
          this.refresh()
          this.generalService.showDialog = false;
        },
        err => {
          console.log(err);
        }
      )
    })
    this.generalService.showDialog = true;
  }

  diffPwz() {
    this.checkedTreeData();
    this.diffPwzTree.emit();
    const myPwzCurrent = new Set(this.currentTreeData.map((item) => item.id));
    const myPwzSelected = new Set(this.arrData.map((item: number) => item))
    const addedPwz = [...myPwzSelected].filter((item: number) => !myPwzCurrent.has(item));
    const removedPwz = this.currentTreeData
      .filter((item) => item.id !== undefined)
      .filter((item) => !myPwzSelected.has(item.id as number))
      .map((node) => node.id as number);
    this.handleChanges(addedPwz, removedPwz);
  };

  handleChanges(addedPwz: number[], removedPwz: number[]) {
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
