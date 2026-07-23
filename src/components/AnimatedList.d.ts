import * as React from "react";

export interface AnimatedListProps<T = any> {
  items: T[];
  onItemSelect?: (item: T, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
  renderItem?: (item: T, index: number, selected: boolean) => React.ReactNode;
}

declare const AnimatedList: <T = any>(props: AnimatedListProps<T>) => JSX.Element;
export default AnimatedList;