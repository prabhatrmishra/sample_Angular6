import { HttpHeaders } from '@angular/common/http';

export class HeaderService {
    static getAuthHeaders(): HttpHeaders {
        // TODO: fetch and apply api key 
        return new HttpHeaders({
            'Content-Type':  'application/json',
            'api_key': '1'
        });
    }
}