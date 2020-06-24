export const state = () => ({
	locales: ['de', 'en-US', 'fr', 'loremIpsum'],
	locale: 'en-US'
})

export const mutations = {
	SET_LANG (state, locale) {
		if (state.locales.includes(locale)) {
			state.locale = locale
		}
	}
}