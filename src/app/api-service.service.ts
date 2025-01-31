import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private http: HttpClient) {}
  getProducts(url: string) {
    //use pipe and return only the latest request.
    return this.http.get(url);
  }
}
