import { environment } from '../environments/environment'

// better use object
export class UrlServices {
  projectConfiguration = {
    admin: {
      organizationId : '1',
      username: 'admin',
      authorizedModule: [],
      apiKey: '1'
    }
  }
  urls = {
    // NOTE: can assign baseConfigUrl to environment._API  
   baseConfigUrl: `http://localhost:8080/entityExtractionWeb/`,
   // baseConfigUrl: `${this._API}`,
    entity: {
      getAll:   'entity/getAll',
      create:   'entity/create' + '?organizationId=',
      delete:   'entity/delete' + '?organizationId=',
      getById:  'entity/fetch' + '?organizationId=',
      update :  'entity/update' + '?organizationId=',
    },
    trainingProfile:{
      getAll :  'trainingProfile/query' + '?organizationId=',
      create :  'trainingProfile/Create' + '?organizationId=',
      update :  'trainingProfile/update' +'?organizationId=',
      delete :  'trainingProfile/delete'+ '?organizationId='
    },
    doc_lang :{
      getAll : '/languageDetails/fetchAll'
    },
    doc_type:{
      getAll : '/Documenttype/fetchAll'
    },
    utterance:{
      getAll : 'entityUtterance/fetch' + '?organizationId=',
      create  : 'entityUtterance' + + '?organizationId=',
      delete : 'entityUtterance/delete' + '?organizationId='
    }
  };
}

