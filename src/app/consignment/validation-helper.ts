import {  FormGroup, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function validDate(control:FormControl)
{
    const dateVal = control.value;
    
    return moment(dateVal, "DD/MM/YYYY",true).isValid()? 
        null: {   
                  validDate: { valid: false }
              }
}

export function validateItemList(control:AbstractControl):{[key:string]:any}|null
{
  let retVal : {[key:string]:any}|null;

  const itemList = control as FormArray;
    itemList.controls.forEach((grp:AbstractControl)=>{
        let itemGrp = grp as FormGroup;
        let teaType = itemGrp.get('teaType').value;
        
        let numContainers = itemGrp.get('noOfContainers').value;
        
        let wtPerContainer = itemGrp.get('weightPerContainerinKgs').value;
        if (teaType === '' || !numContainers || !wtPerContainer)
        {
         
          let msgs:string[] = [];
          if(teaType === '')
          {
             msgs.push("Choose a tea type for each consignment item");
          }
          if(!numContainers)
          {
             msgs.push("Enter weight per container for each consignment item");
          }
          if(!wtPerContainer)
          {
             msgs.push("Enter number of containers for each consignment item");
          }
          retVal =  { errorMsgs : msgs };
        }
    });  
    
    return retVal;
}
