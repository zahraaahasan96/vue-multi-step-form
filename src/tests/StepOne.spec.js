import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import StepOne from '../views/StepOne.vue';
import { createTestingPinia } from '@pinia/testing';

describe('StepOne.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(StepOne, {
      global: {
        plugins: [
          createTestingPinia({
            stubActions: false 
          })
        ]
      }
    });
  });

  it('should render properly', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
