import { Children, cloneElement, isValidElement } from 'react';
import './ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '', style }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()} style={style}>
    {children}
  </div>
);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 56,
  itemScale = 0.02,
  itemStackDistance = 30,
  stackPosition = '112px',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete
}) => {
  const items = Children.toArray(children).filter(isValidElement);
  const stackTop = typeof stackPosition === 'number' ? `${stackPosition}px` : stackPosition;
  const stackScaleStep = Math.max(0, itemScale);

  const enhancedChildren = items.map((child, index) =>
    cloneElement(child, {
      style: {
        ...child.props.style,
        '--stack-index': index,
        '--stack-count': items.length,
        '--stack-gap': `${itemDistance}px`,
        '--stack-top-offset': `calc(${stackTop} + ${index * itemStackDistance}px)`,
        '--stack-z': 10 + index,
        '--stack-top': stackTop,
        '--stack-scale': Math.max(baseScale, 1 - (items.length - index - 1) * stackScaleStep),
      },
    })
  );

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()}>
      <div className="scroll-stack-inner">
        {enhancedChildren}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;