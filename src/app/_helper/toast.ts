import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class toastr {

    title = "";

    constructor(
        private toastr: ToastrService,
    ) { }

    success(message) {
        this.toastr.success(message, this.title, {
            timeOut: 5000,
            closeButton: true
        });
    }
    error(message) {
        this.toastr.error(message, this.title, {
            timeOut: 5000,
            closeButton: true
        });
    }
    info(message) {
        this.toastr.info(message, this.title, {
            timeOut: 5000,
            closeButton: true
        });
    }
    warning(message) {
        this.toastr.warning(message, this.title, {
            timeOut: 5000,
            closeButton: true
        });
    }
}