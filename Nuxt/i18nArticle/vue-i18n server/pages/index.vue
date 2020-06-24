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
		
		<script>
			alert('This page was developed for Nuxt server mode so it needs to be run from a local dev server for the language switcher to work correctly. The source code is avaliable at the GitHub link on the previous page.\n\nThe folder to download is: Nuxt-Portfolio-Samples/i18nArticle/vue-i18n server.')
		</script>
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