mint.dom.on(window, 'load', function () {
    var View = mint.mvc.view,
        dom  = mint.dom;
    
    var Form = View.extend({
        /**
         * Initialize the form
         * 
         * - create a button (tiny icon of lock) to show the form
         * - create the form itself
         */
        initialize: function () {
            this.createButton();
            this.createForm();
            
            mint.overlay.click(this.hideForm.bind(this));
        },
        
        /** Show form */
        showForm: function () {
            this.node.classList.remove('m-hidden');
            
            mint.overlay.show(true);
        },
        
        /** Hide the form */
        hideForm: function () {
            this.node.classList.add('m-hidden');
            
            mint.overlay.hide();
        },
        
        createButton: function () {
            this.button = dom.node(
                '<button class="m-login">'
              + '<i class="fa fa-lock"></i>'
              + '</button>'
            );
            
            dom.on(this.button, 'click', this.showForm.bind(this));
        },
        
        createForm: function () {
            this.node = dom.node(
                '<div class="m-login-form m-hidden">'
              + '<form action="" class="m-form"><h2>Пароль'
              + '</h2>'
              + '<input class="m-login-password" type="password">'
              + '<button class="m-login-submit">Войти</button>'
              + '</form>'
              + '</div>'
            );
            
            var self = this;
            
            this.bind('.m-form', 'submit', function (e) {
                e.preventDefault();
                
                mint.ajax.post('api/auth/login', {
                        password: self.find('.m-login-password').value
                    })
                    .success(function () {
                        location.reload();
                    })
                    .error(function (_, message) {
                        self.node.classList.remove('m-shaking');
                        self.node.offsetWidth = self.node.offsetWidth;
                        self.node.classList.add('m-shaking');
                    })
                    .send();
            });
        }
    });
    
    var form = new Form;
    
    document.body.appendChild(form.button);
    document.body.appendChild(form.node);
});