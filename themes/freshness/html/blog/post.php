<article class="full-post" id="content">
<?php !empty($post) and snippet('blog/snippet', $post) ?> 
</article>
<?php if (is_admin()): ?>
<script type="text/javascript">
    mint.posts.collection.bootstrap([<?php echo json($post) ?>]);
</script>
<?php endif; ?>