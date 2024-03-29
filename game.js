var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var garbage;
var platforms;
var bombs;
var game;
var worldWidth=1000;
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/space.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('garbage', 'assets/garbage.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('dude', 'assets/player.png');
    this.load.image('platformStart', 'assets/platformStart.png');
    this.load.image('platformOne', 'assets/platformOne.png');
    this.load.image('platformFinish', 'assets/platformFinish.png');
   
}

function create ()
{
  
    // this.add.image(400, 300, 'sky');
    this.add.tileSprite(0, 0, worldWidth, 1000, "sky")
        .setOrigin(0, 0)
        .setScale(1)
        .setDepth(0);

   
    platforms = this.physics.add.staticGroup();

    for (var x = 0; x < worldWidth; x = x + 40) {
        //console.log(x)
        platforms
            .create(x, 450, 'ground')
            .setOrigin(0, 0)
            .refreshBody()
            .setDepth(0);
    }

    garbage = this.physics.add.group({
        key: 'garbage',
        repeat: 10,
        setXY: { x: 12, y: 0, stepX: 110 }
    });

    garbage.children.iterate(function (child) { 
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)); 
    });
   
    this.physics.add.collider(garbage, platforms);


    player = this.physics.add.sprite(110, 370, 'dude');

    player
    .setBounce(0.2)
    .setDepth(5)
    .setCollideWorldBounds(true);
    player.body.setGravityY(300)
        this.physics.add.collider(platforms, player );
    cursors = this.input.keyboard.createCursorKeys();
   
    scoreText = this.add.text(16, 16, 'Очок: 0', { fontSize: '32px', fill: '#FFF' }); // додати текст до текстової змінної очків
    timerText = this.add.text(16, 50, 'Час: 00:00.0', { fontSize: '32px', fill: '#FFF' }); // додати початковий текст до таймера


}
function update ()
{
    if (cursors.left.isDown)
{
    player.setVelocityX(-160);

    player.anims.play('left', true);
}
else if (cursors.right.isDown)
{
    player.setVelocityX(160);

    player.anims.play('right', true);
}
else
{
    player.setVelocityX(0);

    player.anims.play('turn');
}

if (cursors.up.isDown && player.body.touching.down)
{
    player.setVelocityY(-330);
}
}
function collectGarbage(player, garbage)
{
}