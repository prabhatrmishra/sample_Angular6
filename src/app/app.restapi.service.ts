import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {UrlServices} from './urlService'


@Injectable()
export class RestApiService {
  headers: Headers = null;
  productStatData: any = {};

  constructor(
    private _http: Http,
    private urlServices: UrlServices
  ) { }

  getHeader(): Headers {
    if (this.headers === null) {
      this.headers = new Headers({
        "content-type": "application/json",
        'api-key': this.urlServices.projectConfiguration.admin,
        "cache-control": "no-cache",
      });
    }
    return this.headers;
  }

  doCreate(entityObject: any): Observable<any> {
    const headers: Headers = this.getHeader();
    let _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.entity.create
    console.log(_url);
    return this._http.post(_url, entityObject, { headers })
      .map((res: Response) => {
        if (res != null) {
          return [{ status: res.status, json: res.json() }]
        }
      })
  }


  
doUpdate(entityObject: any): Observable<any> {
    const headers: Headers = this.getHeader();
    let _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.entity.create
    console.log(_url);
    return this._http.post(_url, entityObject, { headers })
      .map((res: Response) => {
        if (res != null) {
          return [{ status: res.status, json: res.json() }]
        }
      })
  }

  doFetch(entityObject: any): Observable<any> {
    const headers: Headers = this.getHeader();
    let _url = this.urlServices.urls.baseConfigUrl + this.urlServices.urls.entity.create
    console.log(_url);
    return this._http.post(_url, entityObject, { headers })
      .map((res: Response) => {
        if (res != null) {
          return [{ status: res.status, json: res.json() }]
        }
      })
  }
}

