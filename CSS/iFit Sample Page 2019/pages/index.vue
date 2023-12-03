<template>
	<div>
		<loginBar></loginBar>
		<navigationBar></navigationBar>

		<heroImage
			v-bind:heroImagePath = 'heroImage',
			heroText = 'OFFICIA UT LABORE ET DOLORE'
		></heroImage>

		<centeredText
			headerText = 'In Reprehenderit',
			paragraphText = 'Aliqua ut enim ad minim veniam. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.'
		></centeredText>

		<gridImages></gridImages>

		<centeredCTAbutton
			buttonText = 'Velit Sint'
		></centeredCTAbutton>

		<featuredQuote
			quoteText = 'Tempor incididunt ut labore (et dolore) magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris (nisi ut aliquip) ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.'
		></featuredQuote>

		<textAndCTAwindow
			headerText = 'Excepteur sint occaecat cupidatat non proident.',
			buttonText = 'Qui Officia'
		></textAndCTAwindow>

		<footerSection></footerSection>
	</div>
</template>




<script>
	import loginBar from "~/components/loginBar.vue";
	import navigationBar from "~/components/navigationBar.vue";
	import heroImage from "~/components/heroImage.vue";
	import centeredText from "~/components/centeredText.vue";
	import gridImages from "~/components/gridImages.vue";
	import centeredCTAbutton from "~/components/centeredCTAbutton.vue";
	import featuredQuote from "~/components/featuredQuote.vue";
	import textAndCTAwindow from "~/components/textAndCTAwindow.vue";
	import footerSection from "~/components/footerSection.vue";

	import image1 from "~/assets/images/heroImage2019.jpg";

	export default {
		components: {
    		loginBar,
    		navigationBar,
    		heroImage,
    		centeredText,
    		gridImages,
    		centeredCTAbutton,
    		featuredQuote,
    		textAndCTAwindow,
    		footerSection
		},

		data() {
    		return {
      			heroImage: image1,
    		}
 		}
	}
</script>