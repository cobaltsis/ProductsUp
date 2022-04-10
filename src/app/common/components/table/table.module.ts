import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { MatPaginatorModule } from '@angular/material/paginator'

import { TableComponent } from '@common/components/table/table.component'

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, MatTableModule, MatSortModule, MatPaginatorModule],
  exports: [TableComponent],
})
export class TableModule {}
