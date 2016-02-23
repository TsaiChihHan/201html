function preload() {

    game.stage.backgroundColor = '#85b5e1';

    game.load.baseURL = 'http://examples.phaser.io/assets/';
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'sprites/phaser-dude.png');
    game.load.image('platform', 'sprites/platform.png');

}

var player;
var platforms;
var cursors;
var jumpButton;

function create() {

    player = game.add.sprite(100, 200, 'player');
    
    movingPlatform = game.add.sprite(0, 0, "platform");

    game.physics.arcade.enable(player);
    game.physics.arcade.enable(movingPlatform);

    movingPlatform.body.collideWorldBounds = true;
    player.body.collideWorldBounds = true;
    //player.body.gravity.y = 500;

    tags = game.add.physicsGroup();

    tags.create(500, 150, 'platform');
    tags.create(-200, 300, 'platform');
    tags.create(400, 450, 'platform');

    tags.setAll('body.immovable', true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

var count = 100;
function update () {

    game.physics.arcade.collide(player, tags);

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    
    

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -250;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
    }
    
    if(cursors.up.isDown)
    {
        player.body.velocity.y = -250;
    }
    else if(cursors.down.isDown)
    {
        player.body.velocity.y = 250;
    }
    
    if(count % 50 === 0)
    {
    moveTags();
    }
    count++;
    /*if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -400;
    }*/
}

function moveTags()
{
    var sign = Math.floor((Math.random() * 4));
    if(sign === 0)
    {
        movingPlatform.body.velocity.y = Math.floor((Math.random() * 100) + 51);
        movingPlatform.body.velocity.x = Math.floor((Math.random() * 100) + 51);
    }
    else if(sign === 1)
    {
        movingPlatform.body.velocity.y = -(Math.floor((Math.random() * 100) + 51));
        movingPlatform.body.velocity.x = -(Math.floor((Math.random() * 100) + 51));
    }
    else if(sign === 2)
    {
        movingPlatform.body.velocity.y = (Math.floor((Math.random() * 100) + 51));
        movingPlatform.body.velocity.x = -(Math.floor((Math.random() * 100) + 51));
    }
    else if(sign === 3)
    {
        movingPlatform.body.velocity.y = -(Math.floor((Math.random() * 100) + 51));
        movingPlatform.body.velocity.x = (Math.floor((Math.random() * 100) + 51));
    }
}

function render () {

}