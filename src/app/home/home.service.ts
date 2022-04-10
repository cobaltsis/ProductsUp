import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'

import { IProduct } from '@home/home.model'
import { IColumnType, ITableColumn } from '@common/components/table/table.model'
import { PREDEFINED_TABLE_COLUMNS } from '@home/home.constants'

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  headerColumns?: ITableColumn[]

  constructor(private http: HttpClient) {}

  /**
   * The method that will fetch table data from the JSON or provided API endpoint
   */
  fetchProducts(): Observable<IProduct[]> {
    return this.http.get(`/assets/table_data.json`).pipe(
      map((rsp) => {
        const productsArray = Object.values(rsp)
        this.generateHeaderColumns(productsArray)
        return productsArray
      })
    )
  }

  /**
   * The method that goes trough all data and finds all columns
   */
  generateHeaderColumns(response: IProduct[]): void {
    if (!response?.length) {
      this.headerColumns = []
      return
    }

    const columns: { [key: string]: ITableColumn } = {}
    response.forEach((product: IProduct) => {
      Object.keys(product).forEach((key: string) => {
        if (!columns[key]) {
          if (PREDEFINED_TABLE_COLUMNS[key]) {
            columns[key] = PREDEFINED_TABLE_COLUMNS[key]
            return
          }

          const columnDefinition: ITableColumn = {
            title: this.getColumnTitle(key),
            valueKey: key,
            type: this.getColumnType(product[<keyof IProduct>key]),
          }

          if (columnDefinition.type === 'link') {
            columnDefinition.label = 'Link'
          }

          columns[key] = columnDefinition
        }
      })
    })

    this.headerColumns = Object.values(columns)
  }

  /**
   * The method that creates column header title based on key from dataset
   */
  private getColumnTitle(key: string): string {
    let words = key.split('_')
    words = words.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
    return words.join(' ')
  }

  /**
   * The method that returns type of the column
   */
  private getColumnType(value: any): IColumnType {
    if (!value || (typeof value !== 'string' && typeof value !== 'number')) {
      return 'text'
    }

    value = value.toString()

    if (value.includes('http')) {
      if (value.includes('webm')) {
        return 'video'
      }

      return 'link'
    }

    return 'text'
  }
}
