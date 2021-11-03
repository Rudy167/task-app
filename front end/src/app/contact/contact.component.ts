import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {

  @ViewChild('content') content:Element;
  constructor() { }
  ngAfterViewInit(): void {
 

  }

  ngOnInit(): void {
   
  }

 

}
