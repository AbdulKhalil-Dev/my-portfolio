"use client";

import { useEffect, useRef, useState } from "react";
import { User } from "lucide-react";

const ANCHOR_X = 150;
const ANCHOR_Y = 8; // pushed down so the anchor dot isn't clipped at the top edge

export function HangingProfile() {
  const boxRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const ropeLength = 180;
  const gravity = 0.5;
  const damping = 0.985;

  // Only used for the initial paint (SSR-safe); live updates go through refs.
  const [initialCoords] = useState({
    x2: ANCHOR_X,
    y2: ANCHOR_Y + ropeLength,
  });

  const state = useRef({
    angle: 0.2, // Initial tilt angle
    velocity: 0,
    isDragging: false,
    dragX: 0,
    dragY: ropeLength,
    currentLength: ropeLength,
  });

  useEffect(() => {
    let animationFrameId: number;

    const updatePhysics = () => {
      let x = ANCHOR_X;
      let y = ropeLength;

      if (!state.current.isDragging) {
        // Pendulum physics calculation
        const angularAcceleration =
          ((-1 * gravity) / ropeLength) * Math.sin(state.current.angle);
        state.current.velocity += angularAcceleration;
        state.current.velocity *= damping;
        state.current.angle += state.current.velocity;

        x = ANCHOR_X + ropeLength * Math.sin(state.current.angle);
        y = ropeLength * Math.cos(state.current.angle);
        state.current.currentLength = ropeLength;
      } else {
        // Dragging physics
        const dx = state.current.dragX;
        const dy = Math.max(state.current.dragY, 10);

        const targetAngle = Math.atan2(dx, dy);
        let targetLength = Math.sqrt(dx * dx + dy * dy);

        if (targetLength > ropeLength) {
          targetLength = ropeLength + (targetLength - ropeLength) * 0.2;
        } else if (targetLength < ropeLength * 0.3) {
          targetLength = ropeLength * 0.3;
        }

        state.current.angle += (targetAngle - state.current.angle) * 0.4;
        state.current.currentLength +=
          (targetLength - state.current.currentLength) * 0.4;
        state.current.velocity = 0;

        x = ANCHOR_X + state.current.currentLength * Math.sin(state.current.angle);
        y = state.current.currentLength * Math.cos(state.current.angle);
      }

      const renderX = x;
      const renderY = y + ANCHOR_Y;

      if (lineRef.current) {
        lineRef.current.setAttribute("x2", String(renderX));
        lineRef.current.setAttribute("y2", String(renderY));
      }

      if (boxRef.current) {
        boxRef.current.style.transform = `translate(${renderX - ANCHOR_X}px, ${renderY}px) rotate(${-state.current.angle}rad)`;
      }

      animationFrameId = requestAnimationFrame(updatePhysics);
    };

    animationFrameId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationFrameId);
  }, [ropeLength]);

  // Mouse / Touch Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    state.current.isDragging = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!state.current.isDragging || !boxRef.current) return;
    const parentRect = boxRef.current.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    // Anchor point relative to parent container
    const anchorX = parentRect.left + ANCHOR_X;
    const anchorY = parentRect.top + ANCHOR_Y;

    state.current.dragX = e.clientX - anchorX;
    state.current.dragY = e.clientY - anchorY;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    state.current.isDragging = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };

  return (
    <div className="relative w-[300px] h-[350px] flex justify-center">
      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <line
          ref={lineRef}
          x1={ANCHOR_X}
          y1={ANCHOR_Y}
          x2={initialCoords.x2}
          y2={initialCoords.y2}
          stroke="currentColor"
          strokeWidth="3"
          className="text-foreground/20"
          strokeLinecap="round"
        />
        <circle cx={ANCHOR_X} cy={ANCHOR_Y} r="5" fill="currentColor" className="text-foreground/40" />
        <circle cx={ANCHOR_X} cy={ANCHOR_Y} r="2" fill="currentColor" className="text-foreground" />
      </svg>
      <div
        ref={boxRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="absolute top-0 flex flex-col items-center justify-center p-4 w-[140px] rounded-[2.5rem] bg-background/40 backdrop-blur-md border border-foreground/10 cursor-grab active:cursor-grabbing shadow-2xl select-none hover:bg-background/60 transition-colors duration-300"
        style={{
          left: "50%",
          marginLeft: "-70px",
          transformOrigin: "center top",
          touchAction: "none",
        }}
      >
        <div className="w-20 h-20 rounded-full overflow-hidden border border-foreground/20 mb-3 bg-foreground/5 flex items-center justify-center pointer-events-none group-hover:border-foreground/40 transition-colors duration-300">
          <User className="w-10 h-10 text-foreground/40 group-hover:text-foreground/70 transition-colors duration-300" />
        </div>
        <div className="flex flex-col items-center gap-1 pointer-events-none pb-1">
          <span className="text-xs font-bold tracking-[0.2em] text-foreground/80">
            KHALIL
          </span>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Developer
          </span>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-2.5 h-2.5 rounded-full border-2 border-foreground/20 bg-background" />
      </div>
    </div>
  );
}