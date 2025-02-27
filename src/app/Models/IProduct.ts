export interface IProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  discount: number;
  isDeleted: boolean;
  categoryName: string;
}
