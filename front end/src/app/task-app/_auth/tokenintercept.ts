import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';



import { AuthService } from './services/auth.service';
import { ItemsService } from '../items/_services/items.service';

@Injectable()
export class TokenIntercept implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private itemService :  ItemsService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.startsWith(environment['apiBaseUrl'] + '/v1') ) {
            const token    = this.authService.getToken();
            const headers    = {};
            console.dir(token);
    
        
            if (token !== null) {
                headers['Authorization']    = 'Bearer ' + token;
            }
            console.log(JSON.stringify(headers));
            const modified = request.clone(
                {
                    setHeaders: headers,
                }
            );
            return next.handle(modified);
        } else {
            return next.handle(request);
        }
    }
}