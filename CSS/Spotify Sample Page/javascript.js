var cow = {
	carouselPosition: 1,
	preventCarouselClickspam: false
}

function prepRevealJS() {
	// ScrollReveal
	window.sr = ScrollReveal();
	sr.reveal('.reveal', { duration: 1000, scale: 1, reset: false, viewFactor: 0.1 });
}

function transcendNewFade(id, targetOpacity, time) {
	id.style.opacity = targetOpacity;
	id.style.transition = 'opacity ' + time + 's linear';
}








function shiftHeroCarousel(direction) {
	if (cow.preventCarouselClickspam == false) {
	
		// Variables
		var speed = 0.5;
		
		// Activate clickspam feature
		cow.preventCarouselClickspam = true;
		
		// Increment carousel counter
		if (direction == 'left') { cow.carouselPosition--; }
		if (direction == 'right') { cow.carouselPosition++; }
		
		// Roll over carousel if it hits the end of the content
		if (cow.carouselPosition == 5) { cow.carouselPosition = 1; }
		if (cow.carouselPosition == 0) { cow.carouselPosition = 4; }
		
		// Fadeout the old carousels, and Fadein the current carousel
		// NOTE - FadeIn and FadeOut causes flickering bugs on Safari
		// NOTE - Putting the fadeTos in a batch earlier doesn't work becaues this can't fade the same element twice at once
		switch (cow.carouselPosition) {
			case 1:	heroButton1.classList.add('clickable');
					heroButton2.classList.add('clickable');
					heroButton3.classList.remove('clickable');
					heroButton5.classList.remove('clickable');
					transcendNewFade(heroImageCarouselContent2, 0, speed);
					transcendNewFade(heroImageCarouselContent4, 0, speed);
					transcendNewFade(heroImageCarouselContent1, 1, speed);	break;	
						
			case 2:	heroButton3.classList.add('clickable');
					heroButton1.classList.remove('clickable');
					heroButton2.classList.remove('clickable');
					heroButton4.classList.remove('clickable');
					transcendNewFade(heroImageCarouselContent1, 0, speed);
					transcendNewFade(heroImageCarouselContent3, 0, speed);
					transcendNewFade(heroImageCarouselContent2, 1, speed);	break;
					
			case 3:	heroButton4.classList.add('clickable');
					heroButton3.classList.remove('clickable');
					heroButton5.classList.remove('clickable');
					transcendNewFade(heroImageCarouselContent2, 0, speed);
					transcendNewFade(heroImageCarouselContent4, 0, speed);
					transcendNewFade(heroImageCarouselContent3, 1, speed);	break;
		
			case 4:	heroButton5.classList.add('clickable');
					heroButton1.classList.remove('clickable');
					heroButton2.classList.remove('clickable');
					heroButton4.classList.remove('clickable');
					transcendNewFade(heroImageCarouselContent1, 0, speed);
					transcendNewFade(heroImageCarouselContent3, 0, speed);
					transcendNewFade(heroImageCarouselContent4, 1, speed);	break;
			default: break;
		}
		
		// Prevent clickspan for the length of the animation
		setTimeout("cow.preventCarouselClickspam = false;", speed);
	}
}