/**
 * Defines all available and supported column types
 */
export type IColumnType = 'text' | 'number' | 'image' | 'link' | 'video'

/**
 * Defines all available table sort options
 */
export type TableSortDirection = 'asc' | 'desc' | ''

export interface ITableColumn {
  /**
   * Title of the column shown in table header
   */
  title: string
  /**
   * Key used to read value for the column in row from the provided data
   */
  valueKey: string
  /**
   * Type of the each column
   */
  type: IColumnType
  /**
   * Text used to be shown in table cell instead of the URL (link, video)
   */
  label?: string
}
