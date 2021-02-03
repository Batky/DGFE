import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
// import {ItemStatusVerificationRequest} from '../models/item-status-verification-request';
// import {Item} from '../models/item';
// import {Count} from '../models/count';
// import {ErrorMessage} from '../models/error-message';
// import {ItemOverviewRequest} from '../models/item-overview-request';
// import {Page} from '../models/page';
// import {ApplicationParameter} from '../models/application-parameter';
// import {ItemStatusChange} from '../models/items-status-change';
import {User} from '../../shared/models/user';
import {Observable} from 'rxjs';
// import {ItemDetails} from '../models/item-details';
// import {MessageService} from 'primeng/api';
// import {Parameter} from '../models/parameter';
// import {DEFAULT_MESSAGE_LIFE} from '../constants';
// import { ToastrService } from 'ngx-toastr';

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

  // constructor(private toastr: ToastrService) {}

  // itemsCount(): Promise<Count> {
  //   return this.http.get<Count>('./api/items/count', httpOptions).toPromise();
  // }
  //
  // verifyItemStatus(request: ItemStatusVerificationRequest): Promise<Item> {
  //   return this.http.post<Item>('./api/items/verify-item-status', request, httpOptions).toPromise();
  // }
  //
  // getItemsOverview(request: ItemOverviewRequest): Promise<Page<Item>> {
  //   return this.http.post<Page<Item>>('./api/items/overview', request, httpOptions).toPromise();
  // }
  //
  // exportItemsOverview(request: ItemOverviewRequest): Promise<HttpResponse<Blob>> {
  //   // @ts-ignore
  //   return this.http.post<HttpResponse<Blob>>('./api/items/overview-export', request, httpStreamOptions).toPromise();
  // }
  //
  // getItemDetails(itemIdentifier: string): Promise<ItemDetails> {
  //   return this.http.get<ItemDetails>(`./api/items/${itemIdentifier}/details`, httpOptions).toPromise();
  // }
  //
  // exportItemDetails(itemIdentifier: string): Promise<HttpResponse<Blob>> {
  //   // @ts-ignore
  //   return this.http.get<HttpResponse<Blob>>(`./api/items/${itemIdentifier}/detail-export`, httpStreamOptions).toPromise();
  // }
  //
  // changeItemStatusesToNotAccepted(request: string[]): Promise<ItemStatusChange> {
  //   return this.http.post<ItemStatusChange>(`./api/items/not-accepted`, request, httpOptions).toPromise();
  // }
  //
  // getApplicationParameterByName(name: string): Promise<ApplicationParameter> {
  //   return this.http.get<ApplicationParameter>(`./api/application-parameters/${name}`, httpOptions).toPromise();
  // }
  //
  // getConfigurationProperties(): Promise<Parameter[]> {
  //   return this.http.get<Parameter[]>('./api/application-parameters/front-end', httpOptions).toPromise();
  // }
  //
  // logout(): Promise<any> {
  //   return this.http.post<any>('./api/logout', {}).toPromise();
  // }
  //
  getCurrentUser(name: string, password: string): Promise<any> {
    // httpOptions.headers.set('login', name);
    // httpOptions.headers.set('password', password);
    let url: string = `/BookOfSouls/login?login=${name}&password=${password}`;
    let testurl: string = '/BookOfSouls/login';
    // console.log(url);
    console.log(url);
    return this.http.get<any>(url, httpOptions).toPromise();
  }

  // downloadExcelFileByStreamResponse(response: HttpResponse<Blob>): void {
  //   const fileName = response.headers.get('content-disposition').split(';')[1]
  //     .split('filename')[1].split('=')[1].trim();
  //   const blob = new Blob([response.body],
  //     { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //   const url = window.URL.createObjectURL(blob);
  //   const anchor = document.createElement('a');
  //   anchor.download = fileName;
  //   anchor.href = url;
  //   anchor.click();
  // }
}
