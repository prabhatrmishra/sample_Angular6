import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'ce-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {
  @Output('emittedTagValue') tagValue = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef;
 
  constructor() { }

  ngOnInit() {
  }

  addTag() {
    const tagValue =  this.input.nativeElement.value;
    if(tagValue !== '') {
      this.tagValue.emit(tagValue);
      this.input.nativeElement.value = '';
    }
  }
}
