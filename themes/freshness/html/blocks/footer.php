<footer id="footer"
        data-component="settings"
        data-group="default">
    <p class="copyright" 
       data-name="copyright">
        Copyright &copy; 2015+
    </p>
</footer>

<script src="themes/freshness/js/hljs.js"
        type="text/javascript"></script>
<script type="text/javascript">
    hljs.initHighlightingOnLoad();
    
    mint.posts.view.prototype.render = function () {
        mint.component.view.prototype.render.call(this);
        
        mint.utils.toArray(this.node.querySelectorAll('pre code'))
             .forEach(hljs.highlightBlock);
    };
    
    mint.lang({
        settings: {
            sitename: 'Website name',
            sitedescription: 'Website description',
            copyright: 'Copyright'
        },
        posts: {
            title: 'Title',
            text: 'Content',
            url: 'URL slug'
        }
    });
    
    mint.settings.collection.bootstrap(<?php echo json(storage('settings')) ?>);
    
    mint.dom.on(window, 'load', function () {
        mint.init({
            baseurl: 'mint'
        });
    });
</script>