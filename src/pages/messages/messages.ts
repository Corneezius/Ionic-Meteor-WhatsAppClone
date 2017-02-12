import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Chat } from 'api/models';

@Component({
  selector: 'messages-page',
  template: `Messages Page`
})
export class MessagesPage implements OnInit {
  selectedChat: Chat;

// simple service which gives you access to a key-value storage
  constructor(navParams: NavParams) {
    this.selectedChat = <Chat>navParams.get('chat');

    console.log('Selected chat is: ', this.selectedChat);
  }

  ngOnInit() {

  }
}