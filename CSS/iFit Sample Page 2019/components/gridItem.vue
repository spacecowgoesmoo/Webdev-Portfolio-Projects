<template>
	<div class='gridItem'>
		<img class='gridImage' v-bind:src='imagePath' v-bind:alt='headerText'>
		<a class='gridCaptionMain clickable'>{{ headerText }}</a>
		<div class='gridCaptionSub'>{{ subText }}</div>
	</div>
</template>




<script>
	export default {
		props: {
			imagePath: {
    			type: String,
    			default: ""
    		},
    		headerText: {
    			type: String,
    			default: ""
    		},
			subText: {
    			type: String,
    			default: ""
    		}
    	}
    }
</script>
