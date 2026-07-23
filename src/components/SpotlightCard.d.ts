import { ReactNode } from 'react';

export interface SpotlightCardProps {
  children?: ReactNode;
  className?: string;
  spotlightColor?: string;
}

declare const SpotlightCard: (props: SpotlightCardProps) => JSX.Element;
export default SpotlightCard;