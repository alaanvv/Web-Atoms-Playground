// RULES
const rules = {
    green: {
        num: 100,
        green: Math.random() * 2 - 1,
        red: Math.random() * 2 - 1,
        yellow: Math.random() * 2 - 1,
        blue: Math.random() * 2 - 1,
    },
    red: {
        num: 100,
        green: Math.random() * 2 - 1,
        red: Math.random() * 2 - 1,
        yellow: Math.random() * 2 - 1,
        blue: Math.random() * 2 - 1,
    },
    yellow: {
        num: 100,
        green: Math.random() * 2 - 1,
        red: Math.random() * 2 - 1,
        yellow: Math.random() * 2 - 1,
        blue: Math.random() * 2 - 1,
    },
    blue: {
        num: 100,
        green: Math.random() * 2 - 1,
        red: Math.random() * 2 - 1,
        yellow: Math.random() * 2 - 1,
        blue: Math.random() * 2 - 1,
    },
}

// CANVAS
const canvas = document.querySelector('canvas')
const canvasWidth = canvas.width
const ctx = canvas.getContext('2d')

const atoms = []
const atomSize = 5
const ray = 180

function draw(x, y, color, size) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
}
function random() {
    return Math.random() * canvasWidth
}
function createAtom(number, color) {
    for (i = 0; i < number; i++) {
        atoms.push({
            x: random(),
            y: random(),
            vx: 0,
            vy: 0,
            color: color,
        })
    }
}
function readRules() {
    for (a of atoms) {
        fx = 0
        fy = 0

        for (b of atoms) {
            if (a == b) continue
            rule = rules[a.color][b.color]
            if (rule == undefined) continue

            dx = a.x - b.x
            dy = a.y - b.y

            if (dx !== 0 || dy !== 0) {
                d = Math.sqrt(dx * dx + dy * dy)

                if (d < ray) {
                    F = rule / d
                    fx += F * dx
                    fy += F * dy
                }
            }
        }

        // SPEED
        a.vx = (a.vx + fx) * 0.5
        a.vy = (a.vy + fy) * 0.5

        // POSITION
        a.x = a.x + a.vx
        a.y = a.y + a.vy

        // COLLISION WITH CANVAS BORDER
        if (a.x <= 0) {
            a.x = 0
            a.vx *= -1
        }
        else if (a.x >= canvasWidth) {
            a.x = canvasWidth - atomSize
            a.vx *= -1
        }
        if (a.y <= 0) {
            a.y = 0
            a.vy *= -1
        }
        else if (a.y >= canvasWidth) {
            a.y = canvasWidth - atomSize
            a.vy *= -1
        }
    }
}
function newFrame() {
    readRules()

    ctx.clearRect(0, 0, canvasWidth, canvasWidth)
    draw(0, 0, 'black', canvasWidth)
    for (let atom of atoms) draw(atom.x, atom.y, atom.color, atomSize)
    requestAnimationFrame(newFrame)
}

for (rule of Object.entries(rules)) createAtom(rule[1].num, rule[0])
newFrame()