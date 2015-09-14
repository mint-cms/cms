var dom    = require('v-utils/dom'),
    events = require('v-utils/events');

var overlay = {
    element: null,
    
    /**
     * Show overlay
     */
    show: function (dark) {
        if (this.element === null) {
            this.element = dom.node('<div class="m-hidden m-overlay"></div>');
            
            var self = this;
            
            dom.on(this.element, 'click', function () {
                self.emit('click');
            });
            
            document.body.appendChild(this.element);
        }
        
        this.element.classList.toggle('m-dark', dark);
        this.element.classList.remove('m-hidden');
    },
    
    /**
     * Hide overlay
     */
    hide: function () {
        if (!this.element) {
            return;
        }
        
        this.element.classList.add('m-hidden');
    },
    
    /**
     * Close event
     */
    click: function (callback) {
        this.on('click', callback);
    }
};

events(overlay);

module.exports = overlay;