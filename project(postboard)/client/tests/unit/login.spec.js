import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import TestComponent from '@/components/TestComponent.vue'


describe('TestComponent.vue', () => {
	it('renders include text', () => {
		const wrapper = shallowMount(TestComponent)
		expect(wrapper.text()).to.include("Installed CLI Plugins")
	})

	it('renders button correct', () => {
		const wrapper = shallowMount(TestComponent)
		expect(wrapper.find('#testButton').text()).equal("Click")
	})

	it('renders a tage correct', () => {
		const wrapper = shallowMount(TestComponent)
		expect(wrapper.find('#testLink').attributes('href')).equal("https://vuejs.org")
	})

	it('renders a tage rel correct', () => {
		const wrapper = shallowMount(TestComponent)
		expect(wrapper.find('#testLink1').attributes('rel')).equal("noopener")
	})

	it('renders a tage text correct', () => {
		const wrapper = shallowMount(TestComponent)
		expect(wrapper.find('#testLink2').text()).equal("awesome-vue")
	})


	it('renders div class correct', () => {
		const wrapper = shallowMount(TestComponent)
		expect(wrapper.find('#testDiv').attributes('class')).equal("hello")
	})


})
