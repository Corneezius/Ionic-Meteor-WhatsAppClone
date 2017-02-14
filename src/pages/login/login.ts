import { Component } from '@angular/core';
import { Alert, AlertController, NavController } from 'ionic-angular';
import { PhoneService } from '../../services/phone';
import { VerificationPage } from '../verification/verification';


@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private phone = '';

  constructor(
    private alertCtrl: AlertController,
    private phoneService: PhoneService,
    private navCtrl: NavController
  ) {}

  onInputKeypress({keyCode}: KeyboardEvent): void {
    if (keyCode === 13) {
      this.login();
    }
  }

// once we press the login button, the login method is called and shows an alert dialog to confirm the action
  login(phone: string = this.phone): void {
    const alert = this.alertCtrl.create({
      title: 'Confirm',
      message: `Would you like to proceed with the phone number ${phone}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.handleLogin(alert);
            return false;
          }
        }
      ]
    });

    alert.present();
  }
// If an error has occurred, the handlerError method is called and shows an alert dialog with the received error
  handleLogin(alert: Alert): void {
    alert.dismiss().then(() => {
      return this.phoneService.verify(this.phone);

    })
    // anytime login, promoted to verification page right after
    .then(() => {
      this.navCtrl.push(VerificationPage, {
        phone: this.phone
      });
    })
    .catch((e) => {
      this.handleError(e);
    });
  }

  handleError(e: Error): void {
    console.error(e);

    const alert = this.alertCtrl.create({
      title: 'Oops!',
      message: e.message,
      buttons: ['OK']
    });

    alert.present();
  }
}
