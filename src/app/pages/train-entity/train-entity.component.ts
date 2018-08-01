import { Component, OnInit, OnDestroy } from '@angular/core';
import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';
import { kit } from 'src/app/app.const';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainEntityService } from './train-entity.service';
import { TrainProfileService } from './../../service/train.profile.service'
import { ConstantService } from './../../constantService';
import { RouterModule, Routes, ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'ce-train-entity',
  templateUrl: './train-entity.component.html',
  styleUrls: ['./train-entity.component.scss'],
  providers: [TrainProfileService, TrainEntityService, ConstantService]
})
export class TrainEntityComponent implements OnInit {
  private selectedTrainingProfileId: String;
  private selectedTrainingProfile: {
    trainingProfileId: null
  };
  choosedOption: String;    // whether edit or delete
  private sub: any;
  utterances = [];
  trainingProfiles = [];
  utterancesList = [];
  entityUtteranceMap = {};
  private entites = [
    'Lease Type',
    'Contract type',
    'Asset ID',
    'Asset Address',
    'Lessor party',
    'Lessee party',
    'Start date',
    'End date',
    'Lease term in months'
  ]
  definedEntities = this.entites.map((entity, i) => {
    return {
      id: i,
      name: entity,
      desc: `descriptyion of ${entity}`,
      utterances: [
      ],
      synonyms: [`syn ${i}`, `syn ${i + 1}`],
      regex: '/*.*/i'
    }
  });
  profileEntities = [];
  filter: string;
  addNewTitle: string;
  entityForm: FormGroup;
  utteranceForm: FormGroup;
  trainPercent = 0;
  saving = false;
  name: string;
  newEntity = {
    "entityDesc": "",
    "entityId": "",
    "entityName": "",
    "entityRegex": "",
    "entitySynonyms": "",
    "isActive": "string",
    "trainingProfileId": "string",
  };

  entity = {};
  constructor(
    private formBuider: FormBuilder,
    private dragulaService: DragulaService,
    private trainEntityService: TrainEntityService,
    private constantService: ConstantService,
    private trainProfileService: TrainProfileService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
          this.selectedTrainingProfileId = params['profile'];
        });
        this.fetchEntitiesByTrainingId();
        this.fetchUtterances();
        this.entityForm = this.formBuider.group({
          entityName: ['', [Validators.required]],
          entityDesc: ['', [Validators.required]],
          entitySynonyms: ['', [Validators.required]],
          entityRegex: ['', [Validators.required]]
        });
        this.populateTrainingPorfiles();
        this.utteranceForm = this.formBuider.group({
          utterance: ['', [Validators.required]],
          entityValue: ['', [Validators.required]]
        })
  }
 
  changeEntitiesList() {
    if (this.choosedOption === 'add')
      this.saveEntity();
    else if (this.choosedOption === 'update')
      this.updateEntity(this.entity);
  }

  fetchEntitiesByTrainingId() {
    this.profileEntities = [];
    this.trainProfileService.getEntitiesByTrainingId(this.selectedTrainingProfileId)
      .subscribe((entities: Array<any>) => {
        this.definedEntities = entities;
      },
      err => {
        alert("Some error occured while fetching entitties")
      })
  }

  deleteUtterance(utterance) {
    this.utterances.splice(this.utterances.indexOf(utterance), 1)
    if(utterance.entityUtteranceId != undefined 
      && (utterance.entityUtteranceId != null))
    this.trainProfileService.deleteUtterance(utterance.entityUtteranceId)
    .subscribe(data=>{
      alert("Deleted successfully ");
    })
  } 

  startTraining() {
    this.trainPercent = 1;
    const trainer = setInterval(_ => {
      this.trainPercent++;
      if (this.trainPercent === 100) {
        clearInterval(trainer);
      }
    }, 3000)
  }

  addNewEntity() {
    this.choosedOption = 'add';
    this.addNewTitle = 'Add New Data Attributes';
    this.entityForm.reset();
    this.utterances = [];
    kit.modal("#add-entity").show();
  }

  editEntity(entity) {
    this.choosedOption = 'update';
    this.entity = entity;
    this.utterances = this.entityUtteranceMap[entity.entityId];
    this.addNewTitle = `Edit Data Attributes`
    this.entityForm.get('entityName').setValue(entity.entityName);
    this.entityForm.get('entityDesc').setValue(entity.entityDesc);
    this.entityForm.get('entityRegex').setValue(entity.entityRegex);
    //this.entityForm.get('entitySynonyms').setValue(entity.get('entitySynonyms'));
    kit.modal("#add-entity").show();
  }

  updateEntity(entity) {
    let entityJson = this.formatEntityUpdateJson();
    if (this.warningChecking(entityJson) === true) {
      this.trainProfileService.updateEntityObject(this.formatEntityUpdateJson(), 
      Number(entity.entityId))
      .subscribe(
      data=>{
        this.createUtterances(entity);
        alert("Entity updated successfully.");
        this.loadData();
      },
      err=>{
        alert("Some error occured while updating entity.");
      })
    }
    else {
      alert("Provide valid inputs.");
    }
}
  
  deleteEntity(entity) {
    this.trainProfileService.deleteEntity(Number(entity.entityId))
      .subscribe(
      data => {
        alert("Entity deleted successfully");
        this.definedEntities.splice(this.definedEntities.indexOf(entity), 1);
      },
      err => {
        alert("Some error occured while deleting entity.")
      })
  }
