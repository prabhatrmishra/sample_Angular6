import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { HeaderService } from 'src/app/service/header.service';
import { Observable } from 'rxjs';
import { UrlServices } from './../urlService'
import { map, tap, } from 'rxjs/operators'
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from './../http.error-handler.service';

@Injectable()
export class TrainProfileService {
  private _API;
  private handleError: HandleError;
  
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler,
    private urlServices: UrlServices
  ) {
    this.handleError = httpErrorHandler.createHandleError('TrainEntityService');
    this._API = environment._API
  }
  
  getDocLang(): Observable<any> {
    return this.http.get(`${this._API}/languageDetails/fetchAll`, {
    headers: HeaderService.getAuthHeaders()
    })
  }
  
  getDocTypes(): Observable<any> {
    return this.http.get(`${this._API}/Documenttype/fetchAll`, {
    headers: HeaderService.getAuthHeaders()
    })
  }
  fetchAllTrainingPorfiles(organizationId: Number): Observable<any> {
    console.log(HeaderService.getAuthHeaders())
    return this.http
    .get(`${this._API}/trainingProfile/query?organizationId=${organizationId}&isActive=true`, {
    headers: HeaderService.getAuthHeaders()
    })
  }

  createTrainingProfile(profileObject: any): Observable<any> {
    console.log(profileObject);
    const _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.trainingProfile.create
    + this.urlServices.projectConfiguration.admin.organizationId;
    return this.http.post(_url, profileObject, 
    { headers: HeaderService.getAuthHeaders() })
    .pipe(
    catchError(this.handleError('create new Training profile ::-', []))
    );
  }
  
  
  updateTrainingProfile(profileObject: any, trainingProfileId): Observable<any> {
    const _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.trainingProfile.update
    + this.urlServices.projectConfiguration.admin.organizationId + '&trainingProfileId=' + trainingProfileId;
    return this.http.put(_url, profileObject, 
    { headers: HeaderService.getAuthHeaders() })
    .pipe(
    catchError(this.handleError('Update training profile ::-', []))
    );
  }
  
  
  deleteTrainingProfile(trainingProfileId): Observable<any> {
    const _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.trainingProfile.delete
    + this.urlServices.projectConfiguration.admin.organizationId + '&trainingProfileId=' + String(trainingProfileId);
    return this.http.delete(_url, {
    headers: HeaderService.getAuthHeaders()
    })
    .pipe(
    catchError(this.handleError('delete Training Profile ::-', []))
    )
  }

  getEntitiesByTrainingId(trainingProfileId: any): Observable<any> {
    const _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.entity.getById
    + this.urlServices.projectConfiguration.admin.organizationId + '&trainingProfileId='
    + trainingProfileId + '&isActive=true';
    console.log(_url);
    return this.http.get(_url, 
    { headers: HeaderService.getAuthHeaders() })
    .pipe(
    catchError(this.handleError('create new entity ::-', []))
    );
  }
  
  
  createEntity(entityObject: any): Observable<any> {
    const _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.entity.create
    + this.urlServices.projectConfiguration.admin.organizationId;
    return this.http.post(_url, entityObject,
    { headers: HeaderService.getAuthHeaders() })
    .pipe(
    catchError(this.handleError('create new entity ::-', []))
    );
  }
  
  deleteEntity(entityId): Observable<any> {
    const _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.entity.delete
    + this.urlServices.projectConfiguration.admin.organizationId + '&entityId=' + entityId;
    return this.http.delete(_url, {
    headers: HeaderService.getAuthHeaders()
    })
    .pipe(
    catchError(this.handleError('delete Entity  ::-', []))
    )
  }


  getAllUtterances():Observable<any>{
    const _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.utterance.getAll
    + this.urlServices.projectConfiguration.admin.organizationId ;
    return this.http.get(_url, {
    headers: HeaderService.getAuthHeaders()
    })
    .pipe(
    catchError(this.handleError('Get Utterances  ::-', []))
    )
  }

  updateEntityObject(entityObject : any, entityId):Observable<any>{
    console.log(JSON.stringify(entityObject));
    const _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.entity.update
    + this.urlServices.projectConfiguration.admin.organizationId + '&entityId=' +entityId;
    return this.http.put(_url, entityObject,
    { headers: HeaderService.getAuthHeaders() })
    .pipe(
      catchError(this.handleError('Update  entity ::-', []))
    );
  }

  createUtterance(utteranceList: any): Observable<any> {
    const _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.utterance.create
    + this.urlServices.projectConfiguration.admin.organizationId;
    return this.http.post(_url, utteranceList,
    { headers: HeaderService.getAuthHeaders() })
    .pipe(
    catchError(this.handleError('create new utterance ::-', []))
    );
  }

  deleteUtterance(entityUtteranceId): Observable<any> {
    const _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.utterance.delete
    + this.urlServices.projectConfiguration.admin.organizationId + '&entityUtteranceId=' + entityUtteranceId;
    return this.http.delete(_url, {
    headers: HeaderService.getAuthHeaders()
    })
    .pipe(
    catchError(this.handleError('delete Entity  ::-', []))
    )
  }
}
