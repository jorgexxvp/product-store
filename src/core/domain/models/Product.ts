// SCHEMA

export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

//REQUEST

//RESPONSE

export interface IProductResponse {
  list: IProduct[];
}
