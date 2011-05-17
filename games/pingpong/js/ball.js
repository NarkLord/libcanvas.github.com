
Pong.Ball = atom.Class({
	Implements: [ Drawable ],

	impulse: null,

	initialize: function (controller) {
		this.impulse = new Point(
			100 + Number.random(25, 75),
			100 + Number.random(25, 75)
		);
		this.controller = controller;
	},

	appendTo: function (field) {
		this.shape = new Rectangle(
			 40, field.height / 2, 24, 24
		);
		this.field = field;
		return this;
	},

	move: function (time) {
		this.shape.move(
			this.impulse.clone().mul(time / 1000)
		);
	},

	checkCollisions: function () {
		var coll = this.field.collidesUnits( this ),
		    isOut = this.field.isOut( this.shape );


		if (isOut) {
			if (
				(isOut < 0 && this.impulse.x < 0) ||
				(isOut > 0 && this.impulse.x > 0)
			) this.impulse.x *= -1;
		} else if (coll) {
			if (
				(coll < 0 && this.impulse.x < 0) ||
				(coll > 0 && this.impulse.x > 0)
			) this.impulse.x *= -1;
		}
	},

	update: function (time) {
		this.move(time);

		var from = this.shape.from, to = this.shape.to;

		if (
			(this.impulse.y < 0 && from.y < 0) ||
			(this.impulse.y > 0 && to.y > this.field.height)
		) this.impulse.y *= -1;

		this.checkCollisions();
	},

	draw: function () {
		this.libcanvas.ctx.drawImage({
			image: this.libcanvas.getImage('elems').sprite( 23, 0, 26, 26 ),
			draw : this.shape
		});
	}

});