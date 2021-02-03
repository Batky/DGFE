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
    if (this.user === undefined || this.user === null) {
      return false;
    }
    if (this.user.allowedItems === undefined || this.user.allowedItems === null) {
      return false;
    }
    return this.user.allowedItems.root;
  }

  loginUser(credentials) {
    this.restService.getCurrentUser(credentials.name, credentials.password).then(data => {
      this.user = data;
      console.log(this.user);
      this.router.navigate(['/app']);
    });

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
