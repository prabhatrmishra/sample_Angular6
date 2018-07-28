import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ce-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() tag:string;
  @Output('remove') remove = new EventEmitter<boolean>();
  @ViewChild('input') input: ElementRef; 
  edit = false;
  isOverridden = Math.random() * 10 > 7;

  constructor() { }

  ngOnInit() {
  }

  editToggle() {
    if(this.edit) {
      this.edit = false;
    } else {
      this.edit = true;
      setTimeout(_ => {
        this.input.nativeElement.focus()
      }, 50);
    }
  }

  deleteTag() {
    this.remove.emit(true);
  }

}
