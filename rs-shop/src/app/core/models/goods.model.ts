export interface IGoods {
  id: string,
  name: string,
  imageUrls: string[],
  availableAmount?: number,
  price: number,
  rating: number,
  description: string,
}
