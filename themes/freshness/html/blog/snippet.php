<?php return function ($post) { ?> 
<div class="post" 
     data-component="post" 
     data-id="<?php echo $post['id'] ?>">
    <h1>
        <a href="post.php?url=<?php echo $post['url'] ?>" data-name="title">
            <?php echo $post['title'] ?>
        </a>
    </h1>
    
    <div data-name="text">
    <?php echo markdown($post['text']) ?> 
    </div>
</div>
<?php } ?>