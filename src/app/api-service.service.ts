import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}
  getProducts(url$: Observable<string>): Observable<any> {
    console.log('changed url::', url$);
    return url$.pipe(
      switchMap((newUrl) => {
        console.log(newUrl);
        return this.http.get(newUrl);
      })
    );
  }
}
