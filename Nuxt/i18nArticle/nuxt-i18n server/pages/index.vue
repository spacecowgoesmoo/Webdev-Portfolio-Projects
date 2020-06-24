<template>
	<div>
        <topBar></topBar>

        <cowArticle
			v-bind:cowTitle = "$t('article1.title')",
			v-bind:cowParagraph1 = "$t('article1.paragraph1')",
			v-bind:cowParagraph2 = "$t('article1.paragraph2')",
			v-bind:cowParagraph3 = "$t('article1.paragraph3')",
			v-bind:cowParagraph4 = "$t('article1.paragraph4')"
		></cowArticle>
	</div>
</template>




<script>
	import cowArticle from "~/components/cowArticle.vue";
	import topBar from "~/components/topBar.vue";

	export default {
		components: {
    		cowArticle,
    		topBar
		},
	}
</script>