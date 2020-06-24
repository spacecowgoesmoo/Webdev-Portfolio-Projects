<template>
	<div class='loginBar'>
		<div class='fullWidthContainer'>
			<img class='iFitLogo clickable' src='~assets/images/iFitLogo2019.svg' alt='iFit Logo'>
		
			<div class='loginBarRightText smallBold'>
				<a class='clickable'>LOREM</a>
				<a class='clickable'>IPSUM UT</a>
			</div>
		</div>
		




		<style>
			.loginBar {
				height: 70px;
				border-bottom: 1px solid var(--gray2);
				background: var(--white);
				color: var(--black);
				padding: 0 25px;
			}

			.loginBar .fullWidthContainer {
				display: flex;
				justify-content: space-between;
			}
	
			.iFitLogo {
				margin: 23px 0 0 1px;
				width: 75px;
				height: 24px;
			}
			
			.loginBarRightText a {
				display: inline-block;
				margin: 29px 0 0 20px;
			}

			@media screen and (max-width: 650px) {
				.loginBar { padding: 0; }
				.iFitLogo { margin-left: 1px; }
			}
		</style>
	</div>
</template>
