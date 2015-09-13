<!DOCTYPE html>
<html>
    <head>
        <?php view('blocks/head', $__data__) ?> 
    </head>
    
    <body>
        <div id="wrapper">
        <?php view('blocks/header', $__data__) ?>     
        
        <?php view($view, $__data__) ?> 
        
        <?php view('blocks/footer', $__data__) ?> 
        </div>
    </body>
</html>