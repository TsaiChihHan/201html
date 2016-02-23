// In /scripts/game/main.js
window.createGame = function(scope, players, mapId, injector) {
  var height  = parseInt(ele.css('height'), 10),
      width   = parseInt(ele.css('width'), 10);
  var game = new Phaser.Game(width, height, Phaser.AUTO, 'gameCanvas');
  var Game      = require('./states'),
      states    = Game.States;

  // Add our game states
  game.state.add('Boot', states.Boot);
  game.state.add('Preloader', states.Preloader);
  game.state.add('MainMenu', states.MainMenu);
  game.state.add('Play', states.Play);

  // Start the game
  game.state.start('Boot');

  scope.$on('game:toggleMusic', function() {
    Game.toggleMusic(); // some function that toggles the music
  });

  scope.$on('$destroy', function() {
  game.destroy(); // Clean up the game when we leave this scope
  });

  var addNewPlayer = function(player) {
    players.push(player); // some player array holding all the players
    scope.$emit('game:newPlayer', player);
  };
};
