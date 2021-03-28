import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item, ListOfItems } from '../constant/home/home';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  getUserList(): Observable<Item[]> {
    return this.http.get("assets/user.json").pipe(
      map((data:Item[]) => {
        data.map(d => d.isValid = false);
        return data
      })
    );
  }
}