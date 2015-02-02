import RemoteFluxServer from 'nexus-flux-socket.io/server';
import { flux, app } from './config';

const { port } = flux;
const { heartbeat, nicknameLength, messageLength } = app;
const server = new RemoteFluxServer(port);

// Stores
const nicknames = server.Store('/nicknames', server.lifespan);
const messages = server.Store('/messages', server.lifespan);
let hearbeats = {};

// Actions
server.Action('/setNickname', server.lifespan)
.onDispatch(({ nickname }, clientHash) => {
  if(!nickname || !_.isString(nickname) || nickname.length > nicknameLength) {
    return;
  }
  hearbeats[clientHash] = Date.now();
  nicknames.set(clientHash, nickname).commit();
});

server.Action('/postMessage', server.lifespan)
.onDispatch(({ message }, clientHash) => {
  if(!message || !_.isString(message) || message.length > messageLength) {
    return;
  }
  const nickname = nicknames.get(clientHash);
  if(!nickname) {
    return;
  }
  const date = Date.now();
  messages.set(_.uniqueId('m'), { date, nickname, message })
  .commit();
});

server.Action('/heartbeat', server.lifespan)
.onDispatch((params, clientHash) => {
  hearbeats[clientHash] = Date.now();
});

// Periodically expire nicknames
server.lifespan.setInterval(() => {
  nicknames.working.forEach((nickname, clientHash) => {
    if(hearbeats[clientHash] === void 0) {
      nicknames.unset(clientHash);
    }
  });
  hearbeats = {};
  if(nicknames.dirty) {
    nicknames.commit();
  }
}, heartbeat);

console.log('flux-server listening on port', port);

