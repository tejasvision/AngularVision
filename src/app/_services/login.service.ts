import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetMethodData } from '../_helper/Common';

@Injectable({ providedIn: 'root' })
export class loginService {

    constructor(private http: HttpClient) {
    }

    userLogin(body) {
        try {
            return this.http.post<any>(environment.apiUrl + '/UserLogin', body)
                .pipe(map(data => {
                    let res = JSON.parse(JSON.stringify(data));
                    if (res.STATUS == 1) {
                        localStorage.setItem('Vision_User', JSON.stringify(res.DATA));
                    }
                    return res;
                }));
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }

    sidebarMenu(body) {
        try {
            return this.http.get<any>(environment.apiUrl + '/SidebarMenu' + GetMethodData(body))
                .pipe(map(data => {
                    let res = JSON.parse(JSON.stringify(data));
                    if (res.STATUS == 1) {
                        localStorage.setItem('Vision_SideMenu', JSON.stringify(res.DATA));
                    }
                    return res;
                }));
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
}