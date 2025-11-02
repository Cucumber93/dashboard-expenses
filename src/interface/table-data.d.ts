export interface Expense {
  created_at: string;
  categoryName: string;
  name: string;
  amount: number;
  type?: string;
}