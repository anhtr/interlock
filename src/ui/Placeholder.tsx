interface PlaceholderProps {
  /** What will eventually render here, e.g. "Full chart". */
  label: string;
  /** Aspect of the reserved area. `canvas` fills the space it is given. */
  shape?: 'square' | 'row' | 'strip' | 'canvas';
}

/**
 * A correctly-sized, clearly-marked stand-in for a real renderer.
 *
 * Spec §11.9 asks the shell to reserve the right space with the right
 * surrounding chrome so the shared fabric-block renderer can drop in without
 * reworking layout. Every one of these is replaced by real rendering code in a
 * later milestone (M2 for the canvas, M7 for the charts, M8 for the wireframe
 * and mockups).
 */
export function Placeholder({ label, shape = 'square' }: PlaceholderProps) {
  return (
    <div
      className={`placeholder placeholder-${shape}`}
      role="img"
      aria-label={`${label} placeholder`}
    >
      <span>{label} renders here</span>
    </div>
  );
}
