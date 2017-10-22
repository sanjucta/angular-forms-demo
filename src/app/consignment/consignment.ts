import {Item} from "../item/item";

export interface Consignment
{
    id:number;
    sender:string;
    consignmentNo:string;
    receivedDate:string;
    transportMode:string;
    vehicleReg:string;
    items:Item[];
  
}