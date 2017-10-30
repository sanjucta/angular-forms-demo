import { Component, OnInit } from '@angular/core';
import { Consignment } from './consignment';
import { FormBuilder, FormGroup, FormArray, Validators,FormControl,AbstractControl } from '@angular/forms';
import * as moment from 'moment';
import { validDate,validateItemList } from './validation-helper';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsignmentService } from '../services/consignment.service';
import 'rxjs/add/operator/debounceTime';

@Component({
  templateUrl: './edit-consignment.component.html',
  styleUrls: ['./edit-consignment.component.css']
})

export class EditConsignmentComponent implements OnInit {

    consignmentForm :FormGroup;

    teaTypes = ['Oolong','Assam Black','Orange Pekoe','Darjeeling Black','Darjeeling White'];

    itemsInvalidMsg = {};

    controlErrorLabels = {
        consignmentNo : 'Consignment Number',
        receivedDate : 'Received Date',
        sender : 'Sender'
    }  
    
    constructor(private fb: FormBuilder,private consignmentService:ConsignmentService,private route: ActivatedRoute,private router:Router)
    {
      this.createForm();
    }
  
    createForm() {
        this.consignmentForm = this.fb.group({
        id:[],
        sender:['',Validators.required],
        consignmentNo:['',Validators.required],
        receivedDate:['',[Validators.required,validDate]],
        transportMode:["rail"],
        vehicleReg:[''],
        items:this.fb.array([this.createItem()])
        });
    
        this.addVehicleRegValidations();
        this.addItemListValidations();      
  }
  
  addVehicleRegValidations()
  {
      this.consignmentForm.get("transportMode").valueChanges.subscribe( (transMode:string ) =>{
      if(transMode === 'road')
      {
        this.consignmentForm.get("vehicleReg").setValidators([Validators.required]);
      }else if (transMode === 'rail')
      {
        this.consignmentForm.get("vehicleReg").clearValidators();
      }
      this.consignmentForm.get("vehicleReg").markAsTouched();
      this.consignmentForm.get("vehicleReg").updateValueAndValidity();
     });
      
  }

  addItemListValidations()
  {
    this.consignmentForm.get('items').setValidators([validateItemList]);
    this.consignmentForm.get('items').valueChanges.debounceTime(2000).subscribe((val)=>{this.updateValidationDisplayForItems()});
  }

  ngOnInit() 
  {
    
    this.route.params.subscribe( params => {
        
        if( params["id"] !=null)
        {
          this.consignmentService.getConsignment(params["id"]).subscribe(consignment=>{
            this.updateForm(consignment);
          })          
        }

      } )                
   
  }
    
  updateForm(consignment:Consignment)
  {
     
    let itemCtrls:AbstractControl[] =  [];
     if(consignment.items)
     {
        consignment.items.forEach(item => {
          itemCtrls.push(this.createItem());
        });
     }
     this.consignmentForm.removeControl('items');
     this.consignmentForm.setControl('items',this.fb.array(itemCtrls));
     this.consignmentForm.setValue(consignment);
     this.addItemListValidations();
  }

  shouldShowError(formControlName:string)
  {
    if (this.consignmentForm.get(formControlName).errors 
    && this.consignmentForm.get(formControlName).touched )
      return true;
  }

  showError(formControlName:string)
  {
    let errMsg:string = "";
    let label = "";
    
    if (this.consignmentForm.get(formControlName).errors && this.consignmentForm.get(formControlName).touched)
    {
      const errKeys = Object.keys(this.consignmentForm.get(formControlName).errors);
      errKeys.forEach(errorKey => {
        
        errMsg += " " + this.getMsg(errorKey,this.controlErrorLabels[formControlName]);
           
      });
    }

    return errMsg;
  }

  getMsg(key:string,label:string)
    {
      let errorMsgs = {
            required : `${label} is required`,
            invalidDate : `Please enter a valid date`
        }
      return errorMsgs[key];  
    }

 
  createItem(): FormGroup {
    let itemGrp:FormGroup =  this.fb.group({
      teaType: '',
      noOfContainers: [],
      weightPerContainerinKgs: [],
      totalItemWeight :[{value:"",disabled:true}]
    });
       
    itemGrp.get('noOfContainers').valueChanges.subscribe(this.updateTotalWeight.bind(this,itemGrp));
    itemGrp.get('weightPerContainerinKgs').valueChanges.subscribe(this.updateTotalWeight.bind(this,itemGrp));
    itemGrp.statusChanges.subscribe(val=>{ this.itemsInvalidMsg = {}});

    return itemGrp;
  }

  updateTotalWeight(itemGrp:FormGroup)
  {
    let numC = itemGrp.get('noOfContainers').value;
    let wtPerC = itemGrp.get('weightPerContainerinKgs').value;
    if(numC && wtPerC)
    {
      itemGrp.get('totalItemWeight').setValue(this.roundTo2Decs(Number(numC) * Number(wtPerC))) ;
    }
  }

  roundTo2Decs(num:Number):Number
  {
    return Math.round(num.valueOf()*100)/100;
  }

  addItem(){

    this.updateValidationDisplayForItems();
    if (Object.keys(this.itemsInvalidMsg).length === 0)
    {
      let itemArr : FormArray = this.consignmentForm.get("items") as FormArray; 
      itemArr.push(this.createItem());
    }
    
  }

  updateValidationDisplayForItems()
  {
     this.itemsInvalidMsg = {};
     if(this.consignmentForm.get('items').hasError('errorMsgs'))
     {
          
        const msgMap = this.consignmentForm.get('items').errors["errorMsgs"] ;
     
        for(const key in msgMap)
        {
          this.itemsInvalidMsg[key]= msgMap[key];
        }
     }
 
  }

  deleteItem(i){
    let itemArr : FormArray = this.consignmentForm.get("items") as FormArray;
    itemArr.removeAt(i);

  }

  onSubmit()
  {
      console.log(this.consignmentForm.value);
  }

  onCancel()
  {
      this.router.navigateByUrl("/consignments");
  }

}
