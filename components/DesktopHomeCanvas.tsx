"use client";

import { PointerEvent, ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { WindowControlsProvider } from "@/components/WindowControlsContext";
import TerminalCard from "@/components/TerminalCard";
import BioCard from "@/components/BioCard";
import NewsBoard from "@/components/NewsBoard";
import ResearchInterests from "@/components/ResearchInterests";
import { GalleryViewer, QuotesBox } from "@/components/HomeWidgets";

type WindowId = "profile" | "bio" | "news" | "research" | "quotes" | "gallery";

interface WindowRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Layout {
  rects: Record<WindowId, WindowRect>;
  height: number;
}

const windowOrder: WindowId[] = ["profile", "bio", "news", "research", "quotes", "gallery"];
const gap = 32;

function createLayout(visible: WindowId[], canvasWidth: number): Layout {
  const rects = {} as Record<WindowId, WindowRect>;
  const has = (id: WindowId) => visible.includes(id);
  const usableWidth = Math.max(760, canvasWidth);
  let y = 0;

  const addPair = (first: WindowId, second: WindowId, firstShare: number, height: number) => {
    const firstVisible = has(first);
    const secondVisible = has(second);

    if (!firstVisible && !secondVisible) return;

    if (firstVisible && secondVisible) {
      const firstWidth = Math.round((usableWidth - gap) * firstShare);
      rects[first] = { x: 0, y, width: firstWidth, height };
      rects[second] = { x: firstWidth + gap, y, width: usableWidth - firstWidth - gap, height };
    } else {
      const id = firstVisible ? first : second;
      rects[id] = { x: 0, y, width: usableWidth, height };
    }

    y += height + gap;
  };

  addPair("profile", "bio", 0.34, 570);

  if (has("news")) {
    rects.news = { x: 0, y, width: usableWidth, height: 360 };
    y += 360 + gap;
  }

  if (has("research")) {
    rects.research = { x: 0, y, width: usableWidth, height: 520 };
    y += 520 + gap;
  }

  addPair("quotes", "gallery", 0.34, 400);

  return { rects, height: Math.max(420, y - gap) };
}

function HomeProfile() {
  return (
    <TerminalCard title="profile_pic.jpg" className="h-full">
      <div className="relative w-full h-full flex-1 p-24">
        <Image src="/profile.jpg" alt="Jacopo Minniti" fill className="object-cover object-center" priority />
      </div>
    </TerminalCard>
  );
}

const windowContent: Record<WindowId, ReactNode> = {
  profile: <HomeProfile />,
  bio: <TerminalCard title="bio.md" className="h-full"><BioCard /></TerminalCard>,
  news: <NewsBoard />,
  research: <ResearchInterests />,
  quotes: <QuotesBox />,
  gallery: <GalleryViewer />,
};

export default function DesktopHomeCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [closed, setClosed] = useState<WindowId[]>([]);
  const [rects, setRects] = useState<Record<WindowId, WindowRect>>({} as Record<WindowId, WindowRect>);
  const [canvasHeight, setCanvasHeight] = useState(1700);
  const [expanded, setExpanded] = useState<WindowId | null>(null);
  const [frontWindow, setFrontWindow] = useState<WindowId | null>(null);
  const dragRef = useRef<{ id: WindowId; offsetX: number; offsetY: number } | null>(null);
  const widthRef = useRef(0);

  const visible = windowOrder.filter((id) => !closed.includes(id));

  const reflow = useCallback((nextClosed: WindowId[]) => {
    const width = canvasRef.current?.clientWidth ?? 1120;
    const layout = createLayout(windowOrder.filter((id) => !nextClosed.includes(id)), width);
    setRects(layout.rects);
    setCanvasHeight(layout.height);
  }, []);

  useLayoutEffect(() => {
    reflow([]);
  }, [reflow]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      if (width !== widthRef.current) {
        widthRef.current = width;
        reflow(closed);
      }
    });
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [closed, reflow]);

  useEffect(() => {
    const onPointerMove = (event: globalThis.PointerEvent) => {
      const drag = dragRef.current;
      const canvas = canvasRef.current;
      if (!drag || !canvas) return;

      const bounds = canvas.getBoundingClientRect();
      setRects((current) => {
        const currentRect = current[drag.id];
        if (!currentRect) return current;
        const x = Math.max(0, Math.min(event.clientX - bounds.left - drag.offsetX, bounds.width - currentRect.width));
        const y = Math.max(0, Math.min(event.clientY - bounds.top - drag.offsetY, canvasHeight - currentRect.height));
        return { ...current, [drag.id]: { ...currentRect, x, y } };
      });
    };

    const endDrag = () => {
      dragRef.current = null;
      document.body.classList.remove("desktop-window-dragging");
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
    };
  }, [canvasHeight]);

  const startDrag = (id: WindowId, event: PointerEvent<HTMLDivElement>) => {
    if (expanded === id || (event.target as HTMLElement).closest("[data-window-control]")) return;
    const rect = rects[id];
    const canvas = canvasRef.current;
    if (!rect || !canvas || event.button !== 0) return;

    const bounds = canvas.getBoundingClientRect();
    dragRef.current = { id, offsetX: event.clientX - bounds.left - rect.x, offsetY: event.clientY - bounds.top - rect.y };
    setFrontWindow(id);
    document.body.classList.add("desktop-window-dragging");
    event.preventDefault();
  };

  const closeWindow = (id: WindowId) => {
    const nextClosed = [...closed, id];
    setClosed(nextClosed);
    setExpanded(null);
    setFrontWindow(null);
    reflow(nextClosed);
  };

  const expandedRect = (id: WindowId): WindowRect => {
    const current = rects[id];
    const width = canvasRef.current?.clientWidth ?? current.width;
    const inset = Math.max(38, Math.round(width * 0.06));
    return {
      x: inset,
      y: 44,
      width: width - inset * 2,
      height: Math.min(760, Math.max(560, canvasHeight - 88)),
    };
  };

  return (
    <section className="desktop-home-canvas" aria-label="Interactive desktop windows">
      <div ref={canvasRef} className="desktop-home-canvas__surface" style={{ height: canvasHeight }}>
        <aside className="desktop-home-hint" aria-label="Window controls hint">
          <div className="desktop-home-hint__bar">
            <span /><span /><span />
            <span>quick_note.txt</span>
          </div>
          <p><span>[tip]</span> Drag a title bar, or hover the buttons to close / enlarge a window.</p>
        </aside>

        {visible.map((id) => {
          const rect = expanded === id ? expandedRect(id) : rects[id];
          if (!rect) return null;

          return (
            <article
              key={id}
              className={`desktop-window${expanded === id ? " desktop-window--expanded" : ""}`}
              style={{ left: rect.x, top: rect.y, width: rect.width, height: rect.height, zIndex: expanded === id ? 30 : frontWindow === id ? 20 : 1 }}
              onPointerDown={() => setFrontWindow(id)}
            >
              <WindowControlsProvider value={{ onClose: () => closeWindow(id), onToggleExpand: () => setExpanded((current) => current === id ? null : id), expanded: expanded === id }}>
                <div className="desktop-window__content">
                  <div className="desktop-window__drag-handle" onPointerDown={(event) => startDrag(id, event)} />
                  {windowContent[id]}
                </div>
              </WindowControlsProvider>
            </article>
          );
        })}
      </div>
    </section>
  );
}
