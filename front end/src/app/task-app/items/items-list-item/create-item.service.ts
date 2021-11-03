import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AddItemModel } from '../_models/add-item.model';

@Injectable({
  providedIn: 'root'
})
export class CreateItemService {

  async createItem(data: AddItemModel) {

    const result = await this.http.post(environment['apiBaseUrl'] + '/v1/tasks/create', data, { observe: 'response' }).toPromise();

    return result;

  }
  constructor(private http: HttpClient) { }
}
