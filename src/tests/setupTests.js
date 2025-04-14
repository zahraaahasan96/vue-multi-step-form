import { createTestingPinia } from '@pinia/testing';
import { vi } from 'vitest';

beforeAll(() => {
  createTestingPinia({
    createSpy: () => vi.fn() 
  });
});
