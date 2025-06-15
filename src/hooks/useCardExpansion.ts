
import { useState, useCallback, useRef, useEffect } from 'react';
import { CardExpansionState, InteractionMode } from '@/types/card-expansion';

export const useCardExpansion = (initialState?: Partial<CardExpansionState>) => {
  const [expansionState, setExpansionState] = useState<CardExpansionState>({
    level: 'compact',
    isHovered: false,
    isExpanded: false,
    isComparing: false,
    isFavorited: false,
    ...initialState
  });

  const [interactionMode, setInteractionMode] = useState<InteractionMode>({
    mode: 'browse',
    dataDepth: 'basic'
  });

  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  const expandTimeoutRef = useRef<NodeJS.Timeout>();

  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      setExpansionState(prev => ({
        ...prev,
        isHovered: true,
        level: prev.level === 'compact' ? 'preview' : prev.level
      }));
    }, 300);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    setExpansionState(prev => ({
      ...prev,
      isHovered: false,
      level: prev.isExpanded ? prev.level : 'compact'
    }));
  }, []);

  const handleClick = useCallback(() => {
    setExpansionState(prev => ({
      ...prev,
      isExpanded: !prev.isExpanded,
      level: prev.isExpanded ? 'compact' : 'modal'
    }));
    
    setInteractionMode(prev => ({
      ...prev,
      mode: 'analyze',
      dataDepth: 'comprehensive'
    }));
  }, []);

  const handleDoubleClick = useCallback(() => {
    setExpansionState(prev => ({
      ...prev,
      level: 'fullscreen'
    }));
  }, []);

  const toggleFavorite = useCallback(() => {
    setExpansionState(prev => ({
      ...prev,
      isFavorited: !prev.isFavorited
    }));
  }, []);

  const toggleCompare = useCallback(() => {
    setExpansionState(prev => ({
      ...prev,
      isComparing: !prev.isComparing
    }));
    
    setInteractionMode(prev => ({
      ...prev,
      mode: prev.mode === 'compare' ? 'browse' : 'compare',
      dataDepth: 'extended'
    }));
  }, []);

  const resetExpansion = useCallback(() => {
    setExpansionState({
      level: 'compact',
      isHovered: false,
      isExpanded: false,
      isComparing: false,
      isFavorited: expansionState.isFavorited // Preserve favorite state
    });
    
    setInteractionMode({
      mode: 'browse',
      dataDepth: 'basic'
    });
  }, [expansionState.isFavorited]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (expandTimeoutRef.current) {
        clearTimeout(expandTimeoutRef.current);
      }
    };
  }, []);

  return {
    expansionState,
    interactionMode,
    setExpansionState,
    setInteractionMode,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    handleDoubleClick,
    toggleFavorite,
    toggleCompare,
    resetExpansion
  };
};