/* 
  addUtterance() {
    let utter = this.utteranceForm.get('utterance').value;
    let val = this.utteranceForm.get('entityValue').value;
    if(utter.indexOf(val) < 0){
      alert("Value which you have entered is not in utterance");
    }
    else{
      this.utterances.push([
        this.utteranceForm.get('utterance').value,
        this.utteranceForm.get('entityValue').value
      ]);
      this.utteranceForm.reset();
    }
  } */

  
  addUtterance(){
   // this.utterances = [];
    let utter = this.utteranceForm.get('utterance').value;
    let val = this.utteranceForm.get('entityValue').value;
    if(utter.indexOf(val) < 0){
      alert("Value which you have entered is not in utterance");
    }
    else{
      this.utterances.push({
        'utterance': utter,
        'entityValue': val,
        "startValue" : String(utter.utterance.indexOf(utter.entityValue)) + 1,
        "endValue" : String(utter.utterance.indexOf(utter.entityValue) +
                     String(utter.utterance.indexOf(utter.entityValue)).length +1) ,
      });
      this.utteranceForm.reset();
    }
  }


  clearProfile(event) {
    this.fetchEntitiesByTrainingId();
  }

  populateTrainingPorfiles() {
    this.trainProfileService
      .fetchAllTrainingPorfiles(1)
      .subscribe(profiles => {
        this.trainingProfiles = profiles;
        this.trainingProfiles.forEach(profile => {
          if (this.selectedTrainingProfileId === profile.trainingProfileId) {
            this.selectedTrainingProfile = profile;
          }
        })
      },
      error => {
        alert("Some error occured at server side ")
      })
  }
  saveEntity() {
    let newEntity = this.formatEntityCreateJson();
    console.log(JSON.stringify(newEntity));
    this.trainProfileService
      .createEntity(newEntity)
      .subscribe(
      data => {
        console.log(data);
        alert("Entity created successfully !!");
        this.loadData();
      },
      err => {
        alert("Some error occured at server side !!")
      })
  }

  warningChecking(newEntity): boolean {
      let validFlag: boolean = true;
      if(newEntity.utterancesList != undefined && newEntity.utterancesList != null  )
      newEntity.utterancesList.map(element => {
        if (element.utterance.trim() == ''
          || element.entityValue.trim() == '') {
          alert("Utterances and its values should not be empty . ")
          validFlag = false;
        }
      });
      if (newEntity.entityName.trim() == ''
        || newEntity.entityDesc.trim() == ''
       ) {
        validFlag = false;
      }
      return validFlag;
  }
 
  formatEntityCreateJson() {
      let utteranceListJson = [];
      this.utterances.map(utter =>
        utteranceListJson.push({
          "utterance": utter.utterance,
          "entityValue": utter.entityValue,
          "startValue" : String(utter.utterance.indexOf(utter.entityValue)) + 1,
          "endValue" : String(utter.utterance.indexOf(utter.entityValue) +
                       String(utter.utterance.indexOf(utter.entityValue)).length +1) ,
        }))
      return {
        "entityName": this.entityForm.get('entityName').value,
        "entityDesc": this.entityForm.get('entityDesc').value,
        "entityRegex": [this.entityForm.get('entityRegex').value],
        "entitySynonyms": null,
        "trainingProfileId": this.selectedTrainingProfileId,
        "isActive": "true",
        "utterancesList": utteranceListJson
      };
  }
 
  formatEntityUpdateJson() {
    return {
      "entityName": this.entityForm.get('entityName').value,
      "entityDesc": this.entityForm.get('entityDesc').value,
      "entityRegex": [this.entityForm.get('entityRegex').value],
      "entitySynonyms": null,
      "trainingProfileId": this.selectedTrainingProfileId,
      "isActive": "true"
    };
}

  fetchUtterances(){
    this.trainProfileService.getAllUtterances()
    .subscribe(
    (utterances : Array<any>) =>{
      this.utterancesList = utterances;
      this.utterancesList.forEach(utter =>{
        if(this.entityUtteranceMap[utter.entityId] == null){
          this.entityUtteranceMap[utter.entityId] = new Array<any>();
          this.entityUtteranceMap[utter.entityId].push(utter);
        }
        else
            this.entityUtteranceMap[utter.entityId].push(utter);
        })
    })
  }

  createUtterances(entity){
      let postUtteranceList = this.makeUtteranceJSON(entity);
      console.log("postUtteranceList -------------------->", postUtteranceList);
      this.trainProfileService.createUtterance(postUtteranceList)
      .subscribe(
        data =>{
          console.log("Utterances created successfully .");
        }
      )
  }
   
  // second way to make utterance List
  makeUtteranceJSON2(entity){
      let postUtteranceList = [];
      this.utterances.forEach(utter=>{
          if(!(utter.entityUtteranceId == undefined 
            && utter.entityUtteranceId == null )){
              postUtteranceList.push(utter);
            }
      })
      return postUtteranceList;
  }

  makeUtteranceJSON(entity){
    let postUtteranceList = this.utterances;
    let o_utterancesList = this.entityUtteranceMap[entity.entityId] ;
    console.log("o_utterancesList --------------->" , o_utterancesList);
    console.log("postUtteranceList --------------->" , postUtteranceList);
    this.utterancesList.forEach(element1 => {
      let flag =0;
      o_utterancesList.forEach(element2 =>{
          if(element1.entityUtteranceId === element2.entityUtteranceId){
            flag = 1;
         }
      })
      if(flag === 1){
        postUtteranceList = this.removeDuplicateElement(postUtteranceList,element1);
      }
    });
    return postUtteranceList;
  } 

  /* 
  makeUtteranceJSON(entity){
    let postUtteranceList = this.utterances;
    let o_utterancesList = this.entityUtteranceMap[entity.entityId] ;
    console.log("o_utterancesList --------------->" , o_utterancesList);
    console.log("postUtteranceList --------------->" , postUtteranceList);
    o_utterancesList.forEach(element1 => {
      let flag =false;
      this.utterancesList.forEach(element2 =>{
          if(element1.entityUtteranceId === element2.entityUtteranceId){
            flag = true;
         }
      })
      if(flag === false){
        postUtteranceList = this.removeDuplicateElement(postUtteranceList,element1);
      }
    });
    return postUtteranceList;
  }  */

  removeDuplicateElement(postUtteranceList , element){
      let resultList = [];
      postUtteranceList.array.forEach(ele => {
        if(ele.entityUtteranceId != element.entityUtteranceId){
          resultList.push(ele);
        }
      });
      return resultList;
  }
  loadData(){
    this.fetchEntitiesByTrainingId();
    this.fetchUtterances();
    this.utterances = [];
  }
}
