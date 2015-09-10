var View = require('v-mvc/view'),
    dom  = require('v-utils/dom');

/** HTML template */
var html = '<div class="m-editor m-dynamic">'
+ '<a class="remove-button button">'
+ '    <i class="fa fa-fw fa-trash"></i>'
+ '</a>'
+ '<a class="cancel-button button">'
+ '    <i class="fa fa-fw fa-times"></i>'
+ '</a>'
+ '<a class="edit-button button">'
+ '    <i class="fa fa-fw fa-pencil"></i>'
+ '</a>'
+ '<a class="save-button button">'
+ '    <i class="fa fa-fw fa-hdd-o"></i>'
+ '</a>'
+ '</div>';

/**
 * Editor view
 */
var Editor = View.extend({
    /**
     * Initialize 
     */
    initialize: function () {
        var self = this;
        
        this.node = dom.node(html);
        
        this.buttons = {
            edit: this.find('.edit-button'),
            save: this.find('.save-button'),
            remove: this.find('.remove-button'),
            cancel: this.find('.cancel-button')
        };
        
        this.setupEvents();
        this.show(true);
    },
    
    /**
     * Setup events
     */
    setupEvents: function () {
        this.bind('.edit-button',   'click', this.edit);
        this.bind('.save-button',   'click', this.save);
        this.bind('.remove-button', 'click', this.remove);
        this.bind('.cancel-button', 'click', this.cancel);
    },
    
    /**
     * Disable editing
     */
    disable: function () {
        this.data.component.disable();
        
        Editor.editing = false;
        
        this.show(true);
    },
    
    /**
     * Enable editing
     */
    edit: function () {
        if (Editor.editing) return;
        
        Editor.editing = true
        
        this.data.component.enable();
        this.show(false);
    },
    
    /**
     * Remove the item from database
     */
    remove: function () {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            this.disable();
            this.data.component.remove();
            this.destroy();
        }
    },
    
    /**
     * Save edited content
     */
    save: function () {
        this.disable();
        this.data.component.save();
    },
    
    /**
     * Cancel edited content
     */
    cancel: function () {
        this.disable();
        this.data.component.cancel();
    },
    
    /**
     * Destroy the view
     */
    destroy: function () {
        this.node.parentNode.removeChild(this.node);
    },
    
    /**
     * Show/hide buttons
     */
    show: function (flag) {
        // Do you have better idea?
        this.buttons.edit.style.display   = flag ? '' : 'none';
        this.buttons.remove.style.display = flag ? '' : 'none';
        
        this.buttons.save.style.display   = flag ? 'none' : '';
        this.buttons.cancel.style.display = flag ? 'none' : '';
        
        if (this.data.component.notRemovable) {
            this.buttons.remove.style.display = 'none';
        }
    }
});

Editor.editing = false;

module.exports = Editor;