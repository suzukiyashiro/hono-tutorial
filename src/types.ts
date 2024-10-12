export type TodoType = {
  id: string; // uuidを使う
  title: string;
  desc: string;
  createdAt: Date;
  isCompleted: boolean;
};
