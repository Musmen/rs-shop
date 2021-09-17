export interface IOrder {
  id: string,
  items: IOrderGoodsItem[],
  details: IOrderDetails,
}

interface IOrderGoodsItem {
  id: string,
  amount: number,
}

interface IOrderDetails {
  name: string,
  address: string,
  phone: string,
  timeToDeliver: string,
  comment: string,
}
