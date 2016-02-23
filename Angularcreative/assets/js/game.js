var player;
var platforms;
var cursors;
var jumpButton;

var bullets;
var fireButton;
var bulletTime = 0;
var bullet;
var sprites;

var Game = {

    preload : function() {
      game.stage.backgroundColor = 'black';

      game.load.baseURL = 'http://examples.phaser.io/assets/';
      game.load.crossOrigin = 'anonymous';

      game.load.image('player', 'sprites/phaser-dude.png');
      game.load.image('platform', 'sprites/platform.png');

      game.load.baseURL = 'http://examples.phaser.io/assets/';
      game.load.crossOrigin = 'anonymous';

      game.load.image('ship', 'sprites/thrust_ship2.png');
      game.load.image('bullet', 'misc/bullet0.png');
  	  game.load.spritesheet('spinner', 'sprites/bluemetal_32x32x4.png', 16, 16);
    },

    fireBullet : function() {
      if (game.time.time > bulletTime)
      {
          bullet = bullets.getFirstExists(false);

          if (bullet)
          {
              bullet.reset(player.x + 6, player.y - 12);
              bullet.body.velocity.y = -600;
              bulletTime = game.time.time + 100;
          }
      }

    },

    create : function() {

      sprites = game.add.physicsGroup(Phaser.Physics.ARCADE);
  	  for (var i = 0; i < 40; i++)
  	  {
  		    var s = sprites.create(game.rnd.integerInRange(100, 700), game.rnd.integerInRange(32, 200), 'spinner');
  		    s.animations.add('spin', [0, 1, 2, 3]);
  		    s.play('spin', 20, true);
  		    s.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
  	  }

  	  sprites.setAll('body.collideWorldBounds', true);
  	  sprites.setAll('body.bounce.x', 1);
  	  sprites.setAll('body.bounce.y', 1);

      bullets = game.add.physicsGroup();
      bullets.createMultiple(32, 'bullet', false);
      bullets.setAll('checkWorldBounds', true);
      bullets.setAll('outOfBoundsKill', true);


      player = game.add.sprite(400, 550, 'ship');

      game.physics.arcade.enable(player);

      player.body.collideWorldBounds = true;
      //player.body.gravity.y = 500;

      platforms = game.add.physicsGroup();

      //platforms.create(500, 150, 'platform');
      //platforms.create(-200, 300, 'platform');
      //platforms.create(400, 450, 'platform');

      platforms.setAll('body.immovable', true);


      cursors = game.input.keyboard.createCursorKeys();
      fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    },

    collisionHandler : function(bullet, tag) {
      bullet.kill();
      tag.kill();
    },

    update: function() {
      game.physics.arcade.collide(sprites,sprites);
      game.physics.arcade.collide(player, platforms);
      game.physics.arcade.overlap(bullets,sprites,this.collisionHandler, null, this);

      player.body.velocity.x = 0;
      player.body.velocity.y = 1;

      if (cursors.left.isDown)
      {
          player.body.velocity.x = -400;
      }
      else if (cursors.right.isDown)
      {
          player.body.velocity.x = 400;
      }

      if (cursors.down.isDown) {
          player.body.velocity.y = 400;
      }
      else if (cursors.up.isDown) {
          player.body.velocity.y = -400;
      }

      if (fireButton.isDown)
      {
          this.fireBullet();
      }
    }
};
