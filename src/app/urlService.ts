// no unnecessary white space -- hard to read
export class UrlServices {
  // note: better keep it in environment.ts, we can create seperate config for dev and prod
  projectConfiguration = {
    admin: {
      organizationId : '1',
      username: 'admin',
      authorizedModule: [],
      apiKey: '1'
    }
  }

  urls = {
    // TODO: change to localhost on local dev
    baseConfigUrl: 'http://172.17.89.16:8080/entityExtractionWeb/',
    entity: {
      getAll: 'entity/getAll',
      create: 'entity/create?organizationId=',
    },
    trainingProfile:{
      getAll : 'trainingProfile/query?organizationId='
    }
  };

}