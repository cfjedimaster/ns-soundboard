

// Thank to you Ian MacDonald on the NS Slack
/**
* UUID Algorithm based upon https://gist.github.com/jed/982883
*/

/**
* Converts input digits to random 8-bit hex, preserving incoming 'on' bits.
*/
function random8BitHex(hexDigit) {
   const digit = parseInt(hexDigit, 16);
   // tslint:disable-next-line:no-bitwise
   return (digit ^ Math.random() * 16 >> digit / 4).toString(16);
}

const utils = {

	/**
	* Generates a UUID (version 4)
	* Constructs 00000000-0000-4000-8000-000000000000
	*/
	generateUUIDv4() {
		return (`${'0'.repeat(8)}-${'0'.repeat(4)}-${4e3}-${8e3}-${'0'.repeat(12)}`).replace(/[08]/g, random8BitHex);
	}

}

module.exports = utils;