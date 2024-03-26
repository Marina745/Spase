var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('space', 'assets/space.png');
}

function create ()
{
    this.add.image(1000, 500, 'space'); 
}

function update ()
{
}