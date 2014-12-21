namespace('Pong.Models')

Pong.Models.Paddle = function(options) {
  this.context = options.context
  this.x       = options.x
  this.y       = options.y
  this.width   = options.width
  this.height  = options.height
  this.xSpeed  = 0
  this.ySpeed  = 0

  this.move = function(options) {
    this.x     += options.x
    this.y     += options.y
    this.xSpeed = options.x
    this.ySpeed = options.y

    if (this.x < 0) {
      this.x = 0
      this.xSpeed = 0
    } else if (this.x + this.width > 400) {
      this.x = 400 - this.width
      this.xSpeed = 0
    }
  }

  this.render = function(options) {
    options.context.fillStyle = '#444'
    options.context.fillRect(this.x, this.y, this.width, this.height)
    return this
  }
}
