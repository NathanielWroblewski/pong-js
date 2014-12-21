$(document).ready(function() {
  window.keysDown = {}

  addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true
  })
  addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode]
  })

  var game = new Pong.Views.Game
  game.initialize({
    el:     'pong',
    height: 600,
    width:  400
  })
})
