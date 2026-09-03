import { Placeholder } from './Placeholder';

/**
 * The design screen's chrome. The canvas itself is a placeholder until M2/M3.
 *
 * Note that the canvas is *not* shell chrome (spec §11.9): it is a renderer,
 * and the same fabric-block renderer used by the chart outputs. It lands as
 * real code, not as a refinement of anything drawn here.
 */
export function DesignScreen({ title }: { title: string }) {
  return (
    <>
      <header className="app-header">
        <div className="app-header-title">
          <h1>{title}</h1>
          <span className="app-header-status">Saved</span>
        </div>
      </header>

      <main className="design-area">
        <Placeholder label="Grid canvas" shape="canvas" />
        <div className="design-palette">
          <Placeholder label="Stitch palette" shape="strip" />
        </div>
      </main>
    </>
  );
}
