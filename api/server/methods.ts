
import { Chats } from './collections/chats';
import { Messages } from './collections/messages';
import { MessageType, Profile } from './models';
import { check, Match } from 'meteor/check';

const nonEmptyString = Match.Where((str) => {
  check(str, String);
  return str.length > 0;
});

Meteor.methods({
  // ensure user is logged in
  updateProfile(profile: Profile): void {
    if (!this.userId) throw new Meteor.Error('unauthorized',
      'User must be logged-in to create a new chat');

    check(profile, {
      name: nonEmptyString
    });

    Meteor.users.update(this.userId, {
      $set: {profile}
    });
  },
  // add a restriction in the addMessage method to see if a user is logged in,
  addMessage(type: MessageType, chatId: string, content: string) {
  // add a restriction in the addMessage method to see if a user is logged in,
    if (!this.userId) throw new Meteor.Error('unauthorized',
      'User must be logged-in to create a new chat');
   check(type, Match.OneOf(String, [ MessageType.TEXT ]));
   check(chatId, nonEmptyString);
   check(content, nonEmptyString);

  const chatExists = !!Chats.collection.find(chatId).count();

   if (!chatExists) {
     throw new Meteor.Error('chat-not-exists',
       'Chat doesn\'t exist');
   }
 // and we will bind its ID to the created message
  return {
        messageId: Messages.collection.insert({
        chatId: chatId,
        senderId: this.userId,
        content: content,
        createdAt: new Date(),
        type: type
      })
    };
  }
});
