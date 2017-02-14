import { NgModule, ErrorHandler } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ChatsPage } from '../pages/chats/chats';
import { PhoneService } from '../services/phone';
import { LoginPage } from '../pages/login/login';
import { MessagesPage } from '../pages/messages/messages';
import { MyApp } from './app.component';
import { VerificationPage } from '../pages/verification/verification';
import { ProfilePage } from '../pages/profile/profile';

@NgModule({
  declarations: [
    MyApp,
     ChatsPage,
     MessagesPage,
     LoginPage,
     VerificationPage,
     ProfilePage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    MessagesPage,
    LoginPage,
    VerificationPage,
    ProfilePage

  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  PhoneService
]
})
export class AppModule {}
