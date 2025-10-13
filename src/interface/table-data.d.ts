export interface Expense {
  created_at: string;
  categoryId: string;
  name: string;
  value: number;
  type?: string;
}