import {mount} from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
    it('renders h1 tag', () => {
        const title_text = 'Game'
        const wrapper = mount(App)
        const title = wrapper.find('h1');

        expect(title.text()).toMatch(title_text)
    })
})
