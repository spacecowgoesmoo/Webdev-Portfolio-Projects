<template>
	<div class='textAndCTAwindow fullWidthContainer'>
		<h1>{{ headerText }}</h1>
		<button class='bigButton'>{{ buttonText }}</button>





		<style>
			.textAndCTAwindow {
				background: var(--gray1);
				width: calc(90% - 100px);
				font-size: 0.75em;
				margin: 50px auto;
				padding: 130px 50px;
				border-radius: var(--borderRadius);
				text-align: center;
			}

			.textAndCTAwindow * {
				margin: 25px 0;
			}

			@media screen and (max-width: 650px) {
				.textAndCTAwindow { padding: 50px 10px; width: calc(90% - 20px); }
				.textAndCTAwindow .bigButton { width: 240px; }
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
			buttonText: {
    			type: String,
    			default: ""
    		}
    	}
    }
</script>