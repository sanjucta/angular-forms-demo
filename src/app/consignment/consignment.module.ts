import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsignmentListComponent } from './consignment-list.component'
import { EditConsignmentComponent } from './edit-consignment.component'
import  {HttpClientModule } from '@angular/common/http';
import { ConsignmentService } from '../services/consignment.service'
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  declarations: [ ConsignmentListComponent , EditConsignmentComponent ],
  providers:[ ConsignmentService ],
  
})

export class ConsignmentModule { }
