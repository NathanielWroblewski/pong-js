namespace('Pong.Models')

Pong.Models.Player = function(options) {
  this.context = options.context
  this.paddle  = new Pong.Models.Paddle({x: 175, y: 580, width: 50, height: 10})

  this.render = function() {
    this.paddle.render({context: this.context})
    return this
  },

  this.update = function() {
    for (var key in keysDown) {
      var value = Number(key)
      // left
      if (value == 37) {
        this.paddle.move({x: -4, y: 0})
      // right
      } else if (value == 39) {
        this.paddle.move({x: 4, y: 0})
      } else {
        this.paddle.move({x: 0, y: 0})
      }
    }
  }
}
