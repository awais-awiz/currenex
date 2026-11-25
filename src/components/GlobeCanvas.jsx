import React, { useEffect, useRef } from "react";

// Major financial hubs with 3D sphere coordinate mapping
const HUBS = [
  { name: "New York", code: "USD", lat: 40.7128, lon: -74.006, color: "#38bdf8" },
  { name: "London", code: "GBP", lat: 51.5074, lon: -0.1278, color: "#a855f7" },
  { name: "Frankfurt", code: "EUR", lat: 50.1109, lon: 8.6821, color: "#6366f1" },
  { name: "Tokyo", code: "JPY", lat: 35.6762, lon: 139.6503, color: "#ec4899" },
  { name: "Dubai", code: "AED", lat: 25.2048, lon: 55.2708, color: "#f59e0b" },
  { name: "Islamabad", code: "PKR", lat: 33.6844, lon: 73.0479, color: "#10b981" },
  { name: "Singapore", code: "SGD", lat: 1.3521, lon: 103.8198, color: "#14b8a6" },
  { name: "Sydney", code: "AUD", lat: -33.8688, lon: 151.2093, color: "#f43f5e" },
  { name: "Zurich", code: "CHF", lat: 47.3769, lon: 8.5417, color: "#e11d48" },
  { name: "Toronto", code: "CAD", lat: 43.6532, lon: -79.3832, color: "#3b82f6" },
];

export default function GlobeCanvas({ activePair, isAutoTouring }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let rotation = 0;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Generate floating financial particles (nodes)
    const numPoints = 220;
    const points = [];
    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      points.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(phi),
        size: Math.random() * 1.5 + 1,
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Auto rotation velocity
      rotation += isAutoTouring ? 0.006 : 0.003;
      const radius = Math.min(width, height) * 0.42;
      const cx = width / 2;
      const cy = height / 2;

      // Draw subtle orbital halo
      const grad = ctx.createRadialGradient(cx, cy, radius * 0.6, cx, cy, radius * 1.3);
      grad.addColorStop(0, "rgba(99, 102, 241, 0.12)");
      grad.addColorStop(0.5, "rgba(56, 189, 248, 0.05)");
      grad.addColorStop(1, "rgba(3, 7, 18, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Render latitude/longitude guide rings
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Project and draw sphere points
      const projectedPoints = [];
      for (let p of points) {
        // Rotate around Y-axis
        const rotX = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
        const rotZ = p.x * Math.sin(rotation) + p.z * Math.cos(rotation);
        const rotY = p.y;

        // Perspective scale
        const scale = (rotZ + 1.6) / 2.6;
        const px = cx + rotX * radius * scale;
        const py = cy + rotY * radius * scale;

        projectedPoints.push({ x: px, y: py, z: rotZ, scale, alpha: p.alpha });

        // Only draw points on visible front hemisphere
        if (rotZ > -0.3) {
          ctx.fillStyle = `rgba(165, 180, 252, ${Math.max(0.1, (rotZ + 0.3) * 0.6)})`;
          ctx.beginPath();
          ctx.arc(px, py, p.size * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Connect close nodes with high-speed digital conduits
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedPoints.length; i += 3) {
        const p1 = projectedPoints[i];
        if (p1.z <= 0) continue;
        for (let j = i + 1; j < projectedPoints.length; j += 6) {
          const p2 = projectedPoints[j];
          if (p2.z <= 0) continue;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 45) {
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - dist / 45)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Project Major Financial Hubs (Nodes)
      const projectedHubs = HUBS.map((hub) => {
        const phi = (90 - hub.lat) * (Math.PI / 180);
        const theta = (hub.lon + 180) * (Math.PI / 180);

        const x = -(Math.sin(phi) * Math.cos(theta));
        const z = Math.sin(phi) * Math.sin(theta);
        const y = Math.cos(phi);

        // Rotate
        const rotX = x * Math.cos(rotation) - z * Math.sin(rotation);
        const rotZ = x * Math.sin(rotation) + z * Math.cos(rotation);
        const rotY = y;

        const scale = (rotZ + 1.8) / 2.8;
        return {
          ...hub,
          px: cx + rotX * radius * scale,
          py: cy + rotY * radius * scale,
          pz: rotZ,
          scale,
        };
      });

      // Draw Currency Arc between active 'from' and 'to'
      const hubFrom = projectedHubs.find((h) => h.code === activePair?.from);
      const hubTo = projectedHubs.find((h) => h.code === activePair?.to);

      if (hubFrom && hubTo && (hubFrom.pz > -0.2 || hubTo.pz > -0.2)) {
        // High voltage currency arc
        const midX = (hubFrom.px + hubTo.px) / 2;
        const midY = (hubFrom.py + hubTo.py) / 2 - 50;

        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.moveTo(hubFrom.px, hubFrom.py);
        ctx.quadraticCurveTo(midX, midY, hubTo.px, hubTo.py);
        ctx.stroke();

        ctx.shadowBlur = 0; // Reset blur
      }

      // Draw Hub markers & labels
      projectedHubs.forEach((hub) => {
        if (hub.pz > -0.2) {
          const isActive = hub.code === activePair?.from || hub.code === activePair?.to;

          // Outer glowing radar pulse for active hubs
          if (isActive) {
            ctx.strokeStyle = "rgba(56, 189, 248, 0.8)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(hub.px, hub.py, 12 * hub.scale, 0, Math.PI * 2);
            ctx.stroke();
          }

          // Hub point
          ctx.fillStyle = isActive ? "#38bdf8" : hub.color;
          ctx.beginPath();
          ctx.arc(hub.px, hub.py, (isActive ? 6 : 4) * hub.scale, 0, Math.PI * 2);
          ctx.fill();

          // Hub Title Pill
          ctx.font = `600 ${Math.max(9, 11 * hub.scale)}px 'Plus Jakarta Sans', sans-serif`;
          ctx.fillStyle = isActive ? "#ffffff" : "rgba(255, 255, 255, 0.75)";
          ctx.fillText(`${hub.code} • ${hub.name}`, hub.px + 10, hub.py + 4);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [activePair, isAutoTouring]);

  return (
    <div className="virtual-globe-container">
      <canvas ref={canvasRef} className="globe-canvas-element" />
    </div>
  );
}
