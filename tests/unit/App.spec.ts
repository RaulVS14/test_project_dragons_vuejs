import {mount} from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
    it('renders start button', () => {
        const buttonText = 'Start game';
        const wrapper = mount(App);
        const startButton = wrapper.find('button');
        expect(startButton.text()).toMatch(buttonText);
    })
})
