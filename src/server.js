const R = require('react-nexus');
const _ = R._;
const UplinkSimpleServer = require('nexus-uplink-simple-server');
const express = require('express');
const cors = require('cors');
const path = require('path');

const common = require('./common');
const App = require('./App');

// Render + static server
express()
.use(cors())
.use(express.static(path.join(__dirname, '..', 'public')))
.get('/favicon.ico', (req, res) => res.status(404).send(null))
.use((new App()).prerender)
.listen(common.render.port);

(new UplinkSimpleServer({ guid: _.guid(),
  stores: [],
  rooms: [],
  actions: [],
  app: express().use(cors()),
})).listen(common.uplink.port);