import {mount} from '@vue/test-utils'
import GameBoard from '@/components/GameBoard.vue'

describe('GameBoard.vue', () => {
    it('Gameboard renders', () => {
        const elementText = 'GAME IS ON';
        const wrapper = mount(GameBoard);
        const containerElement = wrapper.find('div');
        expect(containerElement.text()).toMatch(elementText);
    })
})
