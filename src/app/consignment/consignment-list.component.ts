import { Component, OnInit } from '@angular/core';
import { Consignment } from './consignment';
import { Http } from '@angular/http'
import { Item } from '../item/item';
import * as _ from 'lodash';
import { ConsignmentService } from '../services/consignment.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consignment-list',
  templateUrl: './consignment-list.component.html',
  styleUrls: ['./consignment-list.component.css']
})
export class ConsignmentListComponent implements OnInit {
 
  consignments: Consignment[];
  
  constructor(private consignmentService:ConsignmentService) { }

  ngOnInit() {
      this.consignmentService.getConsignments().subscribe(data =>{
      this.consignments = data;
    })
  }

  computeTotalWeight(consignment:Consignment)
  {
    return _.reduce(consignment.items,(sum,item:Item)=>{
      return sum+=(item.noOfContainers*item.weightPerContainerinKgs)
    },0)
  } 

}
