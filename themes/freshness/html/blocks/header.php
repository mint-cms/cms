<header id="header"
        data-component="settings"
        data-group="default">
    <h1 class="title">
        <a class="title" href="<?php echo url() ?>"
           data-name="title">
            <?php echo storage('settings.default.title') ?> 
        </a>
    </h1>
    
    <p class="description"
       data-name="description">
        <?php echo storage('settings.default.description') ?> 
    </p>
</header>