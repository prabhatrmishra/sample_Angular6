import { Component, OnInit, OnDestroy } from '@angular/core';
import { DragulaService, dragula } from 'ng2-dragula/ng2-dragula';
import { kit } from 'src/app/app.const';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainEntityService } from './train-entity.service'
import { constantService } from './../../constantService'

@Component({
  selector: 'ce-train-entity',
  templateUrl: './train-entity.component.html',
  styleUrls: ['./train-entity.component.scss'],
  providers: [TrainEntityService, constantService]
})
export class TrainEntityComponent implements OnInit, OnDestroy {

  trainingProfiles = [
    {
      id: 1,
      name: 'Operating Leases',
      description: ' Operating Leases executed by the company with rental company ',
      docType: ['Lease','Rental'][0],
      lang: ['Spanish','English','Japneese'][1]
    },
    {
      id: 2,
      name: 'Invoices',
      description: 'Invoice documents',
      docType: ['Invoice','Rental'][0],
      lang: ['Spanish','English','Japneese'][1]
    }
  ]
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
        {
          example: 'is leased by XXX',
          value: 'v1'
        },
        {
          example: 'XXX has leased XXX',
          value: 'v1'
        }
      ],
      synonyms: [`syn ${i}`, `syn ${i + 1}`],
      regex: '/*.*/i'
    }
  });
  profileEntities = [];
  utterances = [];
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
  }
    ;
  constructor(
    private formBuider: FormBuilder,
    private dragulaService: DragulaService,
    private trainEntityService: TrainEntityService,
    private ConstantService: constantService
  ) { }

  ngOnInit() {
    console.log("In trainEntityComponent init -------")
    this.entityForm = this.formBuider.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      synonyms: ['', [Validators.required]],
      regex: ['', [Validators.required]]
    });

    this.populateTrainingPorfiles();

    this.utteranceForm = this.formBuider.group({
      utterance: ['', [Validators.required]],
      value: ['', [Validators.required]]
    })

  }

  ngOnDestroy() {
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
    this.addNewTitle = 'Add New Data Attributes';
    this.entityForm.reset();
    this.utterances = [];
    kit.modal("#add-entity").show();
  }

  editEntity(entity) {
    this.addNewTitle = `Edit Data Attributes`
    this.entityForm.get('name').setValue('Lessee Party');
    this.entityForm.get('description').setValue('The legal entity which is leasing the interested item');
    this.entityForm.get('synonyms').setValue(entity.synonyms.join(';'));
    this.entityForm.get('regex').setValue('');
    this.utterances = [
      ['This agreement is made between ABC Inc hereinafter referred to as Lessee and XYZ Inc hereinafter referred to as on 12th of November 2017', 'ABC Inc'],
      ['THIS EQUIPMENT LEASE ("Lease") is made and effective 12th of November 2017, by and between ABC Inc, ("Lessor") and XYZ Inc ("Lessee").', 'ABC Inc']
    ]

    kit.modal("#add-entity").show();
  }

  deleteEntity(entitiy) {
    this.definedEntities.splice(this.definedEntities.indexOf(entitiy), 1);
  }

  addUtterance() {
    this.utterances.push([
      this.utteranceForm.get('utterance').value,
      this.utteranceForm.get('value').value
    ]);
    this.utteranceForm.reset();
  }

  clearProfile() {
    this.profileEntities = [];
  }

  populateTrainingPorfiles(){
    this.trainEntityService
        .getTrainingProfiles()
        .subscribe( 
        data =>{
          console.log("I am getting data .....");
          console.log(data);
          if(data[0].status == 200){
            alert("Training profiles fetched Susccessfully.");
            console.log(data);
          }
          else{
            alert("Some error occured while fetching data.");
          }
      },
      error =>{
          alert("Some error occured at server side ")
      }
    )
  }

  saveEntity() {
    console.log("Save me ...")
    console.log(this.utterances);
    let newEntity = this.formatEntityCreateJson();
    console.log(JSON.stringify(newEntity));
    this.trainEntityService
      .createEntity(newEntity)
      .subscribe(
      data => {
        console.log(data);
        if (data[0].status == 200) {
          alert("Entity created successfully !!");
        }
        else {
          alert("Some error occured while creating entity")
        }
      },
      err => {
        alert("Some error occured at server side !!")
      },
      () => { }
      )
  }

  // NOTE: already checking with Validators,
  warningChecking(newEntity): boolean {
    let validFlag: boolean = true;
    var z1 = '^[0-9]*\d$';
    newEntity.utterancesList.map(element => {
      if (element.utterance.trim() == ''
        || element.entityValue.trim() == '') {
        alert("Utterances and its values should not be empty . ")
        validFlag = false;
      }
    });
    if (newEntity.entityName.trim() == ''
      || newEntity.entityDesc.trim() == ''
      || newEntity.entityRegex.trim() == '') {
      validFlag = false;
    }
    return validFlag;
  }

  //NOTE: use maps,its optimised   
  formatEntityCreateJson() {
    let utteranceListJson = [];
    this.utterances.map(utter =>
      utteranceListJson.push({
        "utterance": utter[0],
        "entityValue": utter[1]
      }))

    // no extra-obj for return; consumes mem; more @ ImmutableJS 
    return {
      "entityName": this.entityForm.get('name').value,
      "entityDesc": this.entityForm.get('description').value,
      "entityRegex": [this.entityForm.get('regex').value],
      "entitySynonyms": null,
      "trainingProfileId": 1,
      "isActive": "true",
      "utterancesList": utteranceListJson
    };
  }


}
