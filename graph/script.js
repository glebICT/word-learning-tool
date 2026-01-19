let canvas, ctx, statusEl;
let currentLevel = 0;
let nodes = [];
let edges = [];
let brokenNodes = new Set();
let currentPath = [];
let gameData = null;

function initGame() {
  canvas = document.getElementById("graph");
  ctx = canvas.getContext("2d");
  statusEl = document.getElementById("status");

  // INLINE DATA - No CORS issues
  gameData = {
    levels: [
      {
        name: "Basic Path",
        nodes: [
          { id: "Sender", x: 100, y: 300 },
          { id: "AS1", x: 400, y: 300 },
          { id: "Receiver", x: 800, y: 300 },
        ],
        edges: [
          { from: 0, to: 1 },
          { from: 1, to: 2 },
        ],
        broken: [],
      },
      {
        name: "Alternate Route",
        nodes: [
          { id: "Sender", x: 100, y: 300 },
          { id: "AS1", x: 300, y: 200 },
          { id: "AS2", x: 300, y: 400 },
          { id: "Receiver", x: 800, y: 300 },
        ],
        edges: [
          { from: 0, to: 1 },
          { from: 0, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 3 },
        ],
        broken: ["AS1"],
      },
      {
        name: "Multiple Failures",
        nodes: [
          { id: "Sender", x: 100, y: 300 },
          { id: "AS1", x: 250, y: 150 },
          { id: "AS2", x: 250, y: 450 },
          { id: "AS3", x: 450, y: 250 },
          { id: "AS4", x: 450, y: 350 },
          { id: "Receiver", x: 800, y: 300 },
        ],
        edges: [
          { from: 0, to: 1 },
          { from: 0, to: 2 },
          { from: 1, to: 3 },
          { from: 2, to: 4 },
          { from: 3, to: 5 },
          { from: 4, to: 5 },
        ],
        broken: ["AS1", "AS3"],
      },
      {
        name: "Complex Network",
        nodes: [
          { id: "Sender", x: 100, y: 300 },
          { id: "AS1", x: 250, y: 200 },
          { id: "AS2", x: 250, y: 400 },
          { id: "AS3", x: 450, y: 150 },
          { id: "AS4", x: 450, y: 350 },
          { id: "AS5", x: 650, y: 250 },
          { id: "Receiver", x: 800, y: 300 },
        ],
        edges: [
          { from: 0, to: 1 },
          { from: 0, to: 2 },
          { from: 1, to: 3 },
          { from: 1, to: 4 },
          { from: 2, to: 4 },
          { from: 3, to: 5 },
          { from: 4, to: 5 },
          { from: 4, to: 6 },
          { from: 5, to: 6 },
        ],
        broken: ["AS2"],
      },
    ],
  };

  updateLevelSelect();
  loadLevel();
}

function updateLevelSelect() {
  const select = document.getElementById("levelSelect");
  select.innerHTML = "";
  gameData.levels.forEach((level, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `Level ${index + 1}: ${level.name}`;
    select.appendChild(option);
  });
}

function loadLevel() {
  currentLevel = parseInt(document.getElementById("levelSelect").value);
  const level = gameData.levels[currentLevel];

  nodes = level.nodes;
  edges = level.edges;
  brokenNodes = new Set(level.broken);
  currentPath = [];

  statusEl.textContent = `Level ${currentLevel + 1}: ${level.name} - Broken: ${Array.from(brokenNodes).join(", ") || "None"}`;
  draw();
}

function resetLevel() {
  const level = gameData.levels[currentLevel];
  brokenNodes = new Set(level.broken);
  currentPath = [];
  statusEl.textContent = `Level ${currentLevel + 1} Reset - Broken: ${Array.from(brokenNodes).join(", ") || "None"}`;
  draw();
}

function draw() {
  ctx.clearRect(0, 0, 900, 600);

  // Draw edges
  edges.forEach((edge) => {
    const fromNode = nodes[edge.from];
    const toNode = nodes[edge.to];
    if (!brokenNodes.has(fromNode.id) && !brokenNodes.has(toNode.id)) {
      ctx.strokeStyle = "var(--edge-color)";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.stroke();
    }
  });

  // Draw nodes - BIGGER SENDER/RECEIVER + NORMAL FONT
  nodes.forEach((node, index) => {
    // Sender/Receiver: 35px radius, AS nodes: 25px
    const radius = node.id === "Sender" || node.id === "Receiver" ? 35 : 25;

    ctx.fillStyle = brokenNodes.has(node.id)
      ? "var(--node-broken)"
      : node.id === "Sender"
        ? "var(--node-sender)"
        : node.id === "Receiver"
          ? "var(--node-receiver)"
          : "var(--node-normal)";
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = currentPath.includes(index)
      ? "var(--path-highlight)"
      : "#00000080";
    ctx.lineWidth = currentPath.includes(index) ? 6 : 2;
    ctx.stroke();

    // Sender/Receiver: normal font, AS: bold
    ctx.font =
      node.id === "Sender" || node.id === "Receiver"
        ? "16px Arial"
        : "bold 14px Arial";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.id, node.x, node.y);
  });
}

function findPath() {
  switch (currentLevel) {
    case 0:
      return [0, 1, 2];
    case 1:
      return brokenNodes.has("AS1") ? [0, 2, 3] : [0, 1, 3];
    case 2:
      return [0, 2, 4, 5];
    case 3:
      return [0, 1, 4, 6];
    default:
      return [];
  }
}

function sendPacket() {
  currentPath = findPath();
  const receiverIdx = nodes.findIndex((n) => n.id === "Receiver");
  const success =
    currentPath.length > 0 &&
    currentPath[currentPath.length - 1] === receiverIdx;

  if (success) {
    statusEl.textContent = `✓ SUCCESS! Path: ${currentPath.map((i) => nodes[i].id).join(" → ")}`;
    statusEl.style.color = "#28a745";
  } else {
    statusEl.textContent =
      "✗ FAILED - No path found. Check your findPath() algorithm!";
    statusEl.style.color = "#dc3545";
  }

  draw();
  setTimeout(() => {
    currentPath = [];
    draw();
    statusEl.style.color = "";
  }, 4000);
}

function toggleBroken() {
  const candidates = nodes.slice(1, -1);
  const randNode = candidates[Math.floor(Math.random() * candidates.length)];

  if (brokenNodes.has(randNode.id)) {
    brokenNodes.delete(randNode.id);
  } else {
    brokenNodes.add(randNode.id);
  }

  statusEl.textContent = `Toggled ${randNode.id} - Broken: ${Array.from(brokenNodes).join(", ") || "None"}`;
  draw();
}
