export type TreeData = TreeDataItem[];

export interface TreeDataItem {
    title: string;
    children?: TreeNode[];
    id?: number;
    state: number;
}

export interface TreeNode {
    title: string,
    children?: TreeNode[],
    id?: number
    state: number,
    level: number,
    parent: string | null,
}

