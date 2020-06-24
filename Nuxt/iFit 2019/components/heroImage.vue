<template>
	<div 
		class='heroImageDiv giantHeaderText' 
		:style="{ backgroundImage: `url('${heroImagePath}')` }"
	>
		{{ heroText }}




		<style>
			.heroImageDiv { 
				/* Layout */
				margin: 0 auto;
				padding: 200px 20px;
				width: calc(100% - 40px);

				/* Text */
				color: var(--white);
				text-align: center;

				/* Image */
				background: darkBlue;
 			   	background-repeat: no-repeat;   
				background-size: cover;
 			}
 			@media screen and (max-width: 650px) {
				.heroImageDiv { padding: 150px 20px; }
 			}
		</style>
	</div>
</template>




<script>
	export default {
		props: {
			heroImagePath: {
    			type: String,
    			default: ""
    		},
			heroText: {
    			type: String,
    			default: ""
    		}
    	}
    }
</script>