/* compact way of setting PI = Math.PI, sin = Math.sin & so on... :D */
Object.getOwnPropertyNames(Math).map(function(p) {
  window[p] = Math[p];
});

var GRID_DISTANCE = 84,
  DOT_RADIUS = 5,
  PROXIMITY_FACTOR = 4,
  BG_DOT_LIGHTNESS = 1,
  canvas = document.querySelector('.bg-animation') /* canvas element */,
  w /* canvas width */,
  h /* canvas height */,
  d /* canvas diagonal */,
  ctx = canvas.getContext('2d') /* canvas context */,
  grid = [],
  n_grid,
  rows,
  cols,
  offset_x,
  offset_y,
  curr_point = null,
  t = 0,
  cutoff,
  bg_dot_c;

/* OBJECTS USED */
var Dot = function(x, y) {
  this.pos = { x: x || 0, y: y || 0 };
  this.radius = DOT_RADIUS;
  this.fill = bg_dot_c;

  this.setShade = function(point) {
    var dx = point.x - this.pos.x,
      dy = point.y - this.pos.y,
      _d = sqrt(dx * dx + dy * dy),
      f = ((cutoff - _d) / cutoff).toFixed(2);

    if (_d > cutoff) {
      this.fill = bg_dot_c;
      return;
    }

    this.fill = 'hsla(203, 8%, 54%, 0.3)';
  };

  this.draw = function(ctxt) {
    ctxt.fillStyle = this.fill;
    ctxt.beginPath();
    ctxt.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * PI);
    ctxt.closePath();
    ctxt.fill();
  };

  this.connect = function(ctxt, point) {
    if (this.fill == bg_dot_c) return;

    ctxt.strokeStyle = this.fill;
    ctxt.beginPath();
    ctxt.moveTo(this.pos.x, this.pos.y);
    ctxt.lineTo(point.x, point.y);
    ctxt.closePath();
    ctxt.stroke();
  };
};

/* FUNCTIONS */
var initCanvas = function() {
  var s = getComputedStyle(canvas);

  grid = [];

  w = canvas.width = ~~s.width.split('px')[0];
  h = canvas.height = ~~s.height.split('px')[0];
  d = sqrt(pow(w, 2) + pow(h, 2));

  if (DOT_RADIUS < 2) {
    DOT_RADIUS = 2;
  }
  if (GRID_DISTANCE <= DOT_RADIUS) {
    GRID_DISTANCE = DOT_RADIUS + 1;
  }
  if (PROXIMITY_FACTOR < 0.8) {
    PROXIMITY_FACTOR = 0.8;
  }

  bg_dot_c = 'hsl(0, 0%, ' + BG_DOT_LIGHTNESS + '%)';

  cutoff = PROXIMITY_FACTOR * GRID_DISTANCE;

  rows = round((h - 20) / GRID_DISTANCE);
  cols = round((w - 20) / GRID_DISTANCE);

  offset_x = (w - (cols - 1) * GRID_DISTANCE) / 2;
  offset_y = (h - (rows - 1) * GRID_DISTANCE) / 2;

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      grid.push(
        new Dot(offset_x + j * GRID_DISTANCE, offset_y + i * GRID_DISTANCE)
      );
    }
  }

  n_grid = grid.length;

  ctx.clearRect(0, 0, w, h);
  ctx.lineWidth = 2;

  drawOnCanvas();
};

var drawOnCanvas = function() {
  ctx.clearRect(0, 0, w, h);

  for (var i = 0; i < n_grid; i++) {
    if (curr_point) {
      grid[i].setShade(curr_point);
    }
    grid[i].draw(ctx);
  }

  for (var i = 0; i < n_grid; i++) {
    if (curr_point) {
      grid[i].connect(ctx, curr_point);
    }
  }

  t++;
};

if (!window.matchMedia('(max-width: 1140px)').matches) {
  /* START THE MADNESS */
  setTimeout(function() {
    initCanvas();

    /* fix looks on resize */
    addEventListener('resize', initCanvas, false);

    document.body.addEventListener(
      'mousemove',
      function(e) {
        curr_point = {
          x: e.clientX,
          y: e.clientY
        };

        drawOnCanvas();
      },
      false
    );
  }, 15);
}
