import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const TorchWhiteoutOverlay: React.FC = () => {
  const { isTorchWhiteout, torchOrigin } = useTheme();

  // In standard professional mode, native View Transitions handle the circular reveal seamlessly.
  // The overlay is only used as a fallback for browsers without native View Transitions.
  const hasNativeViewTransition =
    typeof document !== 'undefined' && typeof (document as any).startViewTransition === 'function';

  if (!isTorchWhiteout || !torchOrigin || hasNativeViewTransition) return null;

  const { x, y } = torchOrigin;

  return (
    <div
      id="torch-whiteout-portal"
      className="fixed inset-0 z-[999999] pointer-events-none select-none overflow-hidden"
      style={{
        ['--torch-x' as string]: `${x}px`,
        ['--torch-y' as string]: `${y}px`,
      }}
    >
      {/* Clean, standard fallback radial reveal for older browsers */}
      <div
        className="absolute inset-0 bg-white"
        style={{
          animation: 'torchStandardFallback 1100ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
        }}
      />
    </div>
  );
};
