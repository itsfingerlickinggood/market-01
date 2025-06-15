
export interface CardExpansionState {
  level: 'compact' | 'preview' | 'modal' | 'fullscreen';
  isHovered: boolean;
  isExpanded: boolean;
  isComparing: boolean;
  isFavorited: boolean;
}

export interface InteractionMode {
  mode: 'browse' | 'compare' | 'analyze';
  dataDepth: 'basic' | 'extended' | 'comprehensive';
}

export interface MicroChartData {
  timeframe: '7d' | '30d' | '90d';
  ohlc: Array<{
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }>;
  trend: 'up' | 'down' | 'neutral';
  volatility: number;
}

export interface ProviderSpread {
  min: number;
  max: number;
  current: number;
  providers: Array<{
    name: string;
    price: number;
    trustScore: number;
    availability: 'available' | 'limited' | 'unavailable';
  }>;
}

export interface EnhancedGpuCardProps {
  gpu: any;
  expansionState: CardExpansionState;
  interactionMode: InteractionMode;
  onExpansionChange: (state: CardExpansionState) => void;
  onInteractionModeChange: (mode: InteractionMode) => void;
  className?: string;
}
