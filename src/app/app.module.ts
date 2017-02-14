import { NgModule, ErrorHandler } from '@angular/core';
import { MomentModule } from 'angular2-moment';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { ChatsPage } from '../pages/chats/chats';
import { PhoneService } from '../services/phone';
import { MessagesPage } from '../pages/messages/messages';
import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
     ChatsPage,
     MessagesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatsPage,
    MessagesPage

  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
  PhoneService
]
})
export class AppModule {}
