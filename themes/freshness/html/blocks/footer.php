<footer id="footer"
        data-component="settings"
        data-group="default">
    <p data-name="copyright">Copyright &copy; 2015+</p>
</footer>

<script type="text/javascript">
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