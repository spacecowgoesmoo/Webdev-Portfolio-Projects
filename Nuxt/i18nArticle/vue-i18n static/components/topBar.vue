<template>
	<div class='loginBar'>
		<a>{{ $t('siteName') }}</a>

		<select
       		autocomplete="off"
        	onchange="window.$nuxt.$i18n.locale = value"
        >
        	<option selected disabled value="">Select a language</option>
        	<option value="de">Deutsch</option>
        	<option value="en-US">English</option>
        	<option value="fr">Français</option>
        	<option value="loremIpsum">Lorem Ipsum</option>
        </select>

        <nuxt-link :to="$i18n.path('en-US')">English</nuxt-link>
        <nuxt-link :to="$i18n.path('de')">Deutsch</nuxt-link>









		<style>
			.loginBar {
				border-bottom: 1px solid #202020;
				padding: 20px 0;
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				align-items: center;
			}

			.loginBar select { margin-top: 10px; }

			@media screen and (min-width: 750px) {
				.loginBar { 
					padding: 20px 25px;
					flex-direction: row;
				}
				.loginBar select { margin-top: 0px; }
			}
		</style>
	</div>
</template>