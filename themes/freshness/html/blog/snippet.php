<?php return function ($post) { ?> 
<div class="post" 
     data-component="post" 
     data-id="<?php echo $post['id'] ?>">
    <p class="date">
        <?php echo format_date($post['date']) ?> 
    </p>
    
    <h1 class="title">
        <a class="title"
           href="<?php echo url("blog/{$post['url']}") ?>" 
           data-name="title">
            <?php echo $post['title'] ?>
        </a>
    </h1>
    
    <div data-name="text">
    <?php echo markdown($post['text']) ?> 
    </div>
</div>
<?php } ?>