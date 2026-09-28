// типа сущность
export interface Product {
  productid: number;
  name: string;
  price: number;
}
// модель ответа
export interface ProductsResponse {
  products: Product[];
  totalCount: number;
}