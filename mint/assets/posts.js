(function () {
    var View = mint.component.view;
    
    /** Mapper */
    var mapper = new mint.mvc.mapper({
        baseurl: 'api/posts'
    });
    
    mapper.parse = function (data) {
        return data.item;
    };
    
    /** Posts collection */
    var posts = new mint.mvc.collection;
    
    posts.bindTo(mapper);
    
    var Url = mint.field.extend({
        create: function () {
            return mint.dom.node('<label class="m-field m-url-field">' 
                + 'Заметка будет размещена по этому адресу: '
                + mint.ajax.url('blog/')
                + '<input class="m-input-field m-field url-field" placeholder="'
                + this.title + '" type="text">'
                + '</span></label>');
        },
        
        /**
         * @param {String} value
         */
        set: function (value) {
            this.field.querySelector('.url-field').value = value;
            this.node.href = mint.ajax.url(['blog', value]);
        },
        
        /**
         * @return {String}
         */
        value: function () {
            return this.field.querySelector('.url-field').value;
        }
    });
    
    var PostView = View.extend({
        /**
         * Post fields
         */
        fields: {
            title: {
                type: 'input',
                target: '[data-name=title]'
            },
            text: {
                type: 'text',
                target: '[data-name=text]',
                set: function (text) {
                    this.field.value = text;
                    this.node.innerHTML = markdown(text);
                }
            },
            url: {
                type: 'url',
                target: '[data-name=title]'
            }
        },
        
        initialize: function () {
            this.lang = mint.lang('posts');
            
            View.prototype.initialize.call(this);
        }
    });
    
    var Post = mint.component.extend({
        /**
         * Initialize the component
         */
        initialize: function () {
            this.id   = this.node.dataset.id;
            this.post = posts.get(this.id) || mapper.create();
        
            if (this.post.isEmpty() && this.id) {
                mapper.fetch(this.id, this.post);
            }
        
            this.createView();
        },
        
        /**
         * Create view
         */
        createView: function () {
            this.view = new PostView(this.node, {
                model: this.post
            });
        },
        
        /**
         * Cancel editing
         */
        cancel: function () {
            if (!this.post.isNew()) {
                return this.post.revert();
            }
            
            this.node.parentNode.removeChild(this.node);
        },
        
        /**
         * Remove a post
         */
        remove: function () {
            if (this.post.isNew()) {
                return;
            }
            
            var self = this;
            
            mapper.remove(this.post, function () {
                self.cancel();
            });
        },
        
        /**
         * Save a post
         */
        save: function () {
            var data = this.view.collectData();
            
            if (Object.keys(data).length === 0) {
                return;
            }
            
            this.post.assign(data);
            
            mapper.save(this.post);
            
            this.post.apply();
        }
    });
    
    /* Registering URL field and Post component */
    mint.fields.url = Url;
    mint.components.register('post', Post);
    
    mint.posts = { 
        collection: posts, 
        view: PostView
    };
})();