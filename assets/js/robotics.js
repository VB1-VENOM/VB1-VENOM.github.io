(function initRoboticsBackground() {
  const svg = document.getElementById('robotics-bg');
  if (!svg) return;

  const ns = 'http://www.w3.org/2000/svg';
  const width = svg.clientWidth || 800;
  const height = svg.clientHeight || 600;
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  // gradient background grid
  const defs = document.createElementNS(ns, 'defs');
  const grad = document.createElementNS(ns, 'linearGradient');
  grad.setAttribute('id', 'grid-grad');
  grad.setAttribute('x1', '0');
  grad.setAttribute('y1', '0');
  grad.setAttribute('x2', '1');
  grad.setAttribute('y2', '1');
  const stop1 = document.createElementNS(ns, 'stop');
  stop1.setAttribute('offset', '0%');
  stop1.setAttribute('stop-color', 'rgba(167,139,250,0.25)');
  const stop2 = document.createElementNS(ns, 'stop');
  stop2.setAttribute('offset', '100%');
  stop2.setAttribute('stop-color', 'rgba(125,211,252,0.15)');
  grad.appendChild(stop1); grad.appendChild(stop2);
  defs.appendChild(grad);
  svg.appendChild(defs);

  const grid = document.createElementNS(ns, 'g');
  grid.setAttribute('opacity', '0.4');
  for (let x = 0; x < width; x += 40) {
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', String(x));
    line.setAttribute('y1', '0');
    line.setAttribute('x2', String(x));
    line.setAttribute('y2', String(height));
    line.setAttribute('stroke', 'url(#grid-grad)');
    line.setAttribute('stroke-width', '1');
    grid.appendChild(line);
  }
  for (let y = 0; y < height; y += 40) {
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', '0');
    line.setAttribute('y1', String(y));
    line.setAttribute('x2', String(width));
    line.setAttribute('y2', String(y));
    line.setAttribute('stroke', 'url(#grid-grad)');
    line.setAttribute('stroke-width', '1');
    grid.appendChild(line);
  }
  svg.appendChild(grid);

  // Multiple robotic arms and drones
  const arms = [];
  const drones = [];
  
  // Create 3 robotic arms at different positions
  for (let i = 0; i < 3; i++) {
    const arm = {
      baseX: width * (0.15 + i * 0.3),
      baseY: height * (0.7 + i * 0.1),
      link1: 180 - i * 20,
      link2: 140 - i * 15,
      angle1: 0,
      angle2: 0,
      targetX: width * (0.3 + i * 0.2),
      targetY: height * (0.4 + i * 0.1),
      elements: {}
    };
    
    // Create arm elements
    arm.elements.linkPath1 = document.createElementNS(ns, 'line');
    arm.elements.linkPath1.setAttribute('stroke', 'rgba(255,255,255,0.6)');
    arm.elements.linkPath1.setAttribute('stroke-width', '4');
    arm.elements.linkPath1.setAttribute('stroke-linecap', 'round');
    
    arm.elements.linkPath2 = document.createElementNS(ns, 'line');
    arm.elements.linkPath2.setAttribute('stroke', 'rgba(255,255,255,0.6)');
    arm.elements.linkPath2.setAttribute('stroke-width', '4');
    arm.elements.linkPath2.setAttribute('stroke-linecap', 'round');
    
    arm.elements.joint1 = document.createElementNS(ns, 'circle');
    arm.elements.joint1.setAttribute('r', '8');
    arm.elements.joint1.setAttribute('fill', 'rgba(125,211,252,0.8)');
    
    arm.elements.joint2 = document.createElementNS(ns, 'circle');
    arm.elements.joint2.setAttribute('r', '6');
    arm.elements.joint2.setAttribute('fill', 'rgba(167,139,250,0.8)');
    
    arm.elements.endEff = document.createElementNS(ns, 'circle');
    arm.elements.endEff.setAttribute('r', '4');
    arm.elements.endEff.setAttribute('fill', 'rgba(52,211,153,0.8)');
    
    svg.appendChild(arm.elements.linkPath1);
    svg.appendChild(arm.elements.linkPath2);
    svg.appendChild(arm.elements.joint1);
    svg.appendChild(arm.elements.joint2);
    svg.appendChild(arm.elements.endEff);
    
    arms.push(arm);
  }

  // Create 4 drones
  for (let i = 0; i < 4; i++) {
    const drone = {
      x: width * (0.1 + i * 0.2),
      y: height * (0.2 + i * 0.15),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.3,
      angle: 0,
      elements: {}
    };
    
    // Create drone body
    drone.elements.body = document.createElementNS(ns, 'ellipse');
    drone.elements.body.setAttribute('cx', String(drone.x));
    drone.elements.body.setAttribute('cy', String(drone.y));
    drone.elements.body.setAttribute('rx', '12');
    drone.elements.body.setAttribute('ry', '8');
    drone.elements.body.setAttribute('fill', 'rgba(125,211,252,0.7)');
    
    // Create propellers
    drone.elements.prop1 = document.createElementNS(ns, 'line');
    drone.elements.prop1.setAttribute('stroke', 'rgba(255,255,255,0.5)');
    drone.elements.prop1.setAttribute('stroke-width', '2');
    drone.elements.prop1.setAttribute('x1', String(drone.x - 8));
    drone.elements.prop1.setAttribute('y1', String(drone.y));
    drone.elements.prop1.setAttribute('x2', String(drone.x + 8));
    drone.elements.prop1.setAttribute('y2', String(drone.y));
    
    drone.elements.prop2 = document.createElementNS(ns, 'line');
    drone.elements.prop2.setAttribute('stroke', 'rgba(255,255,255,0.5)');
    drone.elements.prop2.setAttribute('stroke-width', '2');
    drone.elements.prop2.setAttribute('x1', String(drone.x));
    drone.elements.prop2.setAttribute('y1', String(drone.y - 8));
    drone.elements.prop2.setAttribute('x2', String(drone.x));
    drone.elements.prop2.setAttribute('y2', String(drone.y + 8));
    
    // Create LED indicator
    drone.elements.led = document.createElementNS(ns, 'circle');
    drone.elements.led.setAttribute('cx', String(drone.x));
    drone.elements.led.setAttribute('cy', String(drone.y));
    drone.elements.led.setAttribute('r', '2');
    drone.elements.led.setAttribute('fill', 'rgba(52,211,153,0.9)');
    
    svg.appendChild(drone.elements.body);
    svg.appendChild(drone.elements.prop1);
    svg.appendChild(drone.elements.prop2);
    svg.appendChild(drone.elements.led);
    
    drones.push(drone);
  }

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  let targetX = width * 0.6;
  let targetY = height * 0.4;

  function updateArm(arm) {
    // inverse kinematics for 2-link arm
    const dx = arm.targetX - arm.baseX;
    const dy = arm.targetY - arm.baseY;
    const dist = Math.hypot(dx, dy);
    const d = clamp(dist, 1, arm.link1 + arm.link2 - 1);
    const cosA2 = clamp((d*d - arm.link1*arm.link1 - arm.link2*arm.link2) / (2*arm.link1*arm.link2), -1, 1);
    const a2 = Math.acos(cosA2);
    const k1 = arm.link1 + arm.link2 * cosA2;
    const k2 = arm.link2 * Math.sin(a2);
    const a1 = Math.atan2(dy, dx) - Math.atan2(k2, k1);

    const j1x = arm.baseX;
    const j1y = arm.baseY;
    const j2x = j1x + arm.link1 * Math.cos(a1);
    const j2y = j1y + arm.link1 * Math.sin(a1);
    const ex = j2x + arm.link2 * Math.cos(a1 + a2);
    const ey = j2y + arm.link2 * Math.sin(a1 + a2);

    arm.elements.linkPath1.setAttribute('x1', String(j1x));
    arm.elements.linkPath1.setAttribute('y1', String(j1y));
    arm.elements.linkPath1.setAttribute('x2', String(j2x));
    arm.elements.linkPath1.setAttribute('y2', String(j2y));
    arm.elements.linkPath2.setAttribute('x1', String(j2x));
    arm.elements.linkPath2.setAttribute('y1', String(j2y));
    arm.elements.linkPath2.setAttribute('x2', String(ex));
    arm.elements.linkPath2.setAttribute('y2', String(ey));
    arm.elements.joint1.setAttribute('cx', String(j1x));
    arm.elements.joint1.setAttribute('cy', String(j1y));
    arm.elements.joint2.setAttribute('cx', String(j2x));
    arm.elements.joint2.setAttribute('cy', String(j2y));
    arm.elements.endEff.setAttribute('cx', String(ex));
    arm.elements.endEff.setAttribute('cy', String(ey));
  }

  function updateDrone(drone) {
    // Update drone position
    drone.x += drone.vx;
    drone.y += drone.vy;
    drone.angle += 0.1;

    // Bounce off edges
    if (drone.x < 0 || drone.x > width) drone.vx *= -1;
    if (drone.y < 0 || drone.y > height) drone.vy *= -1;

    // Keep within bounds
    drone.x = Math.max(0, Math.min(width, drone.x));
    drone.y = Math.max(0, Math.min(height, drone.y));

    // Update drone elements
    drone.elements.body.setAttribute('cx', String(drone.x));
    drone.elements.body.setAttribute('cy', String(drone.y));
    drone.elements.body.setAttribute('transform', `rotate(${drone.angle * 180 / Math.PI} ${drone.x} ${drone.y})`);
    
    // Update propellers
    const propLength = 8;
    const prop1x1 = drone.x - propLength * Math.cos(drone.angle);
    const prop1y1 = drone.y - propLength * Math.sin(drone.angle);
    const prop1x2 = drone.x + propLength * Math.cos(drone.angle);
    const prop1y2 = drone.y + propLength * Math.sin(drone.angle);
    
    const prop2x1 = drone.x - propLength * Math.cos(drone.angle + Math.PI/2);
    const prop2y1 = drone.y - propLength * Math.sin(drone.angle + Math.PI/2);
    const prop2x2 = drone.x + propLength * Math.cos(drone.angle + Math.PI/2);
    const prop2y2 = drone.y + propLength * Math.sin(drone.angle + Math.PI/2);
    
    drone.elements.prop1.setAttribute('x1', String(prop1x1));
    drone.elements.prop1.setAttribute('y1', String(prop1y1));
    drone.elements.prop1.setAttribute('x2', String(prop1x2));
    drone.elements.prop1.setAttribute('y2', String(prop1y2));
    
    drone.elements.prop2.setAttribute('x1', String(prop2x1));
    drone.elements.prop2.setAttribute('y1', String(prop2y1));
    drone.elements.prop2.setAttribute('x2', String(prop2x2));
    drone.elements.prop2.setAttribute('y2', String(prop2y2));
    
    drone.elements.led.setAttribute('cx', String(drone.x));
    drone.elements.led.setAttribute('cy', String(drone.y));
  }

  function animate() {
    // Update all arms
    arms.forEach(arm => {
      // Slowly move target positions
      arm.targetX += (Math.random() - 0.5) * 0.5;
      arm.targetY += (Math.random() - 0.5) * 0.5;
      arm.targetX = Math.max(50, Math.min(width - 50, arm.targetX));
      arm.targetY = Math.max(50, Math.min(height - 50, arm.targetY));
      updateArm(arm);
    });

    // Update all drones
    drones.forEach(updateDrone);

    requestAnimationFrame(animate);
  }

  // Initialize all arms
  arms.forEach(updateArm);
  animate();

  svg.addEventListener('mousemove', (e) => {
    const rect = svg.getBoundingClientRect();
    targetX = e.clientX - rect.left;
    targetY = e.clientY - rect.top;
    
    // Update the first arm to follow mouse
    arms[0].targetX = targetX;
    arms[0].targetY = targetY;
  });
})();


