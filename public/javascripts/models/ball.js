namespace('Pong.Models')

Pong.Models.Ball = function(options) {
  this.context = options.context
  this.x       = options.x
  this.y       = options.y
  this.xSpeed  = options.xSpeed || Math.floor(Math.random() * 8 + 1)
  this.ySpeed  = options.ySpeed || 3
  this.height  = options.boardHeight
  this.width   = options.boardWidth

  this.render = function() {
    this.context.beginPath()
    this.context.arc(this.x, this.y, 5, 2 * Math.PI, false)
    this.context.fillStyle = '#444'
    this.context.fill()
  },

  this.update = function(options) {
    this.x += this.xSpeed
    this.y += this.ySpeed

    var topX    = this.x - 5
      , topY    = this.y - 5
      , bottomX = this.x + 5
      , bottomY = this.y + 5

    if (this.x - 5 < 0) {
      this.x = 5
      this.xSpeed = -this.xSpeed
    } else if (this.x + 5 > this.width) {
      this.x = this.width - 5
      this.xSpeed = -this.xSpeed
    }

    if (this.y < 0 || this.y > this.height) {
      this.xSpeed = 1
      this.ySpeed = 3
      if (this.y > this.height) $(this).trigger('score:cpu')
      if (this.y < 0)           $(this).trigger('score:player')
      this.x = this.width / 2
      this.y = this.height / 2
    }

    if (topY > (this.height / 2)) {
      if (
        topY < (options.paddle1.y + options.paddle1.height) &&
        bottomY > options.paddle1.y &&
        topX < (options.paddle1.x + options.paddle1.width) &&
        bottomX > options.paddle1.x
      ) {
        this.ySpeed = -3
        this.xSpeed += (options.paddle1.xSpeed / 2)
        this.y += this.ySpeed
      }
    } else {
      if (
        topY < (options.paddle2.y + options.paddle2.height) &&
        bottomY > options.paddle2.y &&
        topX < (options.paddle2.x + options.paddle2.width) &&
        bottomX > options.paddle2.x
      ) {
        this.ySpeed = 3
        this.xSpeed += (options.paddle2.xSpeed / 2)
        this.y += this.ySpeed
      }
    }
  }
}
