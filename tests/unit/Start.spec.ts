import {mount} from '@vue/test-utils'
import Start from '@/components/Start.vue'

describe('Start.vue', () => {
    it('start button renders with correct text', () => {
        const buttonText = 'Start game';
        const wrapper = mount(Start);
        const startButton = wrapper.find('button');
        expect(startButton.text()).toMatch(buttonText);
    })
})
