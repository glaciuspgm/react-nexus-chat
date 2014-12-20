const R = require('react-nexus');
const _ = R._;
const cors = require('cors');
const express = require('express');
const UplinkSimpleServer = require('nexus-uplink-simple-server');

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
    const UPDATE_THROTTLE = 100;
    const userList = {};
    const messageList = [];

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

    function render() {
      return {
        '/userList': userList,
        '/messageList': messageList,
      };
    }

    let prevHash = _.hash({});
    function update() {
      const next = render();
      const nextHash = _.hash(next);
      if(nextHash !== prevHash) {
        Object.keys(next).forEach((path) => uplink.update({ path, value: next[path] }));
      }
      prevHash = nextHash;
    }

    setInterval(update, UPDATE_THROTTLE);

    function userJoin({ guid }) {
      guid.should.be.a.String;
      const defaultNickname = _.uniqueId('Anonymous');
      userList[chatUtils.userId(guid)] = defaultNickname;
      _.dev(() => console.log(`userList[${chatUtils.userId(guid)}] <- ${defaultNickname}`));
      postMessage({ guid, message: `Hello, I'm ${defaultNickname}.`});
    }

    function userLeave({ guid }) {
      guid.should.be.a.String;
      _.dev(() => console.log(`userList[${chatUtils.userId(guid)}] <- void 0`));
      delete userList[chatUtils.userId(guid)];
    }

    function setNickname({ guid, nickname }) {
      guid.should.be.a.String;
      nickname.should.be.a.String;
      nickname.length.should.be.within(3, 24);
      _.dev(() => console.log(`userList[${chatUtils.userId(guid)}] <- ${nickname}`));
      userList[chatUtils.userId(guid)] = nickname;
    }

    function postMessage({ guid, message }) {
      message.should.be.a.String;
      message.length.should.be.within(1, 256);
      messageList.push({
        key: chatUtils.messageId(),
        timestamp: Date.now(),
        nickname: userList[chatUtils.userId(guid)],
        userId: chatUtils.userId(guid),
        message
      });
      _.dev(() => console.log(`userList[${chatUtils.userId(guid)}] -> ${message}`));
      while(messageList.length > MESSAGE_LIST_MAX_LENGTH) {
        messageList.shift();
      }
    }

    uplink.events.on('create', catchAll(userJoin));
    uplink.events.on('delete', catchAll(userLeave));
    uplink.actions.on('/setNickname', catchAll(setNickname));
    uplink.actions.on('/postMessage', catchAll(postMessage));

    return uplink;
};
