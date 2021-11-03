import { Component, OnInit } from '@angular/core';
import { ItemModel } from './_models/item.model';
import { Observable, Subject,throwError, of , BehaviorSubject} from 'rxjs';
import { ItemsService } from './_services/items.service';
import { Router } from '@angular/router';
import { AddItemModel } from './_models/add-item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items$: BehaviorSubject<AddItemModel[]>;

  constructor(
    private itemsService: ItemsService,
    private router : Router
  ) { }

  ngOnInit() {
    this.items$  = this.itemsService.items$;
  }

  hasItems(items: AddItemModel[]): boolean {
    return items && items.length > 0 ? true : false;
  }
  onClick(){
    this.router.navigate(['/logout']);
  }

}
