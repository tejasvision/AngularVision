import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class userService {

    constructor(private http: HttpClient) {
    }

    GetUserList() {
        try {
            return this.http.get<any>(environment.apiUrl + '/UserManage', {})
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

    UserSave(body) {
        try {
            return this.http.post<any>(environment.apiUrl + '/UserSave', body)
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