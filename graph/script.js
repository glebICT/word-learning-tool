let canvas, ctx, statusEl;
let currentLevel = 0;
let nodes = [];
let edges = [];
let brokenNodes = new Set();
let currentPath = [];
let gameData = null;

async function initGame() {
  canvas = document.getElementById("graph");
  ctx = canvas.getContext("2d");
  statusEl = document.getElementById("status");

  // Load JSON data
  try {
    const response = await fetch("data.json");
    gameData = await response.json();
    updateLevelSelect();
    
    // Add event listener for automatic level loading
    document.getElementById("levelSelect").addEventListener("change", loadLevel);
    
    loadLevel();
  } catch (error) {
    console.error("Failed to load data.json:", error);
    statusEl.textContent =
      "Error: Could not load levels.";
  }
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
  statusEl.style.color = "black";
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

  // Draw edges (skip broken connections)
  edges.forEach((edge) => {
    const fromNode = nodes[edge.from];
    const toNode = nodes[edge.to];
    if (!brokenNodes.has(fromNode.id) && !brokenNodes.has(toNode.id)) {
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.stroke();
    }
  });

  // Draw nodes
  nodes.forEach((node, index) => {
    ctx.fillStyle = brokenNodes.has(node.id)
      ? "red"
      : node.id === "S"
        ? "lightgreen"
        : node.id === "R"
          ? "orange"
          : "lightblue";
    ctx.beginPath();
    ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = currentPath.includes(index) ? "yellow" : "black";
    ctx.lineWidth = currentPath.includes(index) ? 6 : 2;
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.id, node.x, node.y);
  });
}

function findPath() {
  const senderIdx = nodes.findIndex((n) => n.id === "S");
  const receiverIdx = nodes.findIndex((n) => n.id === "R");
  
  // Debug logging
  console.log("Current level:", currentLevel);
  console.log("Broken nodes:", Array.from(brokenNodes));
  console.log("Available nodes:", nodes.map(n => n.id));

  // Validate if a path is actually possible given broken nodes
  function isValidPath(path) {
    // Check if any nodes in path are broken
    for (let i = 0; i < path.length; i++) {
      if (brokenNodes.has(nodes[path[i]].id)) {
        return false;
      }
    }
    
    // Check if edges exist between consecutive nodes (directed edges)
    for (let i = 0; i < path.length - 1; i++) {
      const fromNode = path[i];
      const toNode = path[i + 1];
      const hasEdge = edges.some(edge => 
        edge.from === fromNode && edge.to === toNode
      );
      if (!hasEdge) {
        return false;
      }
    }
    
    return true;
  }

  // Get valid paths from data.json for current level
  const level = gameData.levels[currentLevel];
  const validPaths = level.validPaths || [];
  
  // Try each valid path until we find one that works with current broken nodes
  for (const path of validPaths) {
    if (isValidPath(path)) {
      return path;
    }
  }
  
  return []; // No valid path found
}

function sendPacket() {
  currentPath = findPath();
  const receiverIdx = nodes.findIndex((n) => n.id === "R");
  const success =
    currentPath.length > 0 &&
    currentPath[currentPath.length - 1] === receiverIdx;

  if (success) {
    statusEl.textContent = `✓ SUCCESS! Path: ${currentPath.map((i) => nodes[i].id).join(" → ")}`;
    statusEl.style.color = "green";
  } else {
    statusEl.textContent =
      "✗ FAILED - No path found.";
    statusEl.style.color = "red";
  }

  draw();
  setTimeout(() => {
    currentPath = [];
    draw();
    statusEl.style.color = "black";
  }, 4000);
}

function toggleBroken() {
  const candidates = nodes.slice(1, -1); // Skip sender/receiver
  const randNode = candidates[Math.floor(Math.random() * candidates.length)];

  if (brokenNodes.has(randNode.id)) {
    brokenNodes.delete(randNode.id);
  } else {
    brokenNodes.add(randNode.id);
  }

  statusEl.textContent = `Toggled ${randNode.id} - Broken: ${Array.from(brokenNodes).join(", ") || "None"}`;
  draw();
}
initGame();
