<template>
	<div class='centeredTextDiv fullWidthContainer'>
		<h2>{{ headerText }}</h2>
		<p>{{ paragraphText }}</p>




		<style>
			.centeredTextDiv { 
				margin-top: 50px;
				margin-bottom: 50px;
				text-align: center;
 			}
 			@media screen and (max-width: 650px) {
				.centeredTextDiv { padding: 0 10px; }
 			}
		</style>
	</div>
</template>




<script>
	export default {
		props: {
			headerText: {
    			type: String,
    			default: ""
    		},
    		paragraphText: {
    			type: String,
    			default: ""
    		}
    	}
    }
</script>