
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: document.body.clientWidth,
        height: 800,
        //wireframes: false
    }
});

// create pegs
let pegs = [];
var spacing = 50;
let rows = 10;
let cols = rows+1; // must be an odd number
let midpoint = Math.ceil(cols/2);
console.log(midpoint);
let xoffset = (document.body.clientWidth - spacing*cols)/2;
let yoffset = (document.body.clientHeight - spacing*rows)/2;

for (var j = 0; j < rows; j++) {
    let extra = 0;
    if (j%2 == 0) {extra = 1}

    for (var i = 0; i < cols; i++) {
        // dont add pegs outside of the triangle shape
        if(!(i+1 >= midpoint-(j/2) && i+extra <= midpoint+(j/2))) {
            continue;
        }

        // offset every 2nd row
        var x = xoffset + i * spacing;
        if (j % 2 == 0) {
        x += spacing / 2;
        }

        var y = yoffset + spacing + j * spacing;
        var p = Bodies.circle(x, y, 6, {isStatic: true});
        pegs.push(p);
  }
}


var ground = Bodies.rectangle(document.body.clientWidth/2, document.body.clientHeight, document.body.clientWidth, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, pegs);
Composite.add(engine.world, ground);

// run the renderer
Render.run(render);
// create runner
var runner = Runner.create();
// run the engine
Runner.run(runner, engine);

// spawn plinko ball on mouseclick
document.addEventListener('mousedown', function(e) {
    let x = (document.body.clientWidth)/2;
    let y = 160;
    x += getRandom(-1, 1);

    let c = Bodies.circle(x, y, 8);
    c.restitution = 0.4;
    Composite.add(engine.world, c);
})

