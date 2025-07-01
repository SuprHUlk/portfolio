import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  send(form: any): Observable<boolean> {
    return this.http.post<any>('https://api.web3forms.com/submit', form).pipe(
      map((data: any) => {
        return data.success;
      })
    );
  }
}
