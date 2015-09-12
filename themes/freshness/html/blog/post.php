<article>
<?php !empty($post) and snippet('blog/snippet', $post) ?> 
</article>
<script type="text/javascript">
    mint.posts.collection.bootstrap([<?php echo json($post) ?>]);
</script>