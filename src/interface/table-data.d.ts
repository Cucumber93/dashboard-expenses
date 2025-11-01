export interface Expense {
  created_at: string;
  categoryId: string;
  name: string;
  amount: number;
  type?: string;
}