import React, { useLayoutEffect, useState } from 'react';

interface Props {
  containerRef: React.RefObject<HTMLElement | null>;
  targetRef: React.RefObject<HTMLElement | null>;
  tooltipRef: React.RefObject<HTMLElement | null>;
  padding?: number;
  deps?: any[];
}

/**
 * Calculates a top/left position for a floating tooltip-like element
 * such that it is centered horizontally on a target element (e.g., a word),
 * and visually contained within a scrollable container.
 *
 * If there's not enough space below the target, it will try to place
 * the tooltip above it.
 *
 * @param containerRef - Ref to the scrollable container that should visually contain the tooltip.
 * @param targetRef - Ref to the anchor element (like a word) that the tooltip should be positioned around.
 * @param tooltipRef - Ref to the tooltip like element.
 * @param padding - Minimum distance from edges (in pixels).
 * @param deps - Extra dependency values that will trigger repositioning on change.
 * @returns The computed top and left position for the tooltip.
 */
function useAdjustTooltipPosition({
  containerRef,
  targetRef,
  tooltipRef,
  padding = 20,
  deps = []
}: Props) {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0
  });

  useLayoutEffect(() => {
    const containerEl = containerRef.current;
    const targetEl = targetRef.current;
    const tooltipEl = tooltipRef.current;
    if (!containerEl || !targetEl || !tooltipEl) return;

    const compute = () => {
      const containerRect = containerEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const tooltipRect = tooltipEl.getBoundingClientRect();

      let left =
        targetRect.left -
        containerRect.left +
        targetRect.width / 2 -
        tooltipRect.width / 2 +
        containerEl.scrollLeft;

      let top =
        targetRect.bottom -
        containerRect.top +
        padding +
        containerEl.scrollTop;

      // Adjust horizontally
      if (left + tooltipRect.width + padding - containerEl.scrollLeft > containerEl.clientWidth) {
        left = containerEl.clientWidth + containerEl.scrollLeft - tooltipRect.width - padding;
      } else if (left - containerEl.scrollLeft < padding) {
        left = padding + containerEl.scrollLeft;
      }

      // Adjust vertically: if not enough space below, try placing above
      const spaceBelow =
        containerEl.clientHeight -
        (top - containerEl.scrollTop + tooltipEl.clientHeight + padding);

      if (spaceBelow < 0) {
        const aboveTop =
          targetRect.top -
          containerRect.top -
          tooltipRect.height -
          padding +
          containerEl.scrollTop;

        if (aboveTop - containerEl.scrollTop >= padding) {
          top = aboveTop;
        } else {
          // Clamp to bottom edge
          top =
            containerEl.clientHeight +
            containerEl.scrollTop -
            tooltipRect.height -
            padding;
        }
      }

      setPosition({ top, left });
    };

    compute();
    window.addEventListener('resize', compute);

    return () => {
      window.removeEventListener('resize', compute);
    };
  }, [padding, ...deps]);

  return position;
}

export default useAdjustTooltipPosition;