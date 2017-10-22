
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import * as Rx from "rxjs/Rx";
import { Consignment } from '../consignment/consignment';


@Injectable()
export class ConsignmentService {
  constructor(private http: HttpClient) { }
  
  getConsignments() {
    return this.http.get<Consignment[]>('app/data/consignment-list.json');

  }

  getConsignment(id:number)
  {
      
   return this.getConsignments().map(consList => consList.filter(cons => cons.id == id)[0]);
   
  }
}


