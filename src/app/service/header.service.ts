import { HttpHeaders } from '@angular/common/http';

export class HeaderService {
    static getAuthHeaders(): HttpHeaders {
        // TODO: fetch and apply api key 
        return new HttpHeaders({
            'api_key': '1'
        });
    }
}