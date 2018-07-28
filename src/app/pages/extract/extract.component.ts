import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { kit } from 'src/app/app.const';
import { ExtractService } from 'src/app/service/extract.service';

@Component({
  selector: 'ce-extract',
  templateUrl: './extract.component.html',
  styleUrls: ['./extract.component.scss'],
  providers: [ExtractService]
})
export class ExtractComponent implements OnInit {
  @ViewChild('filterInput') filterInput: ElementRef;
  profileForm: FormGroup;
  extractionProfiles: Array<any>;
  

  addNewTitle = 'Add New Profile';
  filter = '';
  showFilter = false;

  constructor(
    private formBuilder: FormBuilder,
    private extractService: ExtractService
  ) { }

  ngOnInit() {
    //this.getExtractProfiles()
  
    this.profileForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: ['', [Validators.required]],
      trainingProfile: ['Profile 1', [Validators.required]],
    })
  }

  getExtractProfiles() {
    this.extractService
      .fetchAllProfiles(1)
      .subscribe(
        (extractionProfile: Array<any>) => {
          this.extractionProfiles = extractionProfile
        },
        err => {
          console.log(err)
        }
      )
  }

  addNew() {
    this.addNewTitle = 'Add New Extraction Job';
    this.profileForm.reset();
    kit.modal("#add-profile").show();
  }

  editProfile(profile) {
    this.addNewTitle = `Edit Extraction Job`;
    this.profileForm.get('name').setValue(profile.name);
    this.profileForm.get('description').setValue(profile.description);
    this.profileForm.get('location').setValue(profile.locations[0]);
    this.profileForm.get('trainingProfile').setValue(profile.trainingProfile);
    kit.modal("#add-profile").show();
  }

  deleteProfile(profile) {
    this.extractionProfiles.splice(this.extractionProfiles.indexOf(profile), 1);
  }

  scanProfile(extractionProfile) {
    this.extractionProfiles[this.extractionProfiles.indexOf(extractionProfile)].scanStat = (Math.random() * 100);
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
