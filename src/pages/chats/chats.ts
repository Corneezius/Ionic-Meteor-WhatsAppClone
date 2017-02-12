import { Component, OnInit } from '@angular/core';
import { Chats, Messages } from 'api/collections';
import { Chat } from 'api/models';
// add observable to use stream of data for view
import { Observable } from 'rxjs';
// moment is an esssential package for data fabrication


@Component({
  templateUrl: 'chats.html'
})
export class ChatsPage implements OnInit {
  chats;

  constructor() {
  }

  ngOnInit() {
    this.chats = Chats
      .find({})
      .mergeMap((chats: Chat[]) =>
        Observable.combineLatest(
          ...chats.map((chat: Chat) =>
            Messages
              .find({chatId: chat._id})
              .startWith(null)
              .map(messages => {
                if (messages) chat.lastMessage = messages[0];
                return chat;
              })
          )
        )
      ).zone();
  }
  // removechat function that fires onclick,
  removeChat(chat: Chat): void {
    Chats.remove({_id: chat._id}).subscribe(() => {
    });
  }
}
