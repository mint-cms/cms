mint.dom.on(window, 'load', function () {
    var View = mint.mvc.view,
        dom  = mint.dom;
    
    var Form = View.extend({
        initialize: function () {
            this.button = dom.node(
                '<button class="m-login"><i class="fa fa-lock"></i></button>'
            );
            
            dom.on(this.button, 'click', this.showForm.bind(this));
            document.body.appendChild(this.button);
            
            this.createForm();
            
            var self = this;
            
            mint.overlay.click(function () {
                self.hideForm();
            });
        },
        
        showForm: function () {
            this.form.classList.remove('m-hidden');
            
            mint.overlay.show(true);
        },
        
        hideForm: function () {
            this.form.classList.add('m-hidden');
            
            mint.overlay.hide();
        },
        
        createForm: function () {
            this.form = dom.node(
                '<div class="m-login-form m-hidden">'
              + '<h2>Пароль</h2>'
              + '<input class="m-login-password" type="password">'
              + '<button class="m-login-submit">Войти</button>'
              + '</div>'
            );
            
            document.body.appendChild(this.form);
            
            dom.on(dom.find('.m-login-submit', this.form), 'click', function () {
                mint.ajax.post('mint/api/auth/login', {
                        password: dom.find('.m-login-password', this.form).value
                    })
                    .success(function () {
                        location.reload();
                    })
                    .error(function (_, message) {
                        alert(message);
                    })
                    .send();
            });
        }
    });
    
    var form = new Form();
    
    document.body.appendChild(form.button);
    document.body.appendChild(form.form);
});