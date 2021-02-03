import {Component, HostBinding} from '@angular/core';
import {RegisterService} from './register.service';
import {LoginService} from '../login/login.service';
import {SuccessToastComponent} from '../ui-elements/notifications/toasts/suceess/success-toast.component';
import {ToastrService} from 'ngx-toastr';
import {ToastPosition} from '../ui-elements/notifications/toast-position.enum';
import {SuccessRegisterRequest} from '../ui-elements/notifications/toasts/suceessRegisterRequest/success-toast.component';

@Component({
  selector: 'app-login',
  templateUrl: './register.template.html'
})
export class RegisterComponent {
  @HostBinding('class') classes = 'auth-page app';

  loginName: string = '';
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    public loginService: LoginService,
    public registerService: RegisterService,
    private toastrService: ToastrService,
  ) {}

  public register() {
    const email = this.email;
    const password = this.password;
    const login = this.loginName;
    const name = this.name;

    if (!this.isPasswordValid()) {
      this.checkPassword();
    } else {
      this.registerService.registerUser({email, password, login, name});
      this.showSuccessMessage();
      this.registerService.navigateLogin();
      // this.registerService.registerError('Vaša žiadosť bola odoslaná prosím čakajte na potvrdzjúci email od administrátora.');
      // setTimeout(() => {
      //   this.registerService.registerError('');
      //   this.registerService.navigateLogin();
      // }, 3 * 1000);
    }
  }

  checkPassword() {
    if (!this.isPasswordValid()) {
      if (!this.password) {
        this.registerService.registerError('Heslo nemôže byť prázdne');
      } else {
        this.registerService.registerError('Heslo sa nezhoduje');
      }
      setTimeout(() => {
        this.registerService.registerError('');
      }, 3 * 1000);
    }
  }

  isPasswordValid() {
    return this.password && this.password === this.confirmPassword;
  }

  showSuccessMessage(): void {
    // event.preventDefault();
    this.toastrService.show(
      'Žiadosť o registráciu bola zaslaná. Váš administrátor Vám poskytne bližšie informácie.',
      null,
      {
        closeButton: false,
        positionClass: ToastPosition.topCenter,
        toastComponent: SuccessRegisterRequest,
        timeOut: 8000,
        tapToDismiss: false
      }
    );
  }
}
