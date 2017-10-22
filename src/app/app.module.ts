import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ConsignmentModule } from './consignment/consignment.module';
import { ConsignmentListComponent } from './consignment/consignment-list.component'
import { EditConsignmentComponent } from './consignment/edit-consignment.component'



const appRoutes: Routes = [
  { path: 'consignments', component: ConsignmentListComponent },
  { path: 'consignment-edit/:id', component: EditConsignmentComponent },
  { path: 'consignment-edit', component: EditConsignmentComponent },
  { path: 'consignment-edit', component: EditConsignmentComponent },
  { path: '', redirectTo: '/consignments', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ConsignmentModule,
    RouterModule.forRoot(appRoutes),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
