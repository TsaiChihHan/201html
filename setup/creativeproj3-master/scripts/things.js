var count = 100;
function update () {

    game.physics.arcade.collide(player, tags);
    //game.physics.arcade.collide(bullet, movingPlatform);

    player.body.velocity.x = 0;
    player.body.velocity.y = 0;
    
    game.physics.arcade.overlap(bullets, sprites, collisionHandler, null, this);

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
    
    if (fireButton.isDown)
    {
        fireBullet();
    }
}

function moveTags()
{
    movingPlatform.body.velocity.set(game.rnd.integerInRange(-150, 150), game.rnd.integerInRange(-150, 150));
}

function fireBullet () {

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

}

function collisionHandler (bullet, tag) {

    bullet.kill();
    tag.kill();

}