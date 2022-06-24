/* list of clobbering markups after being loaded */
var dom_clobbering_markups = [];

/* area to append the test DOM clobbering payloads */
var clobbering_payload_area = document.getElementById('clobbering-payloads');

/* variable to enable/disable debug console logs */
var DEBUG = true;

function test_clobbering_markup(markup, target) {


    let flag = false;
    let div = document.createElement('div');
    try {
        div.innerHTML = markup;
        clobbering_payload_area.appendChild(div);

        let value = eval(target);
        DEBUG && console.log(value);
        // check if the referenced value by the target is an HTML element, HTMLCollection, WindowProxy, or a number
        // i.e., clobbering successful or not
        if (value && (!isNaN(value) || 
            value.toString().indexOf('HTML') > -1 || 
            value.toString().indexOf('Element') > -1 || 
            value.toString().indexOf('HTMLCollection') > -1 ||
            value.toString().indexOf('Window') > -1 ||
            value.toString().indexOf('Proxy') > -1 )
        ) {
            DEBUG && console.log(value.toString())
            flag = true;
        }
    } catch(e) {
        // PASS
        DEBUG && console.log(e)
        flag = false;
    }

    // cleanup
    clobbering_payload_area.removeChild(div);

    return flag;

}


function sanitize(markup) {
    return markup.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function unescape(markup) {
    return markup.replaceAll("&quot;", '"').replaceAll("&gt;", '>').replaceAll("&lt;", '<').replaceAll("&amp;", '&');
}

function highlight_code_blocks(){
    let code_elements = document.querySelectorAll('code');
    for(let el of code_elements){
        highlight_code(el);
    } 
}

function highlight_code(codeElement){
    codeElement.innerHTML = highlight(codeElement.innerHTML);
}


function get_payloads_table_browser_header_names(){

    let browsers = ['Firefox-iOS_39.0',
        'Safari-iOS_14.7.1',
        'Chrome-iOS_92.0.4515.90',
        'Opera-iOS_3.2.3',
        'Edge-iOS_95.0.1020.47',
        'Chrome-Desktop_96',
        'Firefox-Desktop_95.0',
        'Opera-Desktop_82.0.4227.23',
        'Safari-Desktop_15.1',
        'Safari-Desktop_14.1',
        'Safari-Desktop_13.1',
        'TorBrowser-Desktop_11.0.1-mozilla91.3.0esr',
        'Edge-Desktop_96.0.1054.43',
        'UCBrowser-Android_13.3.8.1305',
        'Firefox-Android_94.1.2',
        'Chrome-Android_95.0.4638.74',
        'Edge-Android_95.0.1020.48',
        'SamsungInt-Android_15.0.6.3',
        'Opera-Android_65.2.3381.61420']
    return browsers;


}

function prepare_table_data(rawData) {

    var tableData = [];
    for (let [idx, markup] of rawData.entries()) {

        if (idx === 0) {
            continue; // pass the CSV header
        }


        let formattedMarkupData = {
            "id": idx,
            "Markup": sanitize(markup[0]).trim(),
            "Clobbered": markup[1].trim(),
            "Tag1": markup[2].trim(),
            "Tag2": markup[3].trim(),
            "Attributes1": markup[4].trim(),
            "Attributes2": markup[5].trim(),
            "RelationType": markup[6].trim(),
            "ReferenceType": markup[7].trim(),
            // ios
            "Firefox-iOS_39.0": markup[8].trim() === '1' ? '✅' : '❌',
            "Safari-iOS_14.7.1": markup[14].trim() === '1' ? '✅' : '❌',
            "Chrome-iOS_92.0.4515.90": markup[20].trim() === '1' ? '✅' : '❌',
            "Opera-iOS_3.2.3": markup[22].trim() === '1' ? '✅' : '❌',
            "Edge-iOS_95.0.1020.47": markup[18].trim() === '1' ? '✅' : '❌',
            // desktop
            "Chrome-Desktop_96": markup[10].trim() === '1' ? '✅' : '❌',
            "Firefox-Desktop_95.0": markup[11].trim() === '1' ? '✅' : '❌',
            "Opera-Desktop_82.0.4227.23": markup[9].trim() === '1' ? '✅' : '❌',
            "Safari-Desktop_15.1": markup[12].trim() === '1' ? '✅' : '❌',
            "Safari-Desktop_14.1": markup[17].trim() === '1' ? '✅' : '❌',
            "Safari-Desktop_13.1": markup[21].trim() === '1' ? '✅' : '❌',
            "TorBrowser-Desktop_11.0.1-mozilla91.3.0esr": markup[24].trim() === '1' ? '✅' : '❌',
            "Edge-Desktop_96.0.1054.43": markup[25].trim() === '1' ? '✅' : '❌',
            // android
            "UCBrowser-Android_13.3.8.1305": markup[13].trim() === '1' ? '✅' : '❌',
            "Firefox-Android_94.1.2": markup[15].trim() === '1' ? '✅' : '❌',
            "Chrome-Android_95.0.4638.74": markup[26].trim() === '1' ? '✅' : '❌',
            "Edge-Android_95.0.1020.48": markup[16].trim() === '1' ? '✅' : '❌',
            "SamsungInt-Android_15.0.6.3": markup[19].trim() === '1' ? '✅' : '❌',
            "Opera-Android_65.2.3381.61420": markup[23].trim() === '1' ? '✅' : '❌',


        }
        tableData.push(formattedMarkupData);
    }
    return tableData;
}

function set_table_data(data) {

    var table = $('#table-payloads').bootstrapTable({
        data: data,
    });


    // remove the border for bootstrap `Loading, please wait` text
    // and make it hidden
    var is_loading_el = $('.fixed-table-loading').removeClass('table-bordered');
    setTimeout((e) => {
        is_loading_el.hide();
    }, 1000);
}

function detailFormatter(index, row) {
    let markup = '' + row["Markup"];
    let clobbered = row['Clobbered'];

    let works_in_browsers = [];
    let keys = Object.keys(row)
    for (let k of keys){
        if(row[k] === '✅'){
            works_in_browsers.push(k)
        }
    }

    return `<div class="mx-md-2 my-md-2" style="width:1080px!important;">
	
	   	<h4 class="mx-md-1 text-info"><i class="fab fa-chrome"></i><span class="ml-2">Online Browser Testing</span></h4>

	   	<div class="row mx-md-1 my-md-2">
   <pre><code class="code my-md-2">
   let payload = \`${markup}\`;
   let div = document.createElement('div');
   let is_clobbered = false;
   try {
        div.innerHTML = payload;
        document.body.appendChild(div);
        let v = eval(target);
        if (v && (!isNaN(v) || v.toString().indexOf('HTML') > -1 || v.toString().indexOf('Element') > -1     
             || v.toString().indexOf('Collection') > -1 || v.toString().indexOf('Window') > -1) {
            is_clobbered = true;
        }
    } catch(e) {
        is_clobbered = false;
    }
    document.body.removeChild(div);
    console.log("clobbered:", is_clobbered);
    </code></pre>

		    <p class="my-md-2">Test this clobbering payload in your browser now:</p>
		    <button id="run-test-${index+1}" data-markup="${markup}" data-clobbered="${clobbered}" class="btn btn-info ml-2">Run Test</button>
		</div>

		<div id="test-success-${index+1}" style="display:none">
		   	<div class="row mx-md-1 my-md-2">
			    	<b class="text-light">Result:</b> 
			    	<span class="text-success ml-md-2"> ✅ Success. </span>
			</div>
		   	<div class="row mx-md-1">
			    	<b class="text-light">Description:</b> 
			    	<span class="ml-md-2"> The attack payload works in your browser.</span>
			</div>
		</div>

		<div id="test-failed-${index+1}" style="display:none">
		   	<div class="row mx-md-1 my-md-2">
			    	<b class="text-light">Result:</b> 
			    	<span class="text-danger ml-md-2"> ❌ Failed. </span>
			</div>
		   	<div class="row mx-md-1">
			    	<b class="text-light">Description:</b> 
			    	<span class="ml-md-2"> The attack payload does not work in your browser.</span>
			</div>
		</div>

        <hr>

        <h4 class="mx-md-1 text-info"><i class="fas fa-database"></i><span class="ml-2">Browsers</span></h4>
        <div class="row mx-md-1 mt-md-2">
            <p class="my-md-2">This payload works in the following browsers:</p>
        </div>
        <div class="row mx-md-1">
            <p class="ml-md-2">${works_in_browsers.join(',<br/>')}</p>
        </div>

       

    </div>`

}


$(document).ready(function() {

    // load markups
    const fetch_markup_headers = {
        method: 'get',
        headers: {
            'content-type': 'text/csv;charset=UTF-8',
        },
    };

    const response = fetch("./../domc_markups/dom-clobbering-markups.csv", fetch_markup_headers)
        .then(response => response.text())
        .then(raw_data => Papa.parse(raw_data))
        .catch(err => console.log(err))

    response.then(raw_data => {
        dom_clobbering_markups = prepare_table_data(raw_data.data);
        set_table_data(dom_clobbering_markups);
    });


    // markup search functionality
    var $search_text_el = $("#search-table");
    var $search_button_el = $("#search-button");

    var search_handler = function(e) {
        var value = $search_text_el.val().toLowerCase();
        $("#table-payloads tbody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    };

    $search_text_el.on("keyup", search_handler);
    $search_button_el.on("click", search_handler);


    // filtering functionality by browser / version / platform
    var $filter_browser_el = $('#filter-browser');
    var $filter_browser_el_reset = $('#filter-browser-reset');
    $filter_browser_el.on("keyup", function(e){

        if(e.key !== "Enter" && e.keyCode !== 13){ return; }

        let value = $filter_browser_el.val().toLowerCase().trim();
        let all_th_header_names = get_payloads_table_browser_header_names();
        let $table = $('#table-payloads');

        if(value === ''){
            for (let th of all_th_header_names){
                $table.bootstrapTable('showColumn', th);
            }
        }else{   
            for (let th of all_th_header_names){
                if(th.toLowerCase().trim().indexOf(value) > -1){
                    $table.bootstrapTable('showColumn', th);
                    continue;
                }
                try{
                     $table.bootstrapTable('hideColumn', th);
                 }catch(e){
                    console.log(th, e)
                }
               
            }
        }
    });

    $filter_browser_el_reset.on('click', function(e){
        $filter_browser_el.val('');
        let $table = $('#table-payloads');
        let all_th_header_names = get_payloads_table_browser_header_names();
        for (let th of all_th_header_names){
            $table.bootstrapTable('showColumn', th);
        }
    });



    // event handler for the download payloads button
    $('#btn-download-payloads').on('click', function(e) {
        let url = 'https://github.com/SoheilKhodayari/DOMClobbering/raw/master/domc_markups/dom-clobbering-markups.csv';
        window.open(url);
    });

    // event handler for the test browser button
    $("#btn-test-browser").on('click', function(e) {
        // click on the first tr element of the table
        document.querySelectorAll('[class=detail-icon]')[0].click();
        highlight_code_blocks();
    });


    // event handler for testing each payload in the user's browser
    $('#table-payloads').on('click', 'tbody tr button[id^=run-test-]', function(e) {

        let markup = $(this).attr('data-markup');
        let clobbered = $(this).attr('data-clobbered');
        let unescaped_markup = unescape(markup);
        let test_result = test_clobbering_markup(unescaped_markup, clobbered);

        let test_id = $(this).attr('id').split('-').pop();
        let test_failed_el = $('#test-failed-' + test_id);
        let test_success_el = $('#test-success-' + test_id);

        if (test_result) {
            test_failed_el.hide();
            test_success_el.show('invisible');
        } else {
            test_success_el.hide('invisible');
            test_failed_el.show('invisible');
        }
    });

    // event handler for code syntax highlighting
    $('#table-payloads').on('click', 'tbody tr', function(e) {
        highlight_code_blocks();
    })

    // horizontall scrolling
    $("#scroll-table-right").on('click', function(e){
        // scrolls to right; 
        let pixels = 700;
        var leftPos = $('#table-payloads').scrollLeft();
        $("#table-payloads").animate({scrollLeft: leftPos + pixels}, 100);
    });

    $("#scroll-table-left").on('click', function(e){
        // scrolls to left; 
        let pixels = 700;
        var leftPos = $('#table-payloads').scrollLeft();
        $("#table-payloads").animate({scrollLeft: leftPos - pixels}, 100);
    });


});

