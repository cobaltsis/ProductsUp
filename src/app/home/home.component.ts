import { Component, OnInit } from '@angular/core'
import { take } from 'rxjs'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { HomeService } from '@home/home.service'
import { IFilter, IOperator, IProduct } from '@home/home.model'
import { OPERATIONS } from '@home/home.constants'
import { IColumnType, ITableColumn } from '@common/components/table/table.model'

interface IFormOperator {
  title: string
  value: IOperator
  availableOnlyFor?: IColumnType
}

/**
 * The component for home page that includes sidebar (toolbox) and table
 *
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  /**
   * The variable that holds all products
   */
  private products?: IProduct[]
  /**
   * The variable that holds only products covered by filters
   */
  filteredProducts?: IProduct[]
  /**
   * The variable that holds all table columns
   */
  columns?: ITableColumn[]
  filterForm?: FormGroup

  /**
   * The variable that holds all applied filters
   */
  filterColumns: IFilter[] = []

  /**
   * The variable that holds all available operators for filtering
   */
  operators: IFormOperator[] = [
    { title: 'Less than', value: 'less', availableOnlyFor: 'number' },
    { title: 'Less or equal', value: 'less_or_equal', availableOnlyFor: 'number' },
    { title: 'Greater than', value: 'greater', availableOnlyFor: 'number' },
    { title: 'Greater or equal', value: 'greater_or_equal', availableOnlyFor: 'number' },
    { title: 'Equal', value: 'equal' },
    { title: 'Not equal', value: 'not_equal' },
    { title: 'Contains', value: 'contains' },
    { title: 'Not contain', value: 'not_contain' },
  ]

  constructor(private homeService: HomeService, private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.fetchProducts()
    this.buildForm()
  }

  /**
   * The method that will fetch data for the table
   */
  private fetchProducts(): void {
    this.homeService
      .fetchProducts()
      .pipe(take(1))
      .subscribe((rsp: IProduct[]) => {
        this.products = rsp
        this.filteredProducts = this.products
        this.columns = this.homeService.headerColumns
      })
  }

  /**
   * The method that creates form for table filtering (in sidebar / toolbox)
   */
  private buildForm(): void {
    this.filterForm = this._formBuilder.group({
      column: ['', [Validators.required]],
      operator: ['', [Validators.required]],
      value: ['', [Validators.required]],
    })
  }

  /**
   * The method called on column select which resets selected operator, and marks operator field as untouched and resets validation for that input
   */
  resetOperatorSelection(): void {
    this.filterForm?.patchValue({ operator: null })
    this.filterForm?.controls['operator'].markAsUntouched()
  }

  /**
   * The method that checks if product columns and values are covered by filter selection
   */
  private isProductCoveredByFilters(product: IProduct): boolean {
    if (!this.filterColumns?.length) {
      return true
    }

    for (const filter of this.filterColumns) {
      if (!OPERATIONS.hasOwnProperty(filter.operator)) {
        continue
      }

      if (!OPERATIONS[filter.operator](product[filter.column], filter.value)) {
        return false
      }
    }

    return true
  }

  /**
   * The method that is called when the user applies filter. It adds new filter to list of applied filters and triggers data filtering. It also resets form and form validation.
   */
  filterProducts(): void {
    this.filterColumns.push({
      column: this.filterForm?.value.column.valueKey,
      columnName: this.filterForm?.value.column.title,
      operator: this.filterForm?.value.operator.value,
      operatorName: this.filterForm?.value.operator.title,
      value: this.filterForm?.value.value,
    })

    this.filterForm?.patchValue({ column: null, operator: null, value: null })
    this.filterForm?.markAsUntouched()
    this.filter()
  }

  /**
   * The method that iterates trough list of products and calls method to check if that product should be in table, and updates table data
   */
  private filter(): void {
    if (!this.products?.length) {
      return
    }

    const filtered: IProduct[] = this.products?.filter((product: IProduct) => {
      return !!this.isProductCoveredByFilters(product)
    })

    this.filteredProducts = filtered
  }

  /**
   * The method that removes selected filter from applied filters, and triggers data filtering
   */
  removeFilter(index: number): void {
    this.filterColumns.splice(index, 1)
    this.filter()
  }

  /**
   * The method that removes all applied filters, and triggers data filtering
   */
  clearFilters(): void {
    this.filterColumns = []
    this.filter()
  }
}
