import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-each-project',
  templateUrl: './each-project.component.html',
  styleUrls: ['./each-project.component.css']
})
export class EachProjectComponent implements OnInit {

 @Input('Input') input :any;
 
 @Input('Index') index :number;



  constructor() { }

  ngOnInit(): void {
    console.log(this.input);
    if(!this.input.image){
      this.input.image= `https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`;
     }
    if(! this.input.content){
      this.input.content= `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.`
    }
    if(! this.input.heading){
      this.input.heading= `The Coldest Sunset`;
     }
     if(this.input.tags.length==0){
      this.input.tags.push("#angular");
      this.input.tags.push("#html");
      this.input.tags.push("#css");
     }
  }

}
