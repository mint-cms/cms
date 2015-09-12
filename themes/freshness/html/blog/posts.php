<button id="add_post">
    Добавить пост
</button>
<article class="posts">
<?php foreach ($posts as $post) {
    snippet('blog/snippet', $post);
} ?> 
</article>
<script type="text/javascript">
    mint.posts.collection.bootstrap(<?php echo json($posts) ?>);
    
    var dom = mint.dom;
    
    dom.on(dom.find('#add_post'), 'click', function () {
        if (mint.editor.editing) {
            return;
        }
        
        mint.ajax.get('api/posts/template')
            .success(function (_, data) {
                var dest = dom.find('.posts'),
                    div  = dom.node(data.html);
                
                div.removeAttribute('data-id');
                
                mint.components.createComponent(div);
                
                console.dir(div);
                
                dest.insertBefore(div, dest.children[0]);
                
                div.component.post.merge(data.data);
                div.editor.edit();
            })
            .send();
    });
</script>