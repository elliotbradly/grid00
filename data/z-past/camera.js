function CircularCollision(circle1, circle2) {
    let dx = circle1.x - circle2.x;
    let dy = circle1.y - circle2.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < circle1.r + circle2.r) {
        return true;
    }
}

function RectCircleCollision(circle, rect) {
    let distX = Math.abs(circle.x - rect.x - rect.w/2);
    let distY = Math.abs(circle.y - rect.y - rect.h/2);

    if (distX > (rect.w/2 + circle.r)) { return false; }
    if (distY > (rect.h/2 + circle.r)) { return false; }

    if (distX <= (rect.w/2)) { return true; } 
    if (distY <= (rect.h/2)) { return true; }

    let dx = distX - rect.w/2;
    let dy = distY - rect.h/2;
    return (dx**2 + dy**2 <= circle.r**2);
}

let canvas = document.getElementById('canvas');
canvas.width = 600;
canvas.height = 600;

const camera = {
    get x () {
        return -(canvas.width / 2 - player.x);
    },
    get y () {
        return -(canvas.height / 2 - player.y);
    }
};

let ctx = canvas.getContext('2d');
let random = (min, max) => ~~(Math.random() * (max - min) + min);
let cells = [];
let colors = ['red', 'green', 'blue'];
let player = {
    x: 200,
    y: 200,
    r: 20,
    color: 'dodgerblue',
    angle: 0,
    aim: {
        x: 200,
        y: 200,
    },
    score: 0,
    isHit: false
};

let block = {
    x: 0,
    y: 0,
    w: canvas.width / 3,
    h: 30
}

for (let i = 0; i < 20; i++) {
    cells.push({
        x: random(0, canvas.width),
        y: random(0, canvas.height),
        r: 5,
        color: colors[random(0, colors.length)]
    })
}
function arc (obj) {
    ctx.fillStyle = obj.color;
    ctx.beginPath();
    ctx.arc(obj.x - camera.x, obj.y, obj.r || 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function loop () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(-camera.x, 0, canvas.width, canvas.height);
    block.y += 7;
    if (block.y > canvas.height) {
        block.x = [0, canvas.width/3, canvas.width*2/3][random(0, 3)]
        block.y = -100;
    }

    if (!player.isHit && RectCircleCollision(player, block)) {
        player.score -= 100;
        if (player.score < 0) player.score = 0;
        player.r -= 10;
        if (player.r < 10) player.r = 10;
        player.isHit = true;
        setTimeout(() => player.isHit = false, 2000);
    }
    
    let distanceX = player.x - player.aim.x - camera.x;
    let distanceY = player.y - player.aim.y;
    
    player.angle = -Math.atan2(distanceY, -distanceX);
    
    let vx = Math.cos(player.angle);
    let vy = Math.sin(player.angle);

    if (!CircularCollision(player, {x: player.aim.x + camera.x, y: player.aim.y, r: 1})) {
        player.x += vx * 5;
        player.y += vy * 5;
        // is player out of the map
        let {x, y, r} = player;
        let skewX = false;
        let skewY = false;
        if (x - r <= 0) {
            player.x = r;
            skewX = true;
        }
        else if (x + r > canvas.width) {
            player.x = canvas.width - r;
            skewX = true;
        }
        if (y - y < 0) {
            player.y = r;
            skewY = true;
        }
        else if (y + r > canvas.height) {
            player.y = canvas.height - r;
            skewY = true;
        }
        if (skewX || skewY) {
            ctx.fillStyle = player.color;
            ctx.beginPath();
            ctx.ellipse(player.x - camera.x, player.y, skewX ? r-5 : r, skewY ? r-5 : r, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        } else arc(player);
    } else arc(player)

    for (let i = 0; i < cells.length; i++) {
        if (CircularCollision(player, cells[i])) {
            cells[i] = {
                x: random(0, canvas.width),
                y: random(0, canvas.height),
                r: 5,
                color: colors[random(0, colors.length)]
            }
            player.score += 10;
            if (player.r < 50) {
                player.r += 2;
            }
        }
        else arc(cells[i]);
    }
    ctx.fillStyle = 'purple';
    ctx.fillRect(block.x - camera.x, block.y, block.w, block.h);

    ctx.font = '40px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText(`Score: ${player.score}`, 20, 50);
    requestAnimationFrame(loop);
}
loop();

canvas.addEventListener('mousemove', e => {
    player.aim = {
        x: e.clientX,
        y: e.clientY
    }
})
