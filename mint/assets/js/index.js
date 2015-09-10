/**
 * mint.js
 * 
 * JS library/framework for inline edit and other stuff for mint
 * 
 * Probably looks like one of those JS frameworks, but it's
 * not. It's more like a set of utilities with MVC components.
 * 
 * @author volter9
 * @package mint
 */

var mint = {
    components: require('./core/components/collection'),
    component:  require('./core/components/component'),
    settings:   require('./core/settings'),
    editor:     require('./core/editor'),
    fields:     require('./core/fields'),
    field:      require('./core/fields/field'),
    init:       require('./core/init'),
    lang:       require('./core/lang'),
    events:     require('v-utils/events'),
    unique:     require('v-utils/unique'),
    utils:      require('v-utils/utils'),
    ajax:       require('v-utils/ajax'),
    dom:        require('v-utils/dom'),
    mvc:        require('v-mvc')
};

mint.component.view = require('./core/components/view');

global.markdown = require('marked');

module.exports = mint;