import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { kit } from 'src/app/app.const';

@Component({
  selector: 'ce-inspect-landing',
  templateUrl: './inspect-landing.component.html',
  styleUrls: ['./inspect-landing.component.scss']
})
export class InspectLandingComponent implements OnInit {
  @ViewChild('filterInput') filterInput:ElementRef; 
  contracts = [
    "Munich_HeadOffice_Lease_Contract.pdf   -  Extraction completed",
    "Munich_Downtown_Office_Lease_Contract.pdf   -  Extraction completed",
    "Munich_Office2_Lease_Contract.pdf   -  Extraction completed",
    "Berlin_Main_Office_Lease_Contract.pdf - Extraction completed",
    "Berlin_Factory_Premise_Lease_Contract.pdf - Extraction completed",
    "Berlin_Workshop_Lease_Contract.pdf - Extraction completed",
    "Berlin_Office2_Lease_Contract.pdf - Extraction completed",
    "Hamburg_Main_Office_Lease_Contract.pdf - Extraction completed",
    "Hamburg_Factory_Premise_Lease_Contract.pdf - 20%",
    "Hamburg_Workshop_Lease_Contract.pdf - Not Started",
    "Hamburg_Office2_Lease_Contract.pdf - Not Started",
    "Stuttgart_Main_Office_Lease_Contract.pdf - Not Started",
    "Stuttgart_Factory_Premise_Lease_Contract.pdf - Not Started",
    "Stuttgart_Workshop_Lease_Contract.pdf - Not Started",
    "Frankfurt_Main_Office_Lease_Contract.pdf - Not Started",
    "Frankfurt_Factory_Premise_Lease_Contract.pdf - Not Started",
    "Frankfurt_Workshop_Lease_Contract.pdf - Not Started",
  ]

  extractedFiles = this.contracts.map((contract, i) => {
    const contractVal = contract.split('-');
    const [name, progress] = [
      contractVal[0].trim(),
      contractVal[1].trim()
    ]
    return {
      id: i,
      name: name,
      path: `//path/to/${name}`,
      extracted: progress.match('%') ? parseInt(progress.split('%')[0]) : progress,
      status: ['Correction in progress', 'Auto'][Math.round((Math.random() * 10) % 1)],
      lastUpdated: new Date().getTime(),
      updated: 'self',
      entities: ['lesser', 'lessee']
    }
  });

  extractProfiles = [
    "Property Leases Germany",
    "Equipment Leases Germany",
    "Property Leases UK",
    "Equipment Leases UK",
    "Property Leases France",
    "Equipment Leases France",
  ];

  blockDisplay = false;
  filter: string;
  addNewTitle: string;
  saving = false;
  showFilter = false;

  constructor(
    private formBuider: FormBuilder,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  profileChange() {
    this.blockDisplay = true;
    setTimeout(_ => {
      this.blockDisplay = false;
    }, 1500)
  }

  toggleFilter() {
    if(!this.showFilter) {
      this.showFilter = true;
      setTimeout(_ => {
        try {
          this.filterInput.nativeElement.focus();
        } catch (e) {
          // console.log(e);
        }
      }, 500)
    } else {
      this.showFilter = false;
      this.filterInput.nativeElement.value = '';
      this.filter = '';
    }
  }
}
