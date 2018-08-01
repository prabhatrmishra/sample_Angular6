import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { kit } from 'src/app/app.const';
import { TrainProfileService } from './../../service/train.profile.service';
import { DataService } from './../../app.dataService';
import { ConstantService } from './../../constantService'
@Component({
  selector: 'ce-train-profile',
  templateUrl: './train-profile.component.html',
  styleUrls: ['./train-profile.component.scss'],
  providers: [TrainProfileService, DataService, ConstantService]
})
export class TrainProfileComponent implements OnInit {
  @ViewChild('filterInput') filterInput: ElementRef;
  trainingProfiles = [];
  choosedOption: String;    // whether edit or delete
  profile = {};

  addNewTitle = 'Add New Training Profile';
  filter: string;
  profileForm: FormGroup;
  showFilter = false;
  docLangList = [];
  docTypeList = [];
  constructor(
    private formBuilder: FormBuilder,
    private trainProfileService: TrainProfileService,
    private dataService: DataService,
    private constantService: ConstantService
  ) { }
  
  ngOnInit() {
    this.getTrainingProfiles();
    this.fetchDocLangTypes();
    this.profileForm = this.formBuilder.group({
      trainingProfileName: ['', [Validators.required]],
      trainingProfileDesc: ['', [Validators.required]],
      docTypeId: ['lease', [Validators.required]],
      langId: ['spanish', [Validators.required]],
    })
  }
  addNewCategory() {
    this.choosedOption = 'add';
    this.addNewTitle = 'Add New Configuration Category';
    this.profileForm.reset();
    kit.modal("#add-configuration-category").show();
  }
  editCategory(profile) {
    this.choosedOption = 'update';
    this.profile = profile;
    this.addNewTitle = `Edit Configuration Category`;
    this.profileForm.get('trainingProfileName').setValue(profile.trainingProfileName);
    this.profileForm.get('trainingProfileDesc').setValue(profile.trainingProfileDesc);
    this.profileForm.get('docTypeId').setValue(profile.docTypeId);
    this.profileForm.get('langId').setValue(profile.langId);
    kit.modal("#add-configuration-category").show();
  }
  deleteProfile(profile) {
      this.trainProfileService.deleteTrainingProfile((profile.trainingProfileId))
      .subscribe(data => {
      alert("Training porfile got deleted successfully.")
      this.trainingProfiles.splice(this.trainingProfiles.indexOf(profile), 1);
      },
      error => {
        console.log("Some error occured while deletiing training profile.")
      })
  }

  toggleFilter() {
    if (!this.showFilter) {
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
  getTrainingProfiles() {
    this.trainingProfiles = [];
    this.trainProfileService
      .fetchAllTrainingPorfiles(1)
      .subscribe(
      (profiles: Array<any>) => {
        this.trainingProfiles = profiles;
        console.log("Got training Profiles ---", this.trainingProfiles);
      },
      err => {
        console.log(err)
      }
      )
  }
  fetchDocLangTypes() {
    this.trainProfileService.getDocLang().subscribe(
      (docLangs: Array<any>) => {
      this.docLangList = docLangs;
      docLangs.forEach(element => {
      this.dataService.docLangMap[element.langId] = element.langName;
      });
    },
      err => {
        console.log(err)
      });

    this.trainProfileService.getDocTypes().subscribe(
      (langTypes: Array<any>) => {
        this.docTypeList = langTypes;
        langTypes.forEach(element => {
        this.dataService.docTypeMap[element.docTypeId] = element.docTypeName;

        })
      },
      err => {
        console.log(err)
      });
  }

  changeProfileLists() {
    if (this.choosedOption === 'add')
      this.saveTrainingProfile();
    else if (this.choosedOption === 'update')
      this.updateTrainingPorfile(this.profile);
  }
  saveTrainingProfile() {
    let profileJosn = this.formatTrainingProfileJson();
    if (this.warningChecking(profileJosn) === true) {
      this.trainProfileService.createTrainingProfile(this.formatTrainingProfileJson())
        .subscribe(data => {
          alert('Training Profile created successfully.');
          this.getTrainingProfiles();
        },
        err => {
          console.log(err)
        });
    }
    else {
      alert("Provide valid inputs.")
    }
  }
  updateTrainingPorfile(profile) {
    let profileJosn = this.formatTrainingProfileJson();
    if (this.warningChecking(profileJosn) === true) {
      this.trainProfileService.updateTrainingProfile(this.formatTrainingProfileJson(),
        Number(profile.trainingProfileId))
        .subscribe(
        data => {
          alert('Training profile updated successfully.');
          this.getTrainingProfiles();
        },
        error => {
          // alert('Some error occured while updating training Profile.');
        })
    }
    else {
      alert("Provide valid inputs.")
    }
  }
  formatTrainingProfileJson() {
    return {
      "trainingProfileName": this.profileForm.get('trainingProfileName').value,
      "trainingProfileDesc": this.profileForm.get('trainingProfileDesc').value,
      "docTypeId": this.profileForm.get('docTypeId').value,
      "langId": this.profileForm.get('langId').value,
      "isActive": "true",
      "trainingProfileJson": {},
    };
  }
  warningChecking(newProfile): boolean {
    let validFlag: boolean = true;
    var z1 = '^[0-9]*\d$';
    if (!this.constantService.validationRegexs.numberReg.test(newProfile.docTypeId)
      || !this.constantService.validationRegexs.numberReg.test(newProfile.langId)) {
      alert('Please provide valid document type and language type.');
      validFlag = false;
    }
    if (newProfile.trainingProfileName.trim() == ''
      || newProfile.docTypeId.trim() == ''
      || newProfile.langId.trim() == ''
    ) {
      validFlag = false;
    }
    return validFlag;
  }


}
