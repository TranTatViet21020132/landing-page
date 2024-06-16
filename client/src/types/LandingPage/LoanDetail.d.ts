export type LoanDetailCard = {
  title: string;
  description: string | { line1?: string, line2?: string, line3?: string, line4?: string };
  hiddenY: number;
  delay: number;
}