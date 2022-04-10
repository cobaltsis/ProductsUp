import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatChipsModule } from '@angular/material/chips'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

import { HomeComponent } from '@home/home.component'
import { TableModule } from '@common/components/table/table.module'
import { HomeRoutingModule } from '@home/home-routing.module'
import { HomeService } from '@home/home.service'

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    TableModule,
    HomeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
  ],
  providers: [HomeService],
})
export class HomeModule {}
