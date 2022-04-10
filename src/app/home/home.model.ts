/**
 * The interface for single product from the list of products
 */
export interface IProduct {
  additional: string | number
  category: string
  color: string
  currency: string
  gender: string
  gtin: number
  id: number
  image: string
  image_additional: string
  price: number | string
  product_desc: string
  product_name: string
  quantity: number | string
  size: string
  source_video: string
  style: string
  url: string
}

/**
 * Defines all available operators for the data filtering
 */
export type IOperator = 'equal' | 'not_equal' | 'less_or_equal' | 'greater_or_equal' | 'less' | 'greater' | 'contains' | 'not_contain'

/**
 * The interface for single filter from applied filters list, used for data filtering
 */
export interface IFilter {
  column: keyof IProduct
  columnName: string
  operator: IOperator
  operatorName: string
  value: string | number
}
