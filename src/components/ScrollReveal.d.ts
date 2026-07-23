declare module "@/components/ScrollReveal" {
  import { ReactNode, RefObject } from "react";
  interface ScrollRevealProps {
    children: ReactNode;
    scrollContainerRef?: RefObject<HTMLElement>;
    enableBlur?: boolean;
    baseOpacity?: number;
    baseRotation?: number;
    blurStrength?: number;
    containerClassName?: string;
    textClassName?: string;
    rotationEnd?: string;
    wordAnimationEnd?: string;
  }
  const ScrollReveal: (props: ScrollRevealProps) => JSX.Element;
  export default ScrollReveal;
}