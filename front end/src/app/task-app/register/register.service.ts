import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {





  async register({ name, email, password }): Promise<any> {


    // create the payload data for the api request
    const loginData = {
      'name': name,
      'email': email,
      'password': password
    };

    const data = await this.http.post(environment['apiBaseUrl'] + '/v1/auth/register', loginData,{observe:'response'}).toPromise();
    // console.log(data);
    // // this part only gets executed when the promise is resolved
    // return Promise.reject("error occured, try after some time");
    // if (data.status != 201) {
    //   return Promise.reject("error occured, try after some time");
    // }
    // else {
    //   return Promise.resolve(data);

    // }
    return data;
  }
  // setDataAfterLogin(data: any) {
  //   throw new Error('Method not implemented.');
  // }



  constructor(private http: HttpClient) { }
}
