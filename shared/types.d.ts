export interface IProductItem {
  id: number;
  name: string;
  description: number;
  price: string;
  rating: number;
}

export interface IFeedbackItem {
  id: number;
  product_id: number;
  timestamp: string;
  name: string;
  rating: number;
  comment: string;
  helpful: number;
}

export interface IChartData {
  id: number;
  labels: string[];
  data: number[];
}
