var utils  = require('v-utils/utils'),
    extend = require('v-utils/extend');

/**
 * Component
 * 
 * Base (skeleton) constructor for component objects
 * 
 * @param {Node} node
 */
function Component (node) {
    this.node = node;
    
    this.initialize();
}

Component.prototype = {
    initialize: function () {},
    
    /**
     * Enable component for modification
     */
    enable: function () {
        this.view.activate();
    },

    /**
     * Disable component for modification
     */
    disable: function () {
        this.view.deactivate();
    },

    /**
     * Insert editor
     * 
     * @param {Editor} editor
     */
    insertEditor: function (editor) {
        this.editor = editor;
    
        this.node.appendChild(editor.node);
    },

    /**
     * Save and cancel component actions 
     */
    save:   function () {},
    cancel: function () {}
};

Component.extend = extend(Component);

module.exports = Component;