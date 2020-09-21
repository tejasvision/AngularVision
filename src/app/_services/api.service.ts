import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GetMethodData } from '../_helper/Common';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class apiService {

    constructor(private http: HttpClient) {
    }

    Post(method, body) {
        try {
            return this.http.post<any>(environment.apiUrl + method, body)
                .pipe(map(data => {
                    debugger
                    let res = JSON.parse(JSON.stringify(data));
                    return res;
                }));
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    Get(method, body): Observable<any> {
        try {
            return this.http.get<any>(environment.apiUrl + method + GetMethodData(body))
                .pipe(map(data => {
                    let res = JSON.parse(JSON.stringify(data));
                    return res;
                }));
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}