exports.game = function(req, res) {
  let html =
    '<!DOCTYPE html>'
       +'<html>'
       +'<head>'
       +'<title>Morality Play</title>'
       +'<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0">'
       +'<meta charset="UTF-8">'
       +'<meta name="description" content="Interactive experience">'
       +'<meta name="keywords" content="interactive, experience, web, film">'
       +'<link rel="stylesheet" type="text/css" href="css/main.css">'
       +'</head>'
       +'<body>'
       +'<div id="app">'
       +'<article>'
       +'<div class="layoutSingleColumn u-margin-header">'
       +'</div>'
       +'</article>'
       +'</div>'
       +'<script src="/js/phaser.min.js"></script>'
       +'<script src="/js/Lib/jsmanipulate.min.js"></script>'
       +'<script src="/js/dist/bundle.js"></script>'
       +'</body>'
       +'</html>';
       res.send(html);
}
