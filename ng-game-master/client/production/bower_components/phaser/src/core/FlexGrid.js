/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2014 Photon Storm Ltd.
* @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
*/

/**
* WARNING: This is an EXPERIMENTAL class. The API will change significantly in the coming versions and is incomplete.
* Please try to avoid using in production games with a long time to build.
* This is also why the documentation is incomplete.
* 
* FlexGrid is a a responsive grid manager that works in conjunction with the ScaleManager RESIZE scaling mode and FlexLayers
* to provide for game object positioning in a responsive manner.
*
* @class Phaser.FlexGrid
* @constructor
* @param {Phaser.ScaleManager} manager - The ScaleManager.
* @param {number} width - The width of the game.
* @param {number} height - The height of the game.
*/
Phaser.FlexGrid = function (manager, width, height) {

    /**
    * @property {Phaser.Game} game - A reference to the currently running Game.
    */
    this.game = manager.game;

    /**
    * @property {Phaser.ScaleManager} scale - A reference to the ScaleManager.
    */
    this.manager = manager;

    //  The perfect dimensions on which everything else is based
    this.width = width;
    this.height = height;

    this.boundsFluid = new Phaser.Rectangle(0, 0, width, height);
    this.boundsFull = new Phaser.Rectangle(0, 0, width, height);
    this.boundsNone = new Phaser.Rectangle(0, 0, width, height);

    /**
    * @property {Phaser.Point} position - 
    * @readonly
    */
    this.positionFluid = new Phaser.Point(0, 0);
    this.positionFull = new Phaser.Point(0, 0);
    this.positionNone = new Phaser.Point(0, 0);

    /**
    * @property {Phaser.Point} scaleFactor - The scale factor based on the game dimensions vs. the scaled dimensions.
    * @readonly
    */
    this.scaleFluid = new Phaser.Point(1, 1);
    this.scaleFluidInversed = new Phaser.Point(1, 1);
    this.scaleFull = new Phaser.Point(1, 1);
    this.scaleNone = new Phaser.Point(1, 1);

    this.ratioH = width / height;
    this.ratioV = height / width;

    this.multiplier = 0;

    this.layers = [];

};

Phaser.FlexGrid.prototype = {

    /**
     * Sets the core game size. This resets the w/h parameters and bounds.
     *
     * @method setSize
     * @param {number} width - The new dimensions.
     * @param {number} height - The new dimensions.
     */
    setSize: function (width, height) {

        //  These are locked and don't change until setSize is called again
        this.width = width;
        this.height = height;

        this.ratioH = width / height;
        this.ratioV = height / width;

        this.scaleNone = new Phaser.Point(1, 1);

        this.boundsNone.width = this.width;
        this.boundsNone.height = this.height;

        this.refresh();

    },

    //  Need ability to create your own layers with custom scaling, etc.

    /**
     * A fluid layer is centered on the game and maintains its aspect ratio as it scales up and down.
     *
     * @method createFluidLayer
     * @param {array} [children] - An array of children that are used to populate the FlexLayer.
     * @return {Phaser.FlexLayer} The Layer object.
     */
    createFluidLayer: function (children, addToWorld) {

        if (typeof addToWorld === 'undefined') { addToWorld = true; }

        var layer = new Phaser.FlexLayer(this, this.positionFluid, this.boundsFluid, this.scaleFluid);

        if (addToWorld)
        {
            this.game.world.add(layer);
        }

        this.layers.push(layer);

        if (typeof children !== 'undefined' && typeof children !== null)
        {
            layer.addMultiple(children);
        }

        return layer;

    },

    /**
     * A full layer is placed at 0,0 and extends to the full size of the game. Children are scaled according to the fluid ratios.
     *
     * @method createFullLayer
     * @param {array} [children] - An array of children that are used to populate the FlexLayer.
     * @return {Phaser.FlexLayer} The Layer object.
     */
    createFullLayer: function (children) {

        var layer = new Phaser.FlexLayer(this, this.positionFull, this.boundsFull, this.scaleFluid);

        this.game.world.add(layer);

        this.layers.push(layer);

        if (typeof children !== 'undefined')
        {
            layer.addMultiple(children);
        }

        return layer;

    },

    /**
     * A fixed layer is centered on the game and is the size of the required dimensions and is never scaled.
     *
     * @method createFixedLayer
     * @param {array} [children] - An array of children that are used to populate the FlexLayer.
     * @return {Phaser.FlexLayer} The Layer object.
     */
    createFixedLayer: function (children) {

        var layer = new Phaser.FlexLayer(this, this.positionNone, this.boundsNone, this.scaleNone);

        this.game.world.add(layer);

        this.layers.push(layer);

        if (typeof children !== 'undefined')
        {
            layer.addMultiple(children);
        }

        return layer;

    },

    /**
     * Resets the layer children references
     *
     * @method reset
     */
    reset: function () {

        var i = this.layers.length;

        while (i--)
        {
            if (!this.layers[i].persist)
            {
                //  Remove references to this class
                this.layers[i].position = null;
                this.layers[i].scale = null;
                this.layers.slice(i, 1);
            }
        }

    },

    /**
     * Called when the game container changes dimensions.
     *
     * @method onResize
     * @param {number} width - The new width of the game container.
     * @param {number} height - The new height of the game container.
     */
    onResize: function (width, height) {

        this.refresh(width, height);

    },

    /**
     * Updates all internal vars such as the bounds and scale values.
     *
     * @method refresh
     */
    refresh: function () {

        this.multiplier = Math.min((this.manager.height / this.height), (this.manager.width / this.width));

        this.boundsFluid.width = Math.round(this.width * this.multiplier);
        this.boundsFluid.height = Math.round(this.height * this.multiplier);

        this.scaleFluid.set(this.boundsFluid.width / this.width, this.boundsFluid.height / this.height);
        this.scaleFluidInversed.set(this.width / this.boundsFluid.width, this.height / this.boundsFluid.height);

        this.scaleFull.set(this.boundsFull.width / this.width, this.boundsFull.height / this.height);

        this.boundsFull.width = this.manager.width * this.scaleFluidInversed.x;
        this.boundsFull.height = this.manager.height * this.scaleFluidInversed.y;

        this.boundsFluid.centerOn(this.manager.bounds.centerX, this.manager.bounds.centerY);
        this.boundsNone.centerOn(this.manager.bounds.centerX, this.manager.bounds.centerY);

        this.positionFluid.set(this.boundsFluid.x, this.boundsFluid.y);
        this.positionNone.set(this.boundsNone.x, this.boundsNone.y);

    },

    /**
     * Call in the render function to output the bounds rects.
     *
     * @method debug
     */
    debug: function () {

        // for (var i = 0; i < this.layers.length; i++)
        // {
        //     this.layers[i].debug();
        // }

        this.game.debug.text(this.boundsFull.width + ' x ' + this.boundsFull.height, this.boundsFull.x + 4, this.boundsFull.y + 16);
        this.game.debug.geom(this.boundsFull, 'rgba(0,0,255,0.9', false);

        this.game.debug.text(this.boundsFluid.width + ' x ' + this.boundsFluid.height, this.boundsFluid.x + 4, this.boundsFluid.y + 16);
        this.game.debug.geom(this.boundsFluid, 'rgba(255,0,0,0.9', false);

        this.game.debug.text(this.boundsNone.width + ' x ' + this.boundsNone.height, this.boundsNone.x + 4, this.boundsNone.y + 16);
        this.game.debug.geom(this.boundsNone, 'rgba(0,255,0,0.9', false);

    }

};

Phaser.FlexGrid.prototype.constructor = Phaser.FlexGrid;
