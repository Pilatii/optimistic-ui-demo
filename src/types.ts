export type ItemStatus = "todo" | "done";

export interface TaskItem {
  id: number;
  text: string;
  status: ItemStatus;
}
