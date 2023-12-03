<template>
	<div class='navigationBar'>
		<div class='fullWidthContainer'>
			<div class='navBarLeftText'>Sit Amet</div>
			
			<div class='navBarRightText smallBold'>
				<a class='clickable'>OCCAECAT</a><a class='clickable'>FUGIATUR</a><a class='clickable'>PARIATUR</a><a class='clickable'>TEMPORAT</a><div class='searchBoxContainer'><input class='searchBox' type='text' placeholder='search' autocomplete='off' :style="{ backgroundImage: `url('${searchImage}')` }"></div>
			</div>
		</div>




		<style>
			.navigationBar {
				height: 50px;
				border-bottom: 1px solid var(--gray2);
				padding: 0 25px;
				background: var(--white);
			}
			
			.navigationBar .fullWidthContainer {
				display: flex;
				justify-content: space-between;
			}

			.navBarLeftText {
				margin: 15px 0 0 0;
			}
			
			.navBarRightText a {
				margin: 0 10px;
				line-height: 50px;
			}
			
			.searchBoxContainer {
				position: relative;
				display: inline-block;
				margin-right: -9px;
			}
				
			.searchBox {
			    width: 0px;
				height: 32px;
				border: 0px;
				margin-top: -29px;
				background: var(--white);
			    background-position: 9px 17px; 
			    background-repeat: no-repeat;
			    padding: 8px 0px 8px 35px;
				transition: width 0.4s ease-in-out, margin-left 0.4s ease-in-out;
			}
			
			.searchBox:hover {
			    cursor: pointer;
			}
			
			.searchBox:focus { width: 200px; margin-left: -200px; }

			@media screen and (max-width: 650px) {
				.navigationBar { padding: 0px; }
				.navBarLeftText { display: none; }
				.navigationBar .fullWidthContainer { justify-content: flex-end; padding: 0px 13px; }
				.searchBoxContainer { margin-right: 0px; }
				.navBarRightText a { margin: 0 5px; font-size: 0.6rem; font-weight: 500; }
				.searchBox { 	
					padding: 8px 0px 8px 25px;
					background-position: 2px 17px;
				}
				.searchBox:focus { width: 290px; margin-left: -290px; }				
			}
			@media screen and (max-width: 400px) {
				.navigationBar .fullWidthContainer { justify-content: center; padding: 0px; }
			}
		</style>
	</div>
</template>




<script>
	import image1 from "~/assets/images/search.png";

	export default {
		data() {
    		return {
      			searchImage: image1
    		}
 		}
	}
</script>