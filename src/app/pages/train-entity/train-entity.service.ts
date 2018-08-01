import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {UrlServices} from './../../urlService'
import { HttpErrorHandler, HandleError } from './../../http.error-handler.service';
import {response} from './../../Response.interface'
import { map, tap,  } from 'rxjs/operators'
import {ResponseOptions, Response} from '@angular/http';


@Injectable()
export class TrainEntityService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler,
    private urlServices: UrlServices,
    //private res: Response
  ) {
    this.handleError = httpErrorHandler.createHandleError('TrainEntityService');
  }
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "cache-control": "no-cache",
      'api_key': this.urlServices.projectConfiguration.admin.apiKey,
    })
  };
  

  getTrainingProfiles (): Observable<response> {
    const _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.trainingProfile.getAll 
    + this.urlServices.projectConfiguration.admin.organizationId;
    return this.http.get<response>(_url,this.httpOptions)
      .pipe(
        tap((data) => {
          console.log(data);
        catchError(this.handleError('getTrainingProfiles ::-', []))
        }))
  }


  createEntity (entityObject: any): Observable<any> {
    const _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.trainingProfile.getAll 
    + this.urlServices.projectConfiguration.admin.organizationId;
    return this.http.post(_url,entityObject,this.httpOptions)
      .pipe(
        catchError(this.handleError('create new entity ::-', []))
      );
  }
}
