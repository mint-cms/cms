<!DOCTYPE html>
<html>
    <head>
        <?php view('blocks/head', $__data__) ?> 
    </head>
    
    <body>
        <?php is_admin() and view(basepath('mint/core/panel')) ?> 
        
        <div id="wrapper">
        <?php view('blocks/header', $__data__) ?>     
        
        <?php view($view, $__data__) ?> 
        
        <?php view('blocks/footer', $__data__) ?> 
        </div>
    </body>
</html>