// Initialization
cowTextarea.value = ''




function encryptTextfield() {
	var q = cowTextarea.value
	var cowKey1 = prompt('Please create an encryption passphrase.')
	if (cowKey1 != null) { var cowKey2 = prompt('Please verify the encryption passphrase.') }

	if (cowKey2 != null) {								// aka: If user didn't press the cancel button..
		if (cowKey1 === cowKey2) {						// Check if user passphrases match
			q = qqq.AES.encrypt(q, cowKey1)
			cowTextarea.value = q
		} else alert('Keys do not match, please try again.')
	}
}

function decryptTextfield() {
	var input = cowTextarea.value
	var cowKey = prompt('Enter your encryption passphrase.')
	if (cowKey != null) {
		cowTextarea.value = "Decryption will be attempted in 3 seconds.."
		encryptButton.disabled = true
		decryptButton.disabled = true
		setTimeout(decrypt, 3000)
	}

	function decrypt() {
		encryptButton.disabled = false
		decryptButton.disabled = false
		var output = qqq.AES.decrypt(input, cowKey)
		output = output.toString(qqq.enc.Utf8);	// Required because the decrypter outputs hex instead of ascii
	
		if (output == '') { 
			alert('Decryption failed.')
			cowTextarea.value = input
		} else cowTextarea.value = output
		
	}
}