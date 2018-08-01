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
    this._API = environment._API + '/extractProfile'
  }

  fetchAllProfiles(organisationId: Number, id?: Number) {
    return this.http
      .get(`${this._API}?organizationId=${organisationId}${id ? `&extractProfileId=${id}` : ''}`, {
        headers: HeaderService.getAuthHeaders()
      })
  }

  fetchProfileById = (organisationId: Number, id: Number) => this.fetchAllProfiles(organisationId, id)

  createProfile(profile: any) {

  }

  saveProfile(profile: any) {

  }

  deleteProfile(organizationId: Number, extractProfileId: Number) {
    return this.http
      .delete(`${this._API}?organizationId=${organizationId}&extractProfileId=${extractProfileId}`,
      {
        headers: HeaderService.getAuthHeaders()
      })
  }

  
}
