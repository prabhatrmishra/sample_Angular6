import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'
import { HeaderService } from 'src/app/service/header.service';
import { Observable } from 'rxjs';


@Injectable()
export class TrainProfileService {
  private _API
  
  constructor(
    private http: HttpClient
  ) {
    this._API = environment._API
  }

  
  

  getDocLang (): Observable<any> {
    return this.http.get(`${this._API}/languageDetails/fetchAll`, {
        headers: HeaderService.getAuthHeaders()
      })
  }


  getDocTypes (): Observable<any> {
    return this.http.get(`${this._API}/Documenttype/fetchAll`, {
        headers: HeaderService.getAuthHeaders()
      })
  }

  

  fetchAllTrainingPorfiles(organizationId: Number) {
    console.log(HeaderService.getAuthHeaders())
    return this.http
      .get(`${this._API}/trainingProfile/fetchAll?organizationId=${organizationId}`, {
        headers: HeaderService.getAuthHeaders()
      })
  }
}
