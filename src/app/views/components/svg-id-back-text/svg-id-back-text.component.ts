import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[app-svg-id-back-text]',
  templateUrl: './svg-id-back-text.component.html',
  styleUrls: ['./svg-id-back-text.component.css']
})
export class SvgIdBackTextComponent implements OnInit {

  @Input() text!: string;
  @Input() type!: string;
  @Input() class = 'st100';
  @Input() y = 270.5;


  constructor() { }

  ngOnInit(): void {
    console.log('y',this.y);
    
  
  }

}
