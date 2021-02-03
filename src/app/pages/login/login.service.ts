import {AppConfig} from '../../app.config';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Injectable} from '@angular/core';
import {RestService} from '../../utils/services/rest.service';
import {User} from '../../shared/models/user';

const jwt = new JwtHelperService();

@Injectable()
export class LoginService {
  config: any;
  _isFetching: boolean = false;
  _errorMessage: string = '';
  private user: User;

  constructor(
    appConfig: AppConfig,
    private http: HttpClient,
    private router: Router,
    private restService: RestService,
  ) {
    this.config = appConfig.getConfig();
  }

  get isFetching() {
    return this._isFetching;
  }

  set isFetching(val: boolean) {
    this._isFetching = val;
  }

  get errorMessage() {
    return this._errorMessage;
  }

  set errorMessage(val: string) {
    this._errorMessage = val;
  }

  isAuthenticated() {
    // const token = localStorage.getItem('token');
    // let data = null;
    //
    // // We check if app runs with backend mode
    // if (!this.config.isBackend && token) return true;
    // if (!token) return;
    // const date = new Date().getTime() / 1000;
    // try {
    //   data = jwt.decodeToken(token);
    // } catch(e) {
    //   this.router.navigate(['/login']);
    // }
    // if (!data) return;
    // return date < data.exp;
    return true;
  }

  loginUser(creds) {
    // this.restService.getCurrentUser(creds.name, creds.password).subscribe(
    //   (response) => {
    //     console.log('response received');
    //     // this.user = response;
    //     console.log(response);
    //   },
    //     (error) => {
    //     console.error('Request failed with error:');
    //     console.error(error);
    //     },
    //     () => {
    //       console.error('Request completed');
    //     });
    this.restService.getCurrentUser(creds.name, creds.password).then(data => {
      this.user = data;
      console.log(this.user);
    });
    // We check if app runs with backend mode
    // if (!this.config.isBackend) {
    //   this.receiveToken('token');
    // } else {
    //   this.requestLogin();
    //   if (creds.social) {
    //     // tslint:disable-next-line
    //     window.location.href = this.config.baseURLApi + '/user/signin/' + creds.social + (process.env.NODE_ENV === 'production' ? '?app=light-blue/angular' : '');
    //   } else if (creds.email.length > 0 && creds.password.length > 0) {
    //     this.http.post('/user/signin/local', creds).subscribe((res: any) => {
    //       const token = res.token;
    //       this.receiveToken(token);
    //     }, err => {
    //       this.loginError(err.response.data);
    //     });
    //
    //   } else {
    //     this.loginError('Something was wrong. Try again');
    //   }
    // }
  }

  receiveToken(token) {
    let user: any = {};
    // We check if app runs with backend mode
    if (this.config.isBackend) {
      user = jwt.decodeToken(token).user;
      delete user.id;
    } else {
      user = {
        email: this.config.auth.email
      };
    }

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.receiveLogin();
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.router.navigate(['/login']);
  }

  loginError(payload) {
    this.isFetching = false;
    this.errorMessage = payload;
  }

  receiveLogin() {
    this.isFetching = false;
    this.errorMessage = '';
    this.router.navigate(['/app/main/visits']);
  }

  requestLogin() {
    this.isFetching = true;
  }
}