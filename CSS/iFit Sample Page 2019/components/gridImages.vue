<template>
	<div class='fullWidthContainer gridContainer'>
		<gridItem
			v-bind:imagePath = 'gridImage1',
			headerText = 'In voluptate velit Esse',
			subText = 'dolore eu fugiat'
		></gridItem>
		
		<gridItem
			v-bind:imagePath = 'gridImage2',
			headerText = 'Nulla Pariatur',
			subText = 'excepteur sint'
		></gridItem>

		<gridItem
			v-bind:imagePath = 'gridImage3',
			headerText = 'Occaecat Cupidatat',
			subText = 'proident'
		></gridItem>
		
		<gridItem
			v-bind:imagePath = 'gridImage4',
			headerText = 'Sunt in Culpa Qui',
			subText = 'dolore eu fugiat'
		></gridItem>

		<gridItem
			v-bind:imagePath = 'gridImage5',
			headerText = 'Officia Deserunt Mollit',
			subText = 'anim id'
		></gridItem>

		<gridItem
			v-bind:imagePath = 'gridImage6',
			headerText = 'Est Laborum',
			subText = 'lorem'
		></gridItem>
		
		<gridItem
			v-bind:imagePath = 'gridImage7',
			headerText = 'Ipsum Dolor Sit Amet',
			subText = 'pariatur'
		></gridItem>

		<gridItem
			v-bind:imagePath = 'gridImage8',
			headerText = 'Consectetur',
			subText = 'pariatur'
		></gridItem>

		<gridItem
			v-bind:imagePath = 'gridImage9',
			headerText = 'Adipiscing Elit Sed',
			subText = 'dolore eu fugiat'
		></gridItem>
		
		<gridItem
			v-bind:imagePath = 'gridImage10',
			headerText = 'Excepteur sed',
			subText = 'excepteur sint'
		></gridItem>

		<gridItem
			v-bind:imagePath = 'gridImage11',
			headerText = 'Eiusmod',
			subText = 'pariatur'
		></gridItem>

		<gridItem
			v-bind:imagePath = 'gridImage12',
			headerText = 'In magna velit Esse',
			subText = 'dolore eu fugiat'
		></gridItem>








		<style>
			.gridContainer {
				text-align: center;
				margin-bottom: -50px;
			}
			
			.gridItem { 
				width: 240px;
				display: inline-block;
				margin: 0 10px 50px 10px;
				text-align: left;
			}

			.gridItem img {	border-radius: var(--borderRadius); }

			.gridImage {
				height: 240px;
				transition: opacity 0.2s ease-in-out;
			}
			
			/* Slightly different than the default .clickable class */
			.gridImage:hover { cursor: pointer; opacity: 0.8; }
			.gridImage:active { opacity: 0.7; }

			.gridCaptionSub {
				display: block;
				color: var(--gray3);
				font-style: italic;
				font-size: 0.75rem;
			}

			@media screen and (max-width: 650px) {
				/* Deactivate hover state */
				.gridImage:hover { cursor: pointer; opacity: 1; }
				.gridImage:active { opacity: 1; }

				/* Fixes centering bug on iOS safari. */
				.gridContainer { padding: 0 28px; }
			}
		</style>
	</div>
</template>




<script>
	import gridItem from "~/components/gridItem.vue";

	import image1 from "~/assets/images/gridImage1.jpg";
	import image2 from "~/assets/images/gridImage2.jpg";
	import image3 from "~/assets/images/gridImage3.jpg";
	import image4 from "~/assets/images/gridImage4.jpg";
	import image5 from "~/assets/images/gridImage5.jpg";
	import image6 from "~/assets/images/gridImage6.jpg";
	import image7 from "~/assets/images/gridImage7.jpg";
	import image8 from "~/assets/images/gridImage8.jpg";
	import image9 from "~/assets/images/gridImage9.jpg";
	import image10 from "~/assets/images/gridImage10.jpg";
	import image11 from "~/assets/images/gridImage11.jpg";
	import image12 from "~/assets/images/gridImage12.jpg";

	export default {
		components: {
    		gridItem
		},

		data() {
    		return {
      			gridImage1: image1,
      			gridImage2: image2,
      			gridImage3: image3,
      			gridImage4: image4,
      			gridImage5: image5,
      			gridImage6: image6,
      			gridImage7: image7,
      			gridImage8: image8,
      			gridImage9: image9,
      			gridImage10: image10,
      			gridImage11: image11,
      			gridImage12: image12
    		}
 		}
	}
</script>