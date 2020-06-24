<template>
	<div class='centeredCTAbutton fullWidthContainer'>
		<button class='bigButton'>{{ buttonText }}</button>




		<style>
			.centeredCTAbutton {
				margin: 50px auto;
				text-align: center;
			}
		</style>
	</div>
</template>




<script>
	export default {
		props: {
			buttonText: {
    			type: String,
    			default: ""
    		}
    	}
    }
</script>