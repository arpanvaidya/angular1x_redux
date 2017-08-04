import moment from 'moment';
import { uuid } from '../src/app/chat/shared/utilities/util';
import { setCurrentUser } from '../src/app/chat/shared/users/users.actions';
import {
  addThread,
  addMessage,
  getMessagesRequest,
  selectThread
} from '../src/app/chat/shared/threads/threads.actions';
import _ from 'lodash';

export /*@ngInject*/ function createSampleData($ngRedux, $stateParams) {

  /**
   * Users
   */
  const nate = {
    id: uuid(),
    isClient: true, // <-- notice we're specifying the client as this User
    name: 'eigenjoy'
  };
  const ari = {
    id: uuid(),
    name: 'auser'
  };
  const lukas = {
    id: uuid(),
    name: 'simpulton'
  };
  const houssein = {
    id: uuid(),
    name: 'houssein'
  };
  const todd = {
    id: uuid(),
    name: 'toddmotto'
  };

  const users = [nate, ari, lukas, houssein, todd];

  /**
   * Threads
   */
  const angularThread = {
    id: uuid(),
    name: 'angular',
    type: 'channel',
    unreadCount: 0
  };
  const graphQLThread = {
    id: uuid(),
    name: 'graphql',
    type: 'channel',
    unreadCount: 0
  };
  const materialThread = {
    id: uuid(),
    name: 'material',
    type: 'channel',
    unreadCount: 0
  };
  const friendsThread = {
    id: uuid(),
    name: 'friends',
    type: 'channel',
    unreadCount: 1
  };
  const cliThread = {
    id: uuid(),
    name: 'angular-cli',
    type: 'channel',
    unreadCount: 0
  };
  const protractorThread = {
    id: uuid(),
    name: 'protractor',
    type: 'channel',
    unreadCount: 0
  };
  const universalThread = {
    id: uuid(),
    name: 'universal',
    type: 'channel',
    unreadCount: 1
  };
  const angularfireThread = {
    id: uuid(),
    name: 'angularfire',
    type: 'channel',
    unreadCount: 0
  };

  // DMs
  const dmThreads = users.map(u => ({
    id: uuid(),
    name: u.name,
    type: 'dm',
    unreadCount: 0
  }));

  const threads = [
    angularThread,
    graphQLThread,
    materialThread,
    friendsThread,
    cliThread,
    protractorThread,
    universalThread,
    angularfireThread,
    ...dmThreads
  ];

  const msg = (thread, author, text, min) => sendMessage(thread, {
    author,
    text,
    sentAt: moment().subtract(min, 'minutes').toDate()
  });
  const thread = (thread, cb) => cb(_.curry(msg)(thread));

  // let messages = [
  //     // friends converstation
  //     ...thread(friendsThread, (msg) => [
  //       msg(ari,  "@eigenjoy, get up", (60 * 48)),
  //       msg(nate, "What?", (60 * 42)),
  //       msg(ari,  "You're in my seat.", (60 * 40)),
  //       msg(nate, "How is this your seat?", (60 * 20)),
  //       msg(ari,  "'Cause I was sitting there.", (60 * 18)),
  //       msg(nate, "But then you left.", 30),
  //       msg(ari,  "Well, it's not like I went to Spain. I went to the bathroom, you knew I was coming back.", 29),
  //       msg(nate, "What's the big deal, sit somewhere else.", 27),
  //       msg(ari,  "The big deal is I was sitting there last, so, that's my seat.", 22),
  //       msg(nate, "Well, actually the last place you were sitting was in there (points to the bathroom). Soo...", 19),
  //       msg(lukas,  "You guys, you know what, you know what, it doesn't matter, because you both have to go get dressed before the big vein in my head pops. So..", 18),
  //       msg(ari,  "All right, Lukas, I just have to do one thing, really quickly, it's not a big deal. (yells at Nate) GET UP!!", 17),
  //       msg(houssein,  "Hi.", 2),
  //     ]),
  //
  //    // universal converstation
  //    // TODO something better here
  //     ...thread(universalThread, (msg) => [
  //       msg(ari,  "@eigenjoy, di you get the app running", (60 * 48)),
  //       msg(nate, "Yup", (60 * 42)),
  //       msg(ari,  "Okay great.", (60 * 40)),
  //     ])
  //

  // let messagesToPost = messages.map(message => message.payload.message);

    // sending an array of objects as post to json server nests an array, don't want that so doing a single message for now
    let newFriendsThreadMessage = [
      ...thread(friendsThread, (msg) => [
        msg(ari,  "Everything works asynchronously now :)", (60 * 48)),
      ]),
    ];

    let newUniversalThreadMessage = [
      ...thread(universalThread, (msg) => [
        msg(lukas,  "Yo this is awesome", (60 * 48)),
      ]),
    ];


    sendMessageToServer(newFriendsThreadMessage[0].payload.message)
      .then(() => sendMessageToServer(newUniversalThreadMessage[0].payload.message))
      .then(() => {
        [
          setCurrentUser(nate),
          ...threads.map((t) => addThread(t)),
          fetchMessages(threads.find(thread => thread.name === $stateParams.thread))
        ].map((a) => $ngRedux.dispatch(a));
      });
}

const fetchMessages = (thread) => dispatch => {
  dispatch(getMessagesRequest(thread))
  return fetch(`http://localhost:3000/messages/`)
    .then(response => response.json())
    .then(json => dispatch(selectThread(thread, json)))
}

const sendMessage = (thread, messageArgs) => {
  const defaults = {
    id: uuid(),
    sentAt: new Date(),
    thread: thread
  };
  const message = Object.assign({}, defaults, messageArgs);

  return addMessage(thread, message);
};

const sendMessageToServer = (message) => {
  return fetch("http://localhost:3000/messages/", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Cache-control': 'no-cache'
    },
    method: 'post',
    body: JSON.stringify(message)
  });
}
