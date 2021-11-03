import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError, of, BehaviorSubject } from 'rxjs';
import { map, mergeMap, switchMap, catchError, tap } from 'rxjs/operators';

import { ItemModel } from '../_models/item.model';
import { AddItemModel } from '../_models/add-item.model';
import { UpdateItemModel } from '../_models/update-item.model';
import { priority } from '../_models/add-item.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  // create a BehaviourSubject Observable with type ItemModel[] and default value []
  items$ = new BehaviorSubject<AddItemModel[]>([]);

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  clear(): void {
    this.items$.next([]);
  }

  getAll(): AddItemModel[] {
    return this.items$.getValue();
  }

  get(id: number): AddItemModel {
    const currentItems: AddItemModel[] = this.getAll();
    if (currentItems.length === 0) {
      return null;
    }

    const index1 = currentItems.findIndex((element) => {
      return element.id === id;
    });
    return (index1 >= 0 && currentItems[index1]) ? currentItems[index1] : null;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment['apiBaseUrl'] + '/v1/tasks/delete/' + id, { observe: 'response' })
      .pipe(
        map(data => {
          return (data.status == 204) ? true : false;
        }
        ),
        tap((success) => {
          if (success) { this.deleteItem(id); }
          else {
            this.router.navigateByUrl('/error');
          }
        }), // when success, delete the item from the local service
        catchError((err) => {
          return of(false);
        }),
      );
  }

  fetchItem(id: number): Observable<any> {
    return this.http.get(environment['apiBaseUrl'] + '/api/item/' + id)
      .pipe(
        map(data => {
          return (data['success'] && data['success'] === true) ? data['result'] : false;
        }
        ),
        catchError((err) => {
          return of(false);
        }),
      );
  }

  update(id: number, payload: UpdateItemModel): Observable<any> {
    console.log(JSON.stringify(payload));
    return this.http.put(environment['apiBaseUrl'] + '/v1/tasks/update/' + id, payload)
      .pipe(
        map(responseData => {
          return (responseData['success'] && responseData['success'] === true) ? responseData['result'] : false;
        }
        ),
        tap(item => { if (item) { this.updateItem(id, item); } else {
          this.router.navigateByUrl('/error');
        } }), // when success result, update the item in the local service
        catchError(err => {
          return of(false);
        }),
      );
  }

  add(payload: AddItemModel): Observable<any> {
    const data = JSON.parse(localStorage.getItem('usermeta'));
    payload.taskCreatedBy = data.id;
    console.log(JSON.stringify(payload) + "payload");
    return this.http.post(environment['apiBaseUrl'] + '/v1/tasks/create', payload, { observe: 'response' })
      .pipe(
        map(responseData => {
          console.log(responseData);
          return (responseData.status == 201) ? responseData.body : false;
        }
        ),
        tap((item: any) => {
          if (item) { this.addItem(item); }
          else {
            this.router.navigateByUrl('/error');
          }
        }), // when success, add the item to the local service
        catchError(err => {
          return of(false);
        }),
      );
  }

  deleteItem(id: number): boolean {
    const currentItems: AddItemModel[] = this.getAll();
    if (currentItems.length > 0) {
      const index1 = currentItems.findIndex((element) => {
        return element.id === id;
      });
      if (index1 >= 0) {
        currentItems.splice(index1, 1);
        this.items$.next(currentItems);
        return true;
      }
    }
    return false;
  }

  addItem(item: AddItemModel): void {
    let currentItems: any = this.getAll();
    currentItems.push(item);
    console.log(currentItems);
    currentItems.sort((a, b) => {
      if (a == null)
        return 1;
      if (b == null)
        return -1;

      if (a.taskPriority == 'High')
        return -1;
      else if (b.taskPriority == 'High') {
        return 1;
      }
      else if (a.taskPriority == 'Low') {
        return 1;
      }
      else if (b.taskPriority == 'Low') {
        return -1;
      }
      else {
        return 0;
      }
    });
    console.log(currentItems);
    this.items$.next(currentItems);
  }

  updateItem(id: number, item: AddItemModel): boolean {
    const currentItems: AddItemModel[] = this.getAll();
    if (currentItems.length > 0) {
      const index1 = currentItems.findIndex((element) => {
        return element.id === id;
      });
      if (index1 >= 0) {
        currentItems[index1] = item;
        this.items$.next(currentItems);
        return true;
      }
    }
    return false;
  }

  fetch(): Observable<any> {

    this.clear();

    return this.http.get(environment['apiBaseUrl'] + '/v1/tasks/readAll', { observe: 'response' })
      .pipe(
        map(data => {

          return (data.status == 200) ? data.body : false;
        }
        ),
        tap((items: any) => { if (items) { this.items$.next(items); } }),
        catchError(err => {
          return of(false);
        }),
      );
  }

}
