namespace('Pong.Models')

Pong.Models.Computer = function(options) {
  this.context = options.context
  this.paddle  = new Pong.Models.Paddle({
    x: 175,
    y: 10,
    width: 50,
    height: 10
  }),

  this.render = function() {
    this.paddle.render({context: this.context})
    return this
  },

  this.update = function(ball) {
    var xPosition = ball.x
    var diff = -((this.paddle.x + (this.paddle.width / 2)) - xPosition)
    if (diff < 0 && diff < -4) {
      diff = -5
    } else if (diff > 0 && diff > 4) {
      diff = 5
    }
    this.paddle.move({x: diff, y: 0})
    if (this.paddle.x < 0) {
      this.paddle.x = 0
    } else if (this.paddle.x + this.paddle.width > 400) {
      this.paddle.x = 400 - this.paddle.width
    }
  }
}
