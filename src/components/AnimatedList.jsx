import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "motion/react";
import "./AnimatedList.css";

const AnimatedItem = ({ children, delay = 0, index, onMouseEnter, onClick }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.85, opacity: 0, y: 16 }}
      animate={inView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.85, opacity: 0, y: 16 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ cursor: "pointer" }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedList = ({
  items = [],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = "",
  itemClassName = "",
  displayScrollbar = true,
  initialSelectedIndex = -1,
  renderItem,
}) => {
  const listRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [topOp, setTopOp] = useState(0);
  const [botOp, setBotOp] = useState(1);

  const handleMouseEnter = useCallback((i) => setSelectedIndex(i), []);
  const handleClick = useCallback(
    (item, i) => {
      setSelectedIndex(i);
      onItemSelect?.(item, i);
    },
    [onItemSelect]
  );

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setTopOp(Math.min(scrollTop / 50, 1));
    const bd = scrollHeight - (scrollTop + clientHeight);
    setBotOp(scrollHeight <= clientHeight ? 0 : Math.min(bd / 50, 1));
  }, []);

  useEffect(() => {
    if (!enableArrowNavigation) return;
    const onKey = (e) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((p) => Math.min(p + 1, items.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex((p) => Math.max(p - 1, 0));
      } else if (e.key === "Enter" && selectedIndex >= 0 && selectedIndex < items.length) {
        e.preventDefault();
        onItemSelect?.(items[selectedIndex], selectedIndex);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    const c = listRef.current;
    const el = c.querySelector(`[data-index="${selectedIndex}"]`);
    if (el) {
      const m = 50;
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (top < c.scrollTop + m) c.scrollTo({ top: top - m, behavior: "smooth" });
      else if (bottom > c.scrollTop + c.clientHeight - m)
        c.scrollTo({ top: bottom - c.clientHeight + m, behavior: "smooth" });
    }
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  return (
    <div className={`al-container ${className}`}>
      <div
        ref={listRef}
        className={`al-list ${!displayScrollbar ? "al-no-scrollbar" : ""}`}
        onScroll={handleScroll}
      >
        {items.map((item, i) => (
          <AnimatedItem
            key={i}
            delay={0.06 * i}
            index={i}
            onMouseEnter={() => handleMouseEnter(i)}
            onClick={() => handleClick(item, i)}
          >
            <div className={`al-item ${selectedIndex === i ? "selected" : ""} ${itemClassName}`}>
              {renderItem ? renderItem(item, i, selectedIndex === i) : <p style={{ margin: 0 }}>{item}</p>}
            </div>
          </AnimatedItem>
        ))}
      </div>
      {showGradients && (
        <>
          <div className="al-top-gradient" style={{ opacity: topOp }} />
          <div className="al-bottom-gradient" style={{ opacity: botOp }} />
        </>
      )}
    </div>
  );
};

export default AnimatedList;