const R = require('react-nexus');
const _ = R._;
const cors = require('cors');
const express = require('express');
const UplinkSimpleServer = require('nexus-uplink-simple-server');
const { DirtyMarker } = UplinkSimpleServer;

const chatUtils = require('./chatUtils');

module.exports = () => {
    const uplink = new UplinkSimpleServer({
      pid: _.guid('pid'),
      stores: [
        '/userList',
        '/messageList',
      ],
      rooms: [],
      actions: [
        '/postMessage',
        '/setNickname',
      ],
      activityTimeout: 2000,
      app: express().use(cors()),
    });

    const { MESSAGE_LIST_MAX_LENGTH } = chatUtils;
    const UPDATE_INTERVAL = 100;
    const dirty = new DirtyMarker();
    const store = {
      '/userList': {},
      '/messageList': [],
    };

    function update() {
      dirty.flush().forEach((path) => uplink.update({ path, value: store[path] }));
    }

    setInterval(update, UPDATE_INTERVAL);

    function catchAll(fn) {
      return function() {
        try {
          return fn.apply(this, arguments);
        }
        catch(err) {
          console.warn(err);
        }
      };
    }

    function userJoin({ guid }) {
      guid.should.be.a.String;
      const defaultNickname = _.uniqueId('Anonymous');
      store['/userList'][chatUtils.userId(guid)] = defaultNickname;
      _.dev(() => console.log(`store['/userList'][${chatUtils.userId(guid)}] <- ${defaultNickname}`));
      postMessage({ guid, message: `Hello, I'm ${defaultNickname}.`});
      dirty.mark('/userList');
    }

    function userLeave({ guid }) {
      guid.should.be.a.String;
      _.dev(() => console.log(`store['/userList'][${chatUtils.userId(guid)}] <- void 0`));
      delete store['/userList'][chatUtils.userId(guid)];
      dirty.mark('/userList');
    }

    function setNickname({ guid, nickname }) {
      guid.should.be.a.String;
      nickname.should.be.a.String;
      nickname.length.should.be.within(3, 24);
      _.dev(() => console.log(`store['/userList'][${chatUtils.userId(guid)}] <- ${nickname}`));
      store['/userList'][chatUtils.userId(guid)] = nickname;
      dirty.mark('/userList');
    }

    function postMessage({ guid, message }) {
      message.should.be.a.String;
      message.length.should.be.within(1, 256);
      store['/messageList'].push({
        key: chatUtils.messageId(),
        timestamp: Date.now(),
        nickname: store['/userList'][chatUtils.userId(guid)],
        userId: chatUtils.userId(guid),
        message
      });
      _.dev(() => console.log(`store['/userList'][${chatUtils.userId(guid)}] -> ${message}`));
      while(store['/messageList'].length > MESSAGE_LIST_MAX_LENGTH) {
        store['/messageList'].shift();
      }
      dirty.mark('/messageList');
    }

    uplink.events.on('create', catchAll(userJoin));
    uplink.events.on('delete', catchAll(userLeave));
    uplink.actions.on('/setNickname', catchAll(setNickname));
    uplink.actions.on('/postMessage', catchAll(postMessage));

    return uplink;
};
