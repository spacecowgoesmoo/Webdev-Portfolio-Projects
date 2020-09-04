class Card {
	constructor (input) {
		this.domReference = null
		this.suitAndValue = input
		this.value = parseInt(input.slice(1, 3))
		this.x = 0
		this.y = 0

		// Prepare source filepaths. The royal cards use PNGs instead of SVGs
		if (this.value <= 10 || this.value == 14) {
			this.sourceFile = 'Images/' + input + '.svg'
		} else {
			this.sourceFile = 'Images/' + input + '.png'
		}
	}

	addToDeck(deck) { 
		// Adds card to deck at a random index
		// The -1 is important because deck.length starts at 1, not 0
		const q = utilities.rngRange(0, deck.length - 1)
		deck.splice(q, 0, this.suitAndValue)
	}

	deleteCard() {
		this.domReference.remove()
		this.domReference = null
	}

	fadeIn() { this.domReference.style.opacity = 1 }
	fadeOut() { this.domReference.style.opacity = 0 }

	moveToAnchor(anchor) {
		this.x = anchor.offsetLeft + anchor.width / 2
		this.y = anchor.offsetTop + anchor.height / 2
		this.domReference.style.left = this.x + 'px'
		this.domReference.style.top = this.y + 'px'
	}

	scatter() {
		this.x += utilities.rngRange(-150,150)
		this.y += utilities.rngRange(-90,90)
		this.domReference.style.left = this.x + 'px'
		this.domReference.style.top = this.y + 'px'
	}

	spawnAtAnchor(anchor) {
		var q = document.createElement('img')
		this.domReference = q
		q.src = this.sourceFile
		this.moveToAnchor(anchor)
		q.classList.add('card')
		this.domReference.style.transform = 'translate(-50%, -50%) rotate(' + utilities.rngRange(-7,7) + 'deg)'
		document.body.appendChild(q)
	}
}








// Game logic goes here
let popinApp = {
	dataStore: {
		AIDeck: [],
		playerDeck: [],
		initializationComplete: false,
		turnInProgress: false,
		cardsOnTable: []
	},

	initialize: function() {
		// Distribute cards to players
		let allCards = [
			'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14',
			'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12', 'S13', 'S14',
			'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'H12', 'H13', 'H14',
			'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14'
		]
		allCards = utilities.shuffleArray(allCards)
		this.dataStore.AIDeck = allCards.slice(0,26)
		this.dataStore.playerDeck = allCards.slice(26,52)
		this.dataStore.initializationComplete = true
	},

	combatRound: function() {
		if (this.dataStore.initializationComplete == true && this.dataStore.turnInProgress == false) {
			
			// Prevents game logic breaking from simultaneous turns
			this.dataStore.turnInProgress = true
			playerDeckImage.style.opacity = 0.5
			AIDeckImage.style.opacity = 0.5

			// Spawn cards
			let AIcard = spawnAICard()
			let playerCard = spawnPlayerCard()

			function spawnAICard() {
				// Grab the top card and copy it to the table array
				let AIcard = new Card(popinApp.dataStore.AIDeck[0])
				popinApp.dataStore.cardsOnTable.push(AIcard)
	
				// Remove the card from the deck
				popinApp.dataStore.AIDeck.shift()
	
				// Create the DOM elements for the card. It's invisible for now
				AIcard.spawnAtAnchor(AIDeckImage)
	
				// FadeIn and move the card to the center
				AIcard.fadeIn()
				AIcard.moveToAnchor(battlefieldLeft)

				// Return card reference
				return AIcard
			}

			function spawnPlayerCard() {
				// Grab the top card and copy it to the table array
				let playerCard = new Card(popinApp.dataStore.playerDeck[0])
				popinApp.dataStore.cardsOnTable.push(playerCard)
	
				// Remove the card from the deck
				popinApp.dataStore.playerDeck.shift()
	
				// Create the DOM elements for the card. It's invisible for now
				playerCard.spawnAtAnchor(playerDeckImage)
	
				// FadeIn and move the card to the center
				playerCard.fadeIn()
				playerCard.moveToAnchor(battlefieldRight)

				// Return card reference
				return playerCard
			}

			// Calculate and cleanup combat
			// Our 'this' reference gets a little overcomplicated because..
			// ..it doesn't automatically pass though setTimeouts
			setTimeout(calculateCombat, 1000, this)
			setTimeout(cleanupCombat, 1500, this)

			function calculateCombat(parentThis) {
				// AI wins
				if (AIcard.value > playerCard.value) { 
					for (let i=0; i < parentThis.dataStore.cardsOnTable.length; i++) {
						parentThis.dataStore.cardsOnTable[i].fadeOut()
						parentThis.dataStore.cardsOnTable[i].moveToAnchor(AIDeckImage)
						parentThis.dataStore.cardsOnTable[i].addToDeck(parentThis.dataStore.AIDeck)
					}
				}

				// Player wins
				if (playerCard.value > AIcard.value) { 
					for (let i=0; i < parentThis.dataStore.cardsOnTable.length; i++) {
						parentThis.dataStore.cardsOnTable[i].fadeOut()
						parentThis.dataStore.cardsOnTable[i].moveToAnchor(playerDeckImage)
						parentThis.dataStore.cardsOnTable[i].addToDeck(parentThis.dataStore.playerDeck)
					}
				}

				// Tie
				// Cards scatter and table state is left unresolved
				// All cards go to the winner of the next round
				if (AIcard.value == playerCard.value) {
					// Scatter existing cards
					AIcard.scatter()
					playerCard.scatter()
					// Add two more cards to the pool
					// if statements prevent crashes if a player has no cards left
					if (popinApp.dataStore.AIDeck.length > 0) { spawnAICard().scatter() }
					if (popinApp.dataStore.playerDeck.length > 0) { spawnPlayerCard().scatter() }					
				}
			}

			function cleanupCombat(parentThis) {
				// If the previous turn wasn't a tie..
				if (AIcard.value !== playerCard.value) { 
					// Delete the cards from the DOM
					for (let i=0; i < parentThis.dataStore.cardsOnTable.length; i++) {
						parentThis.dataStore.cardsOnTable[i].deleteCard()
					}
					// Clear the table array
					parentThis.dataStore.cardsOnTable = []	
				}

				// After any turn, regardless of outcome:
				// Check for win conditions
				if (parentThis.dataStore.AIDeck.length == 0) { 
					alert('You win! Click OK to play again.')
					location.reload();
				}
				if (parentThis.dataStore.playerDeck.length == 0) { 
					alert('AI wins! Click OK to play again.')
					location.reload();
				}

				// Delete combatRound()'s DOM references to the cards
				AIcard = null
				playerCard = null

				// Make the decks clickable again
				parentThis.dataStore.turnInProgress = false
				playerDeckImage.style.opacity = 1
				AIDeckImage.style.opacity = 1

				// Turn-by-turn results for dev testing
				console.clear()
				console.log('AI deck:')
				console.log(parentThis.dataStore.AIDeck)
				console.log('Player deck:')
				console.log(parentThis.dataStore.playerDeck)
			}
		}
	}
}








const utilities = {
	rngRange: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	shuffleArray: function(array) {
		// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array
	}
}