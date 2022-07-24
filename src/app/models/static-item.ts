export interface StaticItem {
  _id: string;
  __v: number;
  itemUrl: string;
  itemName: string;
  imgSrc: string;
  itemPrice: number;
  itemMeasueUnit: string;
  itemType: 'bb' | 'equip';
}
