<article class="posts">
<?php foreach ($posts as $post) {
    snippet('blog/snippet', $post);
} ?> 
</article>
<script type="text/javascript">
    mint.posts.collection.bootstrap(<?php echo json($posts) ?>);
</script>