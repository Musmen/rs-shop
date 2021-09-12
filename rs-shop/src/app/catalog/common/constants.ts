export const CATEGORIES_ID_TO_ICONS: { [key: string]: string } = {
  appliances: 'kitchen',
  electronics: 'tablet_mac',
  'computers-peripherals': 'computer',
  furniture: 'weekend',
  hobbies: 'menu_book',
};

export enum AmountStatus {
  low = 5,
  high = 20,
}

export enum Titles {
  low = 'Осталось меньше 5 единиц',
  high = 'В наличии больше 20 единиц',
}

export enum Colors {
  red = '#EB5757',
  green = '#27AE60',
  yellow = '#F2C94C',
}

export const DEFAULT_AMOUNT_VISUALIZATION = {
  color: Colors.yellow,
  title: 'Осталось от 5 до 20 единиц',
};
