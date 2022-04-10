import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { MatPaginator, PageEvent } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'

import { ITableColumn, TableSortDirection } from '@common/components/table/table.model'

/**
 * The reusable component for the tables
 *
 * @export
 * @class TableComponent
 * @implements {OnInit}
 * @implements {AfterViewInit}
 * @implements {OnChanges}
 * @implements {AfterViewChecked}
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit, OnChanges, AfterViewChecked {
  /**
   * Array with data for table rows and columns
   */
  @Input() data?: any[]
  /**
   * Columns definition (title, value property etc)
   */
  @Input() columnsDef?: ITableColumn[]

  @ViewChild(MatSort) set content(content: MatSort) {
    this.sort = content
    this.setSorting()
  }

  @ViewChild(MatPaginator) set paginatorContent(content: MatPaginator) {
    this.paginator = content
    this.setPagination()
  }

  private sort?: MatSort
  private paginator?: MatPaginator

  pageSize: number = 10
  dataSource: any = new MatTableDataSource()
  columns?: string[]
  currentSortColumn: string = ''
  currentSortDirection: TableSortDirection = ''
  currentPageIndex?: number = 0
  dataLength: number = 0

  constructor(private _cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataLength = this.data && this.data.length ? this.data.length : 0
  }

  ngAfterViewInit(): void {
    this.generateTable()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['data'] && !changes['data'].isFirstChange()) {
      this.dataLength = this.data && this.data.length ? this.data.length : 0
      this.generateTable()
    }
  }

  ngAfterViewChecked(): void {
    this._cd.detectChanges()
  }

  /**
   * The method that generates columns and data source for material table from provided data. It also activates / reset sorting and pagination
   */
  private generateTable(): void {
    const columns = []

    if (this.columnsDef) {
      for (const column of this.columnsDef) {
        columns.push(column.valueKey)
      }
    }

    this.setSorting()
    this.setPagination()
    this.columns = columns
    this.dataSource.data = this.data && this.data.length ? this.data : undefined
  }

  /**
   * The method that sets sorting. It binds template sorting component with dataset so Material table directive can do sorting of rows.
   */
  private setSorting(): void {
    if (this.dataSource && this.sort) {
      this.dataSource.sort = this.sort
    }
  }

  /**
   * The method that is called when sort event is triggered and sets pagination to first page.
   */
  sortChanged(): void {
    this.currentPageIndex = 0

    if (this.dataSource && this.dataSource.paginator) {
      this.dataSource.paginator.pageIndex = this.currentPageIndex
    }
  }

  /**
   * The method that prepares table for pagination and includes template element into material table data source so table is aware of length of the data.
   */
  private setPagination(): void {
    if (this.dataSource && this.paginator) {
      this.dataSource.paginator = this.paginator
    }
  }

  /**
   * The method that is triggered when table page is changed and sets current page index.
   */
  pageChanged(event: PageEvent): void {
    this.currentPageIndex = event.pageIndex
  }
}
