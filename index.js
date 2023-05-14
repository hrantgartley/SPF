const canvas = document.getElementById('graph-canvas');
const ctx = canvas.getContext('2d');

function drawGraph() {
  // Draw the nodes
  for (let node in graph) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillText(node, x - 5, y - 25);
  }

  // Draw the edges
  for (let node in graph) {
    for (let neighbor in graph[node]) {
      const x1 = getX(node);
      const y1 = getY(node);
      const x2 = getX(neighbor);
      const y2 = getY(neighbor);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.fillText(graph[node][neighbor], (x1 + x2) / 2, (y1 + y2) / 2);
    }
  }
}

function getX(node) {
  return Math.random() * canvas.width;
}

function getY(node) {
  return Math.random() * canvas.height;
}

function drawShortestPath(path) {
  // Draw the shortest path
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(getX(path[0]), getY(path[0]));
  for (let i = 1; i < path.length; i++) {
    ctx.lineTo(getX(path[i]), getY(path[i]));
  }
  ctx.stroke();
}

document
  .getElementById('path-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const path = shortestPath(start, end);
    if (path) {
      drawGraph();
      drawShortestPath(path);
    }
  });
