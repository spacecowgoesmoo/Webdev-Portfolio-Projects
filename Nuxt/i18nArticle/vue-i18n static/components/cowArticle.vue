<template>
	<div>
		<h2>{{ cowTitle }}</h2>
		<img src='~/assets/images/hero.png' alt='Purple flowchart with blue squares and a dialog bubble'>
		<p>{{ cowParagraph1 }}</p>
		<p>{{ cowParagraph2 }}</p>
		<p>{{ cowParagraph3 }}</p>
		<p>{{ cowParagraph4 }}</p>
	</div>
</template>








<script>
	export default {
		props: {
			cowTitle: {
    			type: String,
    			default: ""
    		},
    		cowParagraph1: {
    			type: String,
    			default: ""
    		},
    		cowParagraph2: {
    			type: String,
    			default: ""
    		},
    		cowParagraph3: {
    			type: String,
    			default: ""
    		},
    		cowParagraph4: {
    			type: String,
    			default: ""
    		}
    	}
    }
</script>
