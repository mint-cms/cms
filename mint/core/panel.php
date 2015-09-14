<div class="m-panel" 
     id="m-panel">
    <a class="add m-button">
        <i class="fa fa-plus"></i>
    </a>
    <a class="m-button">
        <i class="fa fa-picture-o"></i>
    </a>
    <a class="m-button">
        <i class="fa fa-cogs"></i>
    </a>
    <a href="<?php echo url('api/auth/logout') ?>" class="m-button last">
        <i class="fa fa-sign-out"></i>
    </a>
</div>
<script type="text/javascript">
    var dom = mint.dom;
    
    dom.on(window, 'load', function () {
        var dest = dom.find('.posts');
        
        if (!dest) {
            return;
        }
        
        dom.on(dom.find('#m-panel .add'), 'click', function () {
            if (mint.editor.editing) {
                return;
            }
        
            mint.ajax.get('api/posts/template')
                .success(function (_, data) {
                    var div  = dom.node(data.html);
                
                    div.removeAttribute('data-id');
                
                    mint.components.createComponent(div);
                
                    dest.insertBefore(div, dest.children[0]);
                
                    div.component.post.merge(data.data);
                    div.editor.edit();
                })
                .send();
        });
    });
</script>