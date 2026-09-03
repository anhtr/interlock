import { act, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { App } from './App';

// jsdom dispatches `hashchange` as a task rather than synchronously, so every
// fragment change has to be flushed before assertions run.
async function setHash(hash: string) {
  await act(async () => {
    window.location.hash = hash;
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

beforeEach(() => setHash('#/design'));
afterEach(() => setHash('#/design'));

describe('App shell', () => {
  it('renders the design screen with a canvas placeholder', () => {
    render(<App />);
    expect(screen.getByRole('img', { name: 'Grid canvas placeholder' })).toBeDefined();
  });

  it('deep-links straight to an output tab', async () => {
    await setHash('#/output/wireframe');
    render(<App />);
    expect(screen.getByRole('tab', { name: 'Wireframe' }).getAttribute('aria-selected')).toBe(
      'true',
    );
    expect(screen.getByRole('img', { name: 'Wireframe placeholder' })).toBeDefined();
  });

  it('navigates between screens by updating the fragment', async () => {
    render(<App />);
    const nav = screen.getAllByRole('navigation', { name: 'Primary' })[0]!;
    await act(async () => {
      within(nav).getByRole('button', { name: 'Output' }).click();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(window.location.hash).toBe('#/output');
    expect(screen.getByRole('tablist', { name: 'Output artifacts' })).toBeDefined();
  });

  it('selecting an output tab is reflected in the fragment', async () => {
    await setHash('#/output');
    render(<App />);
    await act(async () => {
      screen.getByRole('tab', { name: 'Per-row chart' }).click();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(window.location.hash).toBe('#/output/per-row-chart');
  });

  // Both navigation surfaces are always in the DOM; the 900 px media query in
  // app.css decides which one is visible, so both must stay in sync.
  it('renders both navigation surfaces with the current screen marked', async () => {
    await setHash('#/output');
    render(<App />);
    const navs = screen.getAllByRole('navigation', { name: 'Primary' });
    expect(navs).toHaveLength(2);
    for (const nav of navs) {
      expect(within(nav).getByRole('button', { name: 'Output' }).getAttribute('aria-current')).toBe(
        'page',
      );
    }
  });
});
