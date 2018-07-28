import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { kit } from 'src/app/app.const';
import {TrainProfileService} from './../../service/train.profile.service'
@Component({
  selector: 'ce-train-profile',
  templateUrl: './train-profile.component.html',
  styleUrls: ['./train-profile.component.scss'],
  providers: [TrainProfileService]
})
export class TrainProfileComponent implements OnInit {
  @ViewChild('filterInput') filterInput: ElementRef;
  trainingProfiles = [
     {
      trainingProfileId: '1',
      trainingProfileName: 'Operating Leases',
      trainingProfileDesc: ' Operating Leases executed by the company with rental company ',
      docTypeId: ['Lease','Rental'][0],
      langId: ['Spanish','English','Japneese'][1]
    },
    {
      trainingProfileId: '2',
      trainingProfileName: 'Invoices',
      trainingProfileDesc: 'Invoice documents',
      docTypeId: ['Invoice','Rental'][0],
      langId: ['Spanish','English','Japneese'][1]
    } 
  ]
  addNewTitle = 'Add New Training Profile';
  filter: string;
  profileForm: FormGroup;
  showFilter = false;
  docLangList = [];
  docTypeList = [];
  constructor(
    private formBuilder: FormBuilder,
    private trainProfileService: TrainProfileService
  ) { }

  ngOnInit() {
    console.log("I am in TrainProfileComponent init ........................");
   // this.getTrainingProfiles();
  //  this.fetchDocLangTypes();
    this.profileForm = this.formBuilder.group({
      trainingProfileName: ['', [Validators.required]],
      trainingProfileDesc: ['', [Validators.required]],
      docTypeId: ['lease', [Validators.required]],
      langId: ['spanish', [Validators.required]],
    }) 
  }

  addNewCategory() {
    this.addNewTitle = 'Add New Configuration Category';
    this.profileForm.reset();
    kit.modal("#add-configuration-category").show();
  }

  editCategory(profile) {
    this.addNewTitle = `Edit Configuration Category`;    
    this.profileForm.get('trainingProfileName').setValue(profile.trainingProfileName);
    this.profileForm.get('trainingProfileDesc').setValue(profile.trainingProfileDesc);
    this.profileForm.get('docTypeId').setValue(profile.docTypeId);
    this.profileForm.get('langId').setValue(profile.langId);
    kit.modal("#add-configuration-category").show();
  }

  deleteProfile(profile) {
    this.trainingProfiles.splice(this.trainingProfiles.indexOf(profile), 1);
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

  
  getTrainingProfiles() {
    this.trainProfileService
      .fetchAllTrainingPorfiles(1)
      .subscribe(
        (profiles: Array<any>) => {
          this.trainingProfiles = profiles;
          console.log("Got training Profiles ---",this.trainingProfiles);
        },
        err => {
          console.log(err)
        }
      )
   
  }

  fetchDocLangTypes(){
    this.trainProfileService.getDocLang().subscribe( 
      (docLangs : Array<any>) =>{
        this.docLangList = docLangs;
        console.log("docLangs ------------>",docLangs);
    },
    err => {
      console.log(err)
    });

    console.log("Doc Languages fetched ------> ",  this.docLangList)
    this.trainProfileService.getDocTypes().subscribe( 
      (langTypes : Array<any>) =>{
        this.docTypeList = langTypes;
    },
      
    err => {
        console.log(err)
      });
      console.log("Doc types fetched ------> ",  this.docTypeList);
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

    
}

