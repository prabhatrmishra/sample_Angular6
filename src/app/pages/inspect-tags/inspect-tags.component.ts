import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ce-inspect-tags',
  templateUrl: './inspect-tags.component.html',
  styleUrls: ['./inspect-tags.component.scss']
})
export class InspectTagsComponent implements OnInit {
  entityValues = [
    "Lease Type - Commercial Property Lease",
    "Contract type - Fixed Price",
    "Asset ID - 0AC553354",
    "Asset Address - Potsdamer Platz 1, 10785 Berlin ",
    "Lessor party - XYZ Inc",
    "Lessee party - ABC Inc",
    "Start date - 01/01/2015",
    "End date  - 30/12/2018",
    "Lease term in months - 36"
  ]

  tags: Array<Array<any>> = this.entityValues.map((ev, i) => {
    const [label, prop] = ev.split('-');
    return [
      label.trim(),
      [...prop.trim().split(',')]
    ]
  });

  constructor() { }

  ngOnInit() {
  }

  addTag($event, tag) {
    this.tags[this.tags.indexOf(tag)][1].push($event);
  }

  remove(removeTag: Boolean, tag, value) {
    console.log(removeTag, tag, value);
    if (removeTag) {      
      this.tags[
        this.tags.indexOf(
          tag
        )
      ][1].splice(this.tags[
        this.tags.indexOf(
          tag
        )
      ][1].indexOf(value), 1);
    }
  }
}
