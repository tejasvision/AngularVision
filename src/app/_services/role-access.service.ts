import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../_models/Role';
import { GetMethodData } from '../_helper/Common';
import { apiService } from '../../app/_services/api.service'

@Injectable({ providedIn: 'root' })
export class roleaccessService {

    constructor(
        private http: HttpClient,
        private api: apiService
    ) {
    }

    roleAccessSave(body) {

        return this.api.Post('/RoleAccessSave', body);

        // try {
        //     return this.http.post<any>(environment.apiUrl + '/RoleAccessSave', body)
        //         .pipe(map(data => {
        //             let res = JSON.parse(JSON.stringify(data));
        //             return res;
        //         }));
        // }
        // catch (error) {
        //     console.log(error);
        //     return error;
        // }
    }

    getRoleAccess(body) {

        return this.api.Get('/RoleAccess', body);

        // try {
        //     return this.http.get<any>(environment.apiUrl + '/RoleAccess' + GetMethodData(body))
        //         .pipe(map(data => {
        //             let res = JSON.parse(JSON.stringify(data));
        //             return res;
        //         }));
        // }
        // catch (error) {
        //     console.log(error);
        //     return error;
        // }
    }

}