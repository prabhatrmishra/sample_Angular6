import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'
import { HeaderService } from 'src/app/service/header.service';
import { Observable } from 'rxjs';


@Injectable()
export class ExtractService {
  private _API
  
  constructor(
    private http: HttpClient
  ) {
    this._API = environment._API
  }

  fetchAllProfiles(organisationId: Number) {
    console.log(HeaderService.getAuthHeaders())
    return this.http
      .get(`${this._API}/extractProfile/fetchAll?organizationId=${organisationId}`, {
        headers: HeaderService.getAuthHeaders()
      })
  }

  
}
