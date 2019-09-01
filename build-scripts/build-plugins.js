const { plugins } = require('../plugins.config.json');
const Plugins = require('./utils/plugins/Plugins');

Plugins.generate(plugins);
