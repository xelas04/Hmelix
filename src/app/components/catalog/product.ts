// типа сущность
export interface Product {
  productid: number;
  name: string;
  price: number;
  orders_count: number;
}
// модель ответа Products
export interface ProductsResponse {
  products: Product[];
  totalCount: number;
}
// модель ответа для популярного на главной
export interface PopularResponse {
  popular: Product[];
}
