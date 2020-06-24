module.exports = {
	head: {
		// Page title
		title: 'Sample Webpage - Taylor Calderone',

  		// Favicon
  		link: [
  			{ rel: 'apple-touch-icon', sizes: '180x180', href: 'https://www.taylorcalderone.com/Images/Favicons/apple-touch-icon.png' },
  			{ rel: 'icon', sizes: '32x32', href: 'https://www.taylorcalderone.com/Images/Favicons/favicon-32x32.png' },
  			{ rel: 'icon', sizes: '16x16', href: 'https://www.taylorcalderone.com/Images/Favicons/favicon-16x16.png' },
  			{ rel: 'manifest', href: 'https://www.taylorcalderone.com/Images/Favicons/site.webmanifest' },
  			{ rel: 'mask-icon', href: 'https://www.taylorcalderone.com/Images/Favicons/safari-pinned-tab.svg', color: '#5BBAD5' },
  			{ rel: 'shortcut icon', href: 'https://www.taylorcalderone.com/Images/Favicons/favicon.ico' }
 		],
  		meta: [
  			{ name: 'msapplication-TileColor', content: '#2B5797' },
  			{ name: 'msapplication-config', content: 'https://www.taylorcalderone.com/Images/Favicons/browserconfig.xml' },
  			{ name: 'theme-color', content: '#FFFFFF' },

  		// Mobile device viewport
  			{ charset: 'utf-8' },
    		{ name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' }
  		]
	},

	// CSS
	css: ['~/assets/css/style.css'],

	// Internationalization
	modules: [
		'nuxt-i18n'
	],

	i18n: {
		locales: ['de', 'en-US', 'fr', 'loremIpsum'],
		defaultLocale: 'en-US',
		vueI18n: {
			messages: {
				'de': require('./locales/de.json'), 
				'en-US': require('./locales/en-US.json'),
				'fr': require('./locales/fr.json'),
				'loremIpsum': require('./locales/loremIpsum.json'),
			}
		}
	}
}