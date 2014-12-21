namespace('Pong.Views')

Pong.Views.Game = function() {
  this.initialize = function(options) {
    this.el      = options.el
    this.height  = options.height || 600
    this.width   = options.width  || 400
    this.canvas  = options.canvas || document.createElement('canvas')
    this.context = this.canvas.getContext('2d')
    this.player  = new Pong.Models.Player({context: this.context})
    this.cpu     = new Pong.Models.Computer({context: this.context})
    this.ball    = new Pong.Models.Ball({
      x:           200,
      y:           300,
      context:     this.context,
      boardWidth:  this.width,
      boardHeight: this.height
    })

    this.canvas.width  = this.width
    this.canvas.height = this.height

    $(this.ball).on('score:cpu', this.cpuScored.bind(this))
    $(this.ball).on('score:player', this.playerScored.bind(this))

    document.getElementById(this.el).appendChild(this.canvas)
    this.animate(this.step.bind(this))
  },

  this.animate = function(callback) {
    window.requestAnimationFrame(callback)       ||
    window.webkitRequestAnimationFrame(callback) ||
    window.mozRequestAnimationFrame(callback)    ||
    function(callback) { setTimeout(callback, 1000 / 60) }
  },

  this.render = function() {
    this.context.fillStyle = '#dedede'
    this.context.fillRect(0, 0, this.width, this.height)
    this.player.render({context: this.context})
    this.cpu.render({context: this.context})
    this.ball.render()
    return this
  },

  this.update = function() {
    this.player.update()
    this.cpu.update(this.ball)
    this.ball.update({paddle1: this.player.paddle, paddle2: this.cpu.paddle})
  },

  this.step = function() {
    this.update()
    this.render()
    this.animate(this.step.bind(this))
  },

  this.cpuScored = function() {
    this.score('.cpu-score')
  },

  this.playerScored = function() {
    this.score('.player-score')
  },

  this.score = function(node) {
    var currentScore = Number($(node).text())
    $(node).html(currentScore + 100)
  }
}
