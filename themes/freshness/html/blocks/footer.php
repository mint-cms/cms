<footer id="footer"
        data-component="settings"
        data-group="default">
    <p class="copyright" 
       data-name="copyright">
        <?php echo storage('settings.default.copyright') ?> 
    </p>
</footer>

<script src="<?php echo url('themes/freshness/js/hljs.js') ?>"
        type="text/javascript"></script>
<script type="text/javascript">
    hljs.initHighlightingOnLoad();
    <?php if (is_admin()): ?> 
    
    mint.posts.view.prototype.render = function () {
        mint.component.view.prototype.render.call(this);
        
        mint.utils.toArray(this.node.querySelectorAll('pre code'))
             .forEach(hljs.highlightBlock);
    };
    
    mint.lang(<?php echo json(lang()) ?>);
    
    mint.settings.collection.bootstrap(<?php echo json(storage('settings')) ?>);
    
    mint.dom.on(window, 'load', function () {
        mint.init({
            baseurl: '<?php echo baseurl() ?>'
        });
    });
    <?php endif; ?> 
</script>