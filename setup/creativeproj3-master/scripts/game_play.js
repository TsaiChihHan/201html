
var player, platforms, cursors, jumpButton, count, lasers, fireButton, laserTime, laser, tag_names, current_tag, tags, doctype, html, head, title, html_tag_game, slash_title, slash_head, bodyt, p, congratulations, slash_p, slash_body, slash_html;


var Game = {

	preload: function() {

		game.stage.backgroundColor = '#FFFFFF';

		game.load.crossOrigin = 'anonymous';

		game.load.image('player', 'images/angular.png');
		game.load.image('laser', 'images/laser.png');
		game.load.image('doctype', 'images/doctype.png');
		game.load.image('html', 'images/html.png');
		game.load.image('head', 'images/head.png');
		game.load.image('title', 'images/title.png');
		game.load.image('html_tag_game', 'images/html_tag_game.png');
		game.load.image('slash_title', 'images/slash_title.png');
		game.load.image('slash_head', 'images/slash_head.png');
		game.load.image('bodyt', 'images/body.png');
		game.load.image('p', 'images/p.png');
		game.load.image('congratulations', 'images/congratulations.png');
		game.load.image('slash_p', 'images/slash_p.png');
		game.load.image('slash_body', 'images/slash_body.png');
		game.load.image('slash_html', 'images/slash_html.png');

		console.log("loaded images");

		count = 100;
		laserTime = 0;
		tag_names = ['doctype', 'html', 'head', 'title', 'html_tag_game', 'slash_title', 'slash_head', 'bodyt', 'p', 'congratulations', 'slash_p', 'slash_body', 'slash_html'];
		current_tag = 0;
		tags = new Array();

	},

	

	create: function() {

		player = game.add.sprite(100, 200, 'player');
		doctype = game.add.sprite(game.rnd.integerInRange(0, 600), game.rnd.integerInRange(0, 450), 'doctype');
		html = game.add.sprite(game.rnd.integerInRange(0, 600), game.rnd.integerInRange(0, 450), 'html');
		head = game.add.sprite(game.rnd.integerInRange(0, 600), game.rnd.integerInRange(0, 450), 'head');
		title = game.add.sprite(game.rnd.integerInRange(0, 600), game.rnd.integerInRange(0, 450), 'title');
		html_tag_game = game.add.sprite(game.rnd.integerInRange(0, 600), game.rnd.integerInRange(0, 450), 'html_tag_game');
		slash_title = game.add.sprite(game.rnd.integerInRange(0, 600), game.rnd.integerInRange(0, 450), 'slash_title');
		slash_head = game.add.sprite(game.rnd.integerInRange(0, 600), game.rnd.integerInRange(0, 450), 'slash_head');
		bodyt = game.add.sprite(game.rnd.integerInRange(0, 600), game.rnd.integerInRange(0, 450), 'bodyt');
		p = game.add.sprite(game.rnd.integerInRange(0, 600), game.rnd.integerInRange(0, 450), 'p');
		congratulations = game.add.sprite(game.rnd.integerInRange(0, 600), game.rnd.integerInRange(0, 450), 'congratulations');
		slash_p = game.add.sprite(game.rnd.integerInRange(0, 600), game.rnd.integerInRange(0, 450), 'slash_p');
		slash_body = game.add.sprite(game.rnd.integerInRange(0, 600), game.rnd.integerInRange(0, 450), 'slash_body');
		slash_html = game.add.sprite(game.rnd.integerInRange(0, 600), game.rnd.integerInRange(0, 450), 'slash_html');

		console.log("initialized sprites");

		game.physics.arcade.enable(doctype);
		console.log("doctype");
		game.physics.arcade.enable(html);
		console.log("html");
		game.physics.arcade.enable(head);
		console.log("head");
		game.physics.arcade.enable(title);
		console.log("title");
		game.physics.arcade.enable(html_tag_game);
		console.log("html_tag_game");
		game.physics.arcade.enable(slash_title);
		console.log("slash_title");
		game.physics.arcade.enable(slash_head);
		console.log("slash_head");
		game.physics.arcade.enable(bodyt);
		console.log("bodyt");
		game.physics.arcade.enable(p);
		console.log("p");
		game.physics.arcade.enable(congratulations);
		console.log("congratulations");
		game.physics.arcade.enable(slash_p);
		console.log("slash_p");
		game.physics.arcade.enable(slash_body);
		console.log("slash_body");
		game.physics.arcade.enable(slash_html);
		console.log("slash_html");

		console.log("physiced the sprites (is that a word?)");

		doctype.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
		doctype.body.collideWorldBounds = true;
		doctype.body.bounce.x = 1;
		doctype.body.bounce.y = 1;

		console.log("DID IT FIND A BODY TO VELOCITY SET?");

		html.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
		html.body.collideWorldBounds = true;
		html.body.bounce.x = 1;
		html.body.bounce.y = 1;

		head.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
		head.body.collideWorldBounds = true;
		head.body.bounce.x = 1;
		head.body.bounce.y = 1;

		title.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
		title.body.collideWorldBounds = true;
		title.body.bounce.x = 1;
		title.body.bounce.y = 1;

		html_tag_game.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
		html_tag_game.body.collideWorldBounds = true;
		html_tag_game.body.bounce.x = 1;
		html_tag_game.body.bounce.y = 1;

		slash_title.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
		slash_title.body.collideWorldBounds = true;
		slash_title.body.bounce.x = 1;
		slash_title.body.bounce.y = 1;

		slash_head.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
		slash_head.body.collideWorldBounds = true;
		slash_head.body.bounce.x = 1;
		slash_head.body.bounce.y = 1;

		bodyt.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
		bodyt.body.collideWorldBounds = true;
		bodyt.body.bounce.x = 1;
		bodyt.body.bounce.y = 1;

		p.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
		p.body.collideWorldBounds = true;
		p.body.bounce.x = 1;
		p.body.bounce.y = 1;

		congratulations.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
		congratulations.body.collideWorldBounds = true;
		congratulations.body.bounce.x = 1;
		congratulations.body.bounce.y = 1;

		slash_p.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
		slash_p.body.collideWorldBounds = true;
		slash_p.body.bounce.x = 1;
		slash_p.body.bounce.y = 1;

		slash_body.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
		slash_body.body.collideWorldBounds = true;
		slash_body.body.bounce.x = 1;
		slash_body.body.bounce.y = 1;

		slash_html.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
		slash_html.body.collideWorldBounds = true;
		slash_html.body.bounce.x = 1;
		slash_html.body.bounce.y = 1;

		console.log("set velocities and other such useless things");


		/*for(var i = 0; i < tag_names.length; i++)
		{
			tags.push(game.add.sprite(game.rnd.integerInRange(0, 600), game.rnd.integerInRange(0, 450), tag_names[i]));
			s.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
			tags[i].body.collideWorldBounds = true;
			tags[i].body.bounce.x = 1;
			tags[i].body.bounce.y = 1;
		}
		*/

		//movingPlatform = game.add.sprite(0, 0, "platform");

		game.physics.arcade.enable(player);
		//game.physics.arcade.enable(movingPlatform);

		lasers = game.add.physicsGroup();
		lasers.createMultiple(32, 'laser', false);
		lasers.setAll('checkWorldBounds', true);
		lasers.setAll('outOfBoundsKill', true);

		//movingPlatform.body.collideWorldBounds = true;
		player.body.collideWorldBounds = true;
		//player.body.gravity.y = 500;

		//tags = game.add.physicsGroup();

		//tags.create(500, 150, 'platform');
		//tags.create(-200, 300, 'platform');
		//tags.create(400, 450, 'platform');

		//tags.setAll('body.immovable', true);

		cursors = game.input.keyboard.createCursorKeys();
		fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	},

	collisionHandler0 : function(tag, laser) {
		if(current_tag == 0)
		{
			tag.kill();
			current_tag++;
		}
		laser.kill();
	},

	collisionHandler1 : function(tag, laser) {
		if(current_tag == 1)
		{
			tag.kill();
			current_tag++;
		}
		laser.kill();
	},

	collisionHandler2 : function(tag, laser) {
		if(current_tag == 2)
		{
			tag.kill();
			current_tag++;
		}
		laser.kill();
	},

	collisionHandler3 : function(tag, laser) {
		if(current_tag == 3)
		{
			tag.kill();
			current_tag++;
		}
		laser.kill();
	},

	collisionHandler4 : function(tag, laser) {
		if(current_tag == 4)
		{
			tag.kill();
			current_tag++;
		}
		laser.kill();
	},

	collisionHandler5 : function(tag, laser) {
		if(current_tag == 5)
		{
			tag.kill();
			current_tag++;
		}
		laser.kill();
	},

	collisionHandler6 : function(tag, laser) {
		if(current_tag == 6)
		{
			tag.kill();
			current_tag++;
		}
		laser.kill();
	},

	collisionHandler7 : function(tag, laser) {
		if(current_tag == 7)
		{
			tag.kill();
			current_tag++;
		}
		laser.kill();
	},

	collisionHandler8 : function(tag, laser) {
		if(current_tag == 8)
		{
			tag.kill();
			current_tag++;
		}
		laser.kill();
	},

	collisionHandler9 : function(tag, laser) {
		if(current_tag == 9)
		{
			tag.kill();
			current_tag++;
		}
		laser.kill();
	},

	collisionHandler10 : function(tag, laser) {
		if(current_tag == 10)
		{
			tag.kill();
			current_tag++;
		}
		laser.kill();
	},

	collisionHandler11 : function(tag, laser) {
		if(current_tag ==11)
		{
			tag.kill();
			current_tag++;
		}
		laser.kill();
	},

	collisionHandler12 : function(tag, laser) {
		if(current_tag == 12)
		{
			tag.kill();
			current_tag++;
			game.state.start('Game_Over');
		}
		laser.kill();
	},

/*
	moveTags: function() {
		var sign = Math.floor((Math.random() * 4));
		if (sign === 0) {
			movingPlatform.body.velocity.y = Math.floor((Math.random() * 100) + 51);
			movingPlatform.body.velocity.x = Math.floor((Math.random() * 100) + 51);
		} else if (sign === 1) {
			movingPlatform.body.velocity.y = -(Math.floor((Math.random() * 100) + 51));
			movingPlatform.body.velocity.x = -(Math.floor((Math.random() * 100) + 51));
		} else if (sign === 2) {
			movingPlatform.body.velocity.y = (Math.floor((Math.random() * 100) + 51));
			movingPlatform.body.velocity.x = -(Math.floor((Math.random() * 100) + 51));
		} else if (sign === 3) {
			movingPlatform.body.velocity.y = -(Math.floor((Math.random() * 100) + 51));
			movingPlatform.body.velocity.x = (Math.floor((Math.random() * 100) + 51));
		}
	},
	*/

	fireLaser: function(){
	if (game.time.time > laserTime)
    {
        laser = lasers.getFirstExists(false);

        if (laser)
        {
            laser.reset(player.x + 16, player.y - 13);
            laser.body.velocity.y = -600;
            laserTime = game.time.time + 100;
        }
    }
	},

	
	update: function() {

		/*
		for(var i = 0; i < tags.length; i++)
		{
			game.physics.arcade.collide(player, tags[i]);
		}
		*/

		player.body.velocity.x = 0;
		player.body.velocity.y = 0;

		game.physics.arcade.overlap(lasers, doctype, this.collisionHandler0);
		game.physics.arcade.overlap(lasers, html, this.collisionHandler1);
		game.physics.arcade.overlap(lasers, head, this.collisionHandler2);
		game.physics.arcade.overlap(lasers, title, this.collisionHandler3);
		game.physics.arcade.overlap(lasers, html_tag_game, this.collisionHandler4);
		game.physics.arcade.overlap(lasers, slash_title, this.collisionHandler5);
		game.physics.arcade.overlap(lasers, slash_head, this.collisionHandler6);
		game.physics.arcade.overlap(lasers, bodyt, this.collisionHandler7);
		game.physics.arcade.overlap(lasers, p, this.collisionHandler8);
		game.physics.arcade.overlap(lasers, congratulations, this.collisionHandler9);
		game.physics.arcade.overlap(lasers, slash_p, this.collisionHandler10);
		game.physics.arcade.overlap(lasers, slash_body, this.collisionHandler11);
		game.physics.arcade.overlap(lasers, slash_html, this.collisionHandler12);


		if (cursors.left.isDown) {
			player.body.velocity.x = -250;
		} else if (cursors.right.isDown) {
			player.body.velocity.x = 250;
		}

		if (cursors.up.isDown) {
			player.body.velocity.y = -250;
		} else if (cursors.down.isDown) {
			player.body.velocity.y = 250;
		}
		/*
		if (count % 50 === 0) {
			this.moveTags();
		}
		count++;
		*/
		if (fireButton.isDown){
        	this.fireLaser();
    	}
	}

	
};
