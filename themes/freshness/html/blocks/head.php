<meta charset="utf-8">
<title><?php isset($title) and print($title) ?></title>

<link href="<?php echo url('mint/assets/css/mint.css') ?>" 
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

<script src="<?php echo url('mint/assets/js/mint.js') ?>" type="text/javascript"></script>
<?php if (is_admin()): ?> 
<script src="<?php echo url('mint/assets/settings.js') ?>" type="text/javascript"></script>
<script src="<?php echo url('mint/assets/posts.js') ?>" type="text/javascript"></script>
<?php else: ?> 
<script src="<?php echo url('mint/assets/form.js') ?>" type="text/javascript"></script>
<?php endif; ?> 