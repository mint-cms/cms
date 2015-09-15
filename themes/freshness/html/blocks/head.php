<meta charset="utf-8">
<meta name="viewport" 
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title><?php isset($title) and print($title) ?></title>

<link href="<?php echo url('assets/css/mint.css') ?>" 
      rel="stylesheet"
      type="text/css">
<link href="<?php echo url('themes/freshness/css/styles.css') ?>" 
      rel="stylesheet"
      type="text/css">
<link href="<?php echo url('themes/freshness/css/theme.css') ?>" 
      rel="stylesheet"
      type="text/css">
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" 
      rel="stylesheet"
      type="text/css">

<script src="<?php echo url('assets/js/mint.js') ?>" type="text/javascript"></script>
<?php if (is_admin()): ?> 
<script src="<?php echo url('assets/settings.js') ?>" type="text/javascript"></script>
<script src="<?php echo url('assets/posts.js') ?>" type="text/javascript"></script>
<?php else: ?> 
<script src="<?php echo url('assets/form.js') ?>" type="text/javascript"></script>
<?php endif; ?> 