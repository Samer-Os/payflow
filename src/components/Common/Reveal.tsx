"use client";
import {
  useRef,
  useEffect,
  useState,
  useSyncExternalStore,
  createElement,
  type ElementType,
  type ReactNode,
  type CSSProperties,
} from "react";

const mqQuery = "(prefers-reduced-motion: reduce)";
const getSnapshot = () =>
  typeof window !== "undefined" && window.matchMedia(mqQuery).matches;
const getServerSnapshot = () => false;
function subscribe(cb: () => void): () => void {
  const mq = window.matchMedia(mqQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  as?: ElementType;
  [key: string]: unknown;
}

export function Reveal({ children, className, style: styleProp, delay = 0, as = "div", ...rest }: RevealProps) {
  const ref = useRef<Element>(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (reduced) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: "-60px 0px", threshold: 0.01 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  const animStyle: CSSProperties = reduced
    ? {}
    : {
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0)" : "translate3d(0,18px,0)",
        transition: visible
          ? `opacity 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${delay}ms`
          : "none",
        willChange: visible ? "auto" : "opacity, transform",
      };

  // eslint-disable-next-line react-hooks/refs
  return createElement(as, { ref, className, style: { ...styleProp, ...animStyle }, ...rest }, children);
}

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delayStep?: number;
}

export function Stagger({ children, className, delayStep = 80 }: StaggerProps) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className={className}>
      {items.map((child, i) =>
        child && typeof child === "object" && "type" in child && child.type === Reveal
          ? createElement(Reveal, { ...child.props, delay: (child.props.delay ?? 0) + i * delayStep, key: child.props.key ?? i })
          : child
      )}
    </div>
  );
}
