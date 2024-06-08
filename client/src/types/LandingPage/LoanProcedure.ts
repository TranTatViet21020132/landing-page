import { ContentProp } from "./Content";

export type LoanProceduresProp = {
  header: string;
  subHeader: string;
  content: ContentProp[];
  revealDelay?: number;
  slideDelay?: number;
}