import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  typewriter_display: string = "";   
  animate;
  hover:number=0;

 typewriter_text : string = `Wanna meet over a coffee? hit me at akdhotay@gmail.com/+91 8237899185`; 

 
  constructor() { }

  ngOnInit(): void {
   // this.typingCallback(this);
  }

  typingCallback(that) {
   
    let total_length = that.typewriter_text.length;
    let current_length = that.typewriter_display.length;
    if (current_length < total_length) {
      that.typewriter_display += that.typewriter_text[current_length];
     this.animate=setTimeout(that.typingCallback, 125, that);
    } 
    if(total_length ==current_length)
    {
      this.typingCallback = function(){}; 
    

    }
  }
  clear(){
    

    // clearTimeout(this.animate);

    // this.typingCallback = function(){}; 
  
   
  }

}
