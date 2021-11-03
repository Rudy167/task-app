import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ItemModel } from '../_models/item.model';
import { ItemsService } from '../_services/items.service';
import { AddItemModel, priority } from '../_models/add-item.model';
import { Validators, AbstractControl, FormBuilder, FormGroup, FormControl, Validator, FormsModule } from '@angular/forms';
import { Observable, Subject, Subscription, BehaviorSubject } from 'rxjs';
import { formatDate } from '@angular/common'
@Component({
  selector: 'app-items-list-item',
  templateUrl: './items-list-item.component.html',
  styleUrls: ['./items-list-item.component.css']
})
export class ItemsListItemComponent implements OnInit {
  itemForm: FormGroup;
   @Input() item: any;
  updateForm: FormGroup;
  isEditing: boolean;
  isChecked : boolean;
  isDisabled : boolean;
  counter: number =0;



  constructor(
    private itemsService: ItemsService,
    private router: Router,
    private fb : FormBuilder
  ) { }

  ngOnInit() {
  
    this.updateForm =this.fb.group({
      taskName: new FormControl(this.item ? this.item.taskName : ''),
      isTaskComplete: new FormControl(this.item  ? this.item.isTaskComplete : false),
      taskDescription: new FormControl(this.item ? this.item.taskDescription : ''),
      taskDeadline:this.item?.taskDeadline? formatDate(this.item.taskDeadline,'yyyy-MM-dd','en') : new Date(),
      taskPriority: new FormControl(this.item ? this.item.taskPriority : priority.Medium),
    });


    this.disable();
  
 
    
  }
  onclick(){
    this.isChecked=!this.isChecked;
  }

  edit() {
    this.isEditing=!this.isEditing;
   
    if(this.isEditing==false){
      this.disable();
      this.updateForm.patchValue({isTaskComplete : this.isChecked,taskPriority : this.item.taskPriority});
      this.itemsService.update(this.item.id,this.updateForm.value).subscribe();
      this.updateForm.controls['isTaskComplete'].disable();
    }
    else{
     this.enable();
    }
    
  }

  delete() {
    this.itemsService.delete(this.item.id).subscribe();
  }

 disable() {
    this.updateForm.disable();
  }
  
  enable() {
    this.updateForm.enable();
  }


  cardClick(){
  
    if((this.counter)%3==0)
    this.item.taskPriority=priority[0];
    else if((this.counter)%3==1){
      this.item.taskPriority=priority[1];
    }
    else if((this.counter)%3==2){
      this.item.taskPriority=priority[2];
    }
    console.log(this.item.taskPriority);
    this.counter++;
  }

}

