import { ITableColumn } from '@common/components/table/table.model'
import { IOperator } from '@home/home.model'

/**
 * The columns definitions for some specific columns for table on the home page
 */
export const PREDEFINED_TABLE_COLUMNS: { [key: string]: ITableColumn } = {
  id: { title: 'ID', valueKey: 'id', type: 'number' },
  gtin: { title: 'GTIN', valueKey: 'gtin', type: 'number' },
  image: { title: 'Product image', valueKey: 'image', type: 'image' },
  product_name: { title: 'Product', valueKey: 'product_name', type: 'text' },
  url: { title: 'Product site', valueKey: 'url', type: 'link', label: 'Visit product site' },
  product_desc: { title: 'Description', valueKey: 'product_desc', type: 'text' },
  price: { title: 'Price', valueKey: 'price', type: 'number' },
  source_video: { title: 'Product video', valueKey: 'source_video', type: 'video' },
  quantity: { title: 'Quantity', valueKey: 'quantity', type: 'number' },
  image_additional: { title: 'Additional image', valueKey: 'image_additional', type: 'image' },
}

/**
 * The variable which holds all available operations for filtering
 */
export const OPERATIONS: { [key in IOperator]: (columnValue: number | string, filterValue: number | string) => boolean } = {
  equal: (columnValue: number | string, filterValue: number | string): boolean => {
    return columnValue == filterValue
  },
  not_equal: (columnValue: number | string, filterValue: number | string): boolean => {
    return columnValue != filterValue
  },
  less: (columnValue: number | string, filterValue: number | string): boolean => {
    return parseFloat(<string>columnValue) < parseFloat(<string>filterValue)
  },
  greater: (columnValue: number | string, filterValue: number | string): boolean => {
    return parseFloat(<string>columnValue) > parseFloat(<string>filterValue)
  },
  greater_or_equal: (columnValue: number | string, filterValue: number | string): boolean => {
    return parseFloat(<string>columnValue) >= parseFloat(<string>filterValue)
  },
  less_or_equal: (columnValue: number | string, filterValue: number | string): boolean => {
    return parseFloat(<string>columnValue) <= parseFloat(<string>filterValue)
  },
  contains: (columnValue: number | string, filterValue: number | string): boolean => {
    return columnValue.toString().includes(filterValue.toString())
  },
  not_contain: (columnValue: number | string, filterValue: number | string): boolean => {
    return !columnValue.toString().includes(filterValue.toString())
  },
}
