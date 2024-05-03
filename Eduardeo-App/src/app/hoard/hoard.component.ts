import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-hoard',
  templateUrl: './hoard.component.html',
  styleUrl: './hoard.component.css'
})
export class HoardComponent {
  constructor(private el:ElementRef) { }

  ngOnInit(){
    console.log('height---' + this.el.nativeElement.offsetHeight);  //<<<===here
    console.log('width---' + this.el.nativeElement.offsetWidth);    //<<<===here
  }

}
