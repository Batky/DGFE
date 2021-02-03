import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {User} from '../../shared/models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'})
};

const httpStreamOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response',
  responseType: 'blob' as 'json'
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {
  }

  getCurrentUser(name: string, password: string): Promise<User> {
    //TODO: Hash the password
    let url: string = `/BookOfSouls/login?login=${name}&password=${password}`;
    return this.http.get<any>(url, httpOptions).toPromise();
  }
}
