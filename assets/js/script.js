// FUNCTION
function loadRules() {
  var randomNum = () => Math.random() * (config.ruleMax - config.ruleMin) + config.ruleMin
  rules = {
    green: {
      num: config.numberOfAtoms,
      green: randomNum(),
      red: randomNum(),
      yellow: randomNum(),
      blue: randomNum(),
    },
    red: {
      num: config.numberOfAtoms,
      green: randomNum(),
      red: randomNum(),
      yellow: randomNum(),
      blue: randomNum(),
    },
    yellow: {
      num: config.numberOfAtoms,
      green: randomNum(),
      red: randomNum(),
      yellow: randomNum(),
      blue: randomNum(),
    },
    blue: {
      num: config.numberOfAtoms,
      green: randomNum(),
      red: randomNum(),
      yellow: randomNum(),
      blue: randomNum(),
    },
  }
}
function draw(atom) {
  ctx.fillStyle = atom.color
  ctx.fillRect(atom.x, atom.y, config.atomSize, config.atomSize)
}
function createAtom(number, color) {
  var randomPosition = () => Math.random() * canvasWidth
  for (i = 0; i < number; i++) {
    atoms.push({
      x: randomPosition(),
      y: randomPosition(),
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

      dx = a.x - b.x
      dy = a.y - b.y
      d = Math.sqrt(dx ** 2 + dy ** 2)

      if (dx === 0 && dy === 0 || d > config.ray) continue

      F = rule / d
      fx += F * dx
      fy += F * dy
    }

    // SPEED
    a.vx = (a.vx + fx) * config.lostOfEnergy
    a.vy = (a.vy + fy) * config.lostOfEnergy

    // POSITION
    a.x = a.x + a.vx
    a.y = a.y + a.vy

    // COLLISION WITH CANVAS BORDER
    if (a.x <= 0) {
      a.x = 0
      a.vx *= -1
    }
    else if (a.x >= canvasWidth) {
      a.x = canvasWidth - config.atomSize
      a.vx *= -1
    }
    if (a.y <= 0) {
      a.y = 0
      a.vy *= -1
    }
    else if (a.y >= canvasWidth) {
      a.y = canvasWidth - config.atomSize
      a.vy *= -1
    }
  }
}
function newFrame() {
  readRules()

  ctx.clearRect(0, 0, canvasWidth, canvasWidth)
  draw(0, 0, 'black', canvasWidth)
  for (atom of atoms) draw(atom)
  requestAnimationFrame(newFrame)
}

// ---

const canvas = document.querySelector('canvas')
const canvasWidth = canvas.width
const ctx = canvas.getContext('2d')

let rules
const config = {
  numberOfAtoms: 100,
  atomSize: 2.5,
  ray: 150,
  ruleMax: 1,
  ruleMin: -1,
  lostOfEnergy: .5
}
const atoms = []

loadRules()
for (rule of Object.entries(rules)) createAtom(rule[1].num, rule[0])
newFrame()

document.addEventListener('keydown', loadRules)