import {mount} from '@vue/test-utils'
import GameBoard from '@/components/GameBoard.vue'

describe('GameBoard.vue', () => {
    it('Gameboard renders', () => {
        const wrapper = mount(GameBoard);
        const containerElement = wrapper.find('#game_board');
        expect(containerElement.findAll('.messages').length).toBe(1)
    })
})
