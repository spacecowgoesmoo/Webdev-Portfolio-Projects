module.exports = {
	head: {
		// Just for accessibility points
		htmlAttrs: {
    		lang: 'en'
    	},

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
    		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
    		{ name: 'description', content: 'Sample Webpage' }
  		],

  		// Font
  		link: [
    		{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,600,400i' }
  		]
	},

	// CSS
	css: ['~/assets/css/style.css']
}
