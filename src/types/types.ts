export interface ITypeIngredient {
  _id: string,
  calories: number,
  carbohydrates: number,
  type: string,
  fat: number,
  image: string,
  image_large: string,
  image_mobile: string,
  name: string,
  price: number ,
  proteins: number,
  __v: number,
  uniqueId?: string
};

export interface IOrderType {
  _id: string,
  name: string,
  ingredients: Array<string>,
  createdAt: string,
  number: number,
  status: string,
  updatedAt: string
};
