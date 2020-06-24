// http://jsfiddle.net/1t0heesf/1/
// Inverts hex colors

function invertCssColor(color) {
	const rgb = invertColor(hexColor2rgb(color));
	return rgb2hexColor(rgb);
}

function invertColor(rgb) {
	let yuv = rgb2yuv(rgb);
	const factor = 45;	// 90 is default. Results in stronger contrast.
	const threshold = 180;
	yuv.y = clamp(yuv.y + (yuv.y > threshold ? -factor : factor));
	return yuv2rgb(yuv);
}

function rgb2hexColor(rgb) {
	return '#' + dec2hex(rgb.r) + dec2hex(rgb.g) + dec2hex(rgb.b);
}

function hexColor2rgb(color) {
    color = color.substring(1); // remove #
    return {
        r: parseInt(color.substring(0, 2), 16),
        g: parseInt(color.substring(2, 4), 16),
        b: parseInt(color.substring(4, 6), 16)
    };
}

function dec2hex(n) {
	const hex = n.toString(16);
	if (hex.length < 2) {
		return '0' + hex;
	}
	return hex;
}

function rgb2yuv(rgb){
	const y = clamp(rgb.r *  0.29900 + rgb.g *  0.587   + rgb.b * 0.114);
	const u = clamp(rgb.r * -0.16874 + rgb.g * -0.33126 + rgb.b * 0.50000 + 128);
	const v = clamp(rgb.r *  0.50000 + rgb.g * -0.41869 + rgb.b * -0.08131 + 128);
	return {y:y, u:u, v:v};
}

function yuv2rgb(yuv){
	const y = yuv.y;
	const u = yuv.u;
	const v = yuv.v;
	const r = clamp(y + (v - 128) *  1.40200);
	const g = clamp(y + (u - 128) * -0.34414 + (v - 128) * -0.71414);
	const b = clamp(y + (u - 128) *  1.77200);
	return {r:r,g:g,b:b};
}

function clamp(n){
	if (n<0) { return 0;}
	if (n>255) { return 255;}
	return Math.floor(n);
}
















// See https://github.com/lgarron/clipboard-polyfill for a more robust solution.
function copyTextToClipboard(str) {
	function listener(e) {
		e.clipboardData.setData("text/plain", str);
		e.preventDefault();
	}
	document.addEventListener("copy", listener);
	document.execCommand("copy");
	document.removeEventListener("copy", listener);
};