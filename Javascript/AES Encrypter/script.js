function encryptButtonClick() {
	const input = cowTextarea.value
	const output = encrypt(input)
	cowTextarea.value = output
}

function encrypt(input) {
	const cowKey1 = prompt('Please create an encryption passphrase.')
	let cowKey2
	if (cowKey1 != null) { cowKey2 = prompt('Please verify the encryption passphrase.') }
	if (cowKey2 != null) {					// aka: If user didn't press the cancel button..
		if (cowKey1 === cowKey2) {			// Check if user passphrases match
			const output = qqq.AES.encrypt(input, cowKey1)
			return output
		} else {
			alert('Keys do not match, please try again.')
			return input
		}
	} else return input	// user pressed the cancel button
}








function decryptButtonClick() {
	const input = cowTextarea.value
	const output = decrypt(input)
	if (output != input) {
		cowTextarea.value = "Decrypted text will display in 3 seconds.."
		encryptButton.disabled = true
		decryptButton.disabled = true
		setTimeout(q, 3000)
	}
	function q() {
		encryptButton.disabled = false
		decryptButton.disabled = false
		cowTextarea.value = output
	}
}

function decrypt(input) {
	const cowKey = prompt('Enter your encryption passphrase.')
	if (cowKey == null) { return input } // user pressed the cancel button, abort
	else {
		let output
		if (cowKey != null) {
			output = qqq.AES.decrypt(input, cowKey)
			output = output.toString(qqq.enc.Utf8);	// Required because the decrypter outputs hex instead of ascii
		}
		if (output == '') { 
			alert('Decryption failed.')
			return input
		} else return output
	}
}
