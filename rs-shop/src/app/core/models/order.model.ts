export interface IOrder {
  id?: string,
  items: IOrderGoodsItem[],
  details: IOrderDetails,
}

export interface IOrderGoodsItem {
  id: string,
  amount: number,
}

export interface IOrderDetails {
  name: string,
  address: string,
  phone: string,
  timeToDeliver: string,
  comment: string,
}
