import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
  try {
    sessionStorage.clear();
    localStorage.clear();
  } catch {
    // Storage may be unavailable in some environments; nothing to clear.
  }
});
