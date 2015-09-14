<article class="posts" id="content">
<?php 
if ($posts):
    foreach ($posts as $post):
        snippet('blog/snippet', $post);
    endforeach;
else:
    echo '<p class="empty">Тут еще нету постов!</p>';
endif;
?>
</article>
<?php if (is_admin()): ?>
<script type="text/javascript">
    mint.posts.collection.bootstrap(<?php echo json($posts) ?>);
</script>
<?php endif; ?> 