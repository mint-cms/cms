(function () {
    var View = mint.component.view;
    
    /* Posts mapper */
    var mapper = new mint.mvc.mapper({
        baseurl: 'api/settings',
        update:  'save'
    });
    
    mapper.parse = function (data) {
        return data.settings;
    };
    
    /* Settings collection */
    var settings = new mint.mvc.collection;
    
    settings.bindTo(mapper);
    
    var SettingsView = View.extend({
        initialize: function () {
            this.lang = mint.lang('settings');
            
            View.prototype.initialize.call(this);
        },
        
        /**
         * Setup fields
         * 
         * @param {Node} node
         */
        initiateFields: function (node) {
            var nodes = mint.utils.toArray(mint.dom.findAll('[data-name]', node)),
                self  = this;
    
            nodes.forEach(function (node) {
                var name = node.dataset.name,
                    type = node.dataset.type || 'input';
            
                self.nodes[name] = new mint.fields[type](node, {
                    name: name 
                }, self.lang[name]);
            });
        }
    });
    
    var Settings = mint.component.extend({
        /**
         * Initialize the setting
         */
        initialize: function () {
            this.notRemovable = true;
            this.group        = this.node.dataset.group;
        
            this.setting = settings.get(this.group) || mapper.create();
            
            if (this.setting.isEmpty()) {
                mapper.fetch(this.group, this.setting);
            }
        
            this.createView();
        },
    
        /**
         * Create a view 
         * 
         * @param {mint.mvc.model} setting
         */
        createView: function () {
            this.view = new SettingsView(this.node, {
                model: this.setting
            });
        },
    
        /**
         * Cancel the modifications
         */
        cancel: function () {
            this.setting.revert();
        },

        /**
         * Save settings to the server
         */
        save: function () {
            this.setting.assign(this.view.collectData());
            
            mapper.update(this.setting);
            
            this.setting.apply();
            this.setting.emit('change');
        }
    });

    mint.components.register('settings', Settings);
    mint.settings.collection = settings;
})();