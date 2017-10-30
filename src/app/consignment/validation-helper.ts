import {  FormGroup, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import {isNumeric} from "rxjs/util/isNumeric"


export function validDate(control:FormControl):{[key:string]:any}|null 
{
    const dateVal = control.value;
    
    return moment(dateVal, "DD/MM/YYYY",true).isValid()? 
        null: {   
                  invalidDate: true
              }
              

}

export function validateItemList(control:AbstractControl):{[key:string]:any}|null
{
  let retVal : {[key:string]:any}|null;

  let msgArr : {[key:number]:string[]}|null = null ;

  const itemList = control as FormArray;
    itemList.controls.forEach((grp:AbstractControl,index:number)=>{
        let itemGrp = grp as FormGroup;
        let teaType = itemGrp.get('teaType').value;
        
        let numContainers = itemGrp.get('noOfContainers').value;
        
        let wtPerContainer = itemGrp.get('weightPerContainerinKgs').value;

        let msgs:string[] = [];

        if(teaType === '')
        {
            msgs.push("Choose a tea type");
        }
        if(!numContainers)
        {
            msgs.push("Enter number of containers");
        }
        else if (!isNumeric(numContainers))
        {
            msgs.push("Number of Containers should be numeric");   
        }
        if(!wtPerContainer)
        {
            msgs.push("Enter weight per container::"+index);
        }
        else if (!isNumeric(wtPerContainer))
        {
            msgs.push("Weight per container should be numeric::"+index);   
        }
        if( msgs.length>0 )
        {
           if(!msgArr)
           {
            msgArr = {};
           }
           msgArr[index] = msgs;
        }
          
        });  
    if (msgArr)
    {
        retVal =  { errorMsgs : msgArr };
    }
    return retVal;
}
