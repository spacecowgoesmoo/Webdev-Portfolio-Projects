<template>
	<div class='featuredQuote fullWidthContainer'>
		"{{ quoteText }}"




		<style>
			.featuredQuote {
				width: calc(90% - 100px);
				box-shadow: 0 1px 2px 0 rgba(46, 49, 52, .4);
				font-size: 0.75rem;
				letter-spacing: 0px;
				margin: 50px auto;
				padding: 50px;
				border-radius: var(--borderRadius);
				text-align: center;
			}
			@media screen and (max-width: 650px) {
				.featuredQuote { padding: 50px 10px; width: calc(90% - 20px); }
			}
		</style>
	</div>
</template>




<script>
	export default {
		props: {
			quoteText: {
    			type: String,
    			default: ""
    		}
    	}
    }
</script>