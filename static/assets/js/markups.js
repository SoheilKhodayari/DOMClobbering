
var domClobberingMarkups = [];


const fetchMarkupsHeaders = {
    method: 'get',
    headers: {
        'content-type': 'text/csv;charset=UTF-8',
    },
};

const response = fetch("./../domc_markups/dom-clobbering-markups.csv", fetchMarkupsHeaders)
   .then(response => response.text())
   .then(rawData => Papa.parse(rawData))
   .catch(err => console.log(err))

response.then(rawData => {

    domClobberingMarkups = prepare_table_data(rawData.data);
    set_table_data(domClobberingMarkups);

});

function sanitize(markup) {
    return markup.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}


function prepare_table_data(rawData){

    var tableData = [];
    for(let [idx, markup] of rawData.entries()){

        if(idx === 0) {
            continue; // pass the CSV header
        }


        let formattedMarkupData = {
            "id": idx,
            "Markup":  sanitize(markup[0]).trim(),
            "Clobbered": markup[1].trim(),
            "Tag1":  markup[2].trim(),
            "Tag2": markup[3].trim(),
            "Attributes1": markup[4].trim(),
            "Attributes2": markup[5].trim(),
            "RelationType": markup[6].trim(),
            "ReferenceType": markup[7].trim(),
            // ios
            "Firefox-iOS_39.0": markup[8].trim() === '1'?  '✅': '❌',
            "Safari-iOS_14.7.1": markup[14].trim() === '1'?  '✅': '❌',
            "Chrome-iOS_92.0.4515.90": markup[20].trim() === '1'?  '✅': '❌',
            "Opera-iOS_3.2.3": markup[22].trim() === '1'?  '✅': '❌',
            "Edge-iOS_95.0.1020.47": markup[18].trim() === '1'?  '✅': '❌',
            // desktop
            "Chrome-Desktop_96": markup[10].trim() === '1'?  '✅': '❌',
            "Firefox-Desktop_95.0": markup[11].trim() === '1'?  '✅': '❌',
            "Opera-Desktop_82.0.4227.23": markup[9].trim() === '1'?  '✅': '❌',
            "Safari-Desktop_15.1": markup[12].trim() === '1'?  '✅': '❌',
            "Safari-Desktop_14.1": markup[17].trim() === '1'?  '✅': '❌',
            "Safari-Desktop_13.1": markup[21].trim() === '1'?  '✅': '❌',
            "TorBrowser-Desktop_11.0.1-mozilla91.3.0esr": markup[24].trim() === '1'?  '✅': '❌',
            "Edge-Desktop_96.0.1054.43": markup[25].trim() === '1'?  '✅': '❌',
            // android
            "UCBrowser-Android_13.3.8.1305": markup[13].trim() === '1'?  '✅': '❌',
            "Firefox-Android_94.1.2": markup[15].trim() === '1'?  '✅': '❌',
            "Chrome-Android_95.0.4638.74": markup[16].trim() === '1'?  '✅': '❌',
            "Edge-Android_95.0.1020.48": markup[16].trim() === '1'?  '✅': '❌',
            "SamsungInt-Android_15.0.6.3": markup[19].trim() === '1'?  '✅': '❌',
            "Opera-Android_65.2.3381.61420": markup[23].trim() === '1'?  '✅': '❌',
           
            
        }
        tableData.push(formattedMarkupData);
    }
    return tableData;
}

function set_table_data(data){


    $('#table-payloads').bootstrapTable({
        data: data,
    });

    // remove the border for bootstrap `Loading, please wait` text
    // and make it hidden
    var isLoadingEl = $('.fixed-table-loading').removeClass('table-bordered');
    setTimeout((e)=> {
        isLoadingEl.hide();
    }, 1000);


}


$(document).ready(function(){

  var searchTextElement = $("#search-table");
  var searchButtonElement =  $("#search-button");

  var search_handler = function(e) {
    var value = searchTextElement.val().toLowerCase();
    $("#table-payloads tbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  };

  searchTextElement.on("keyup", search_handler);
  searchButtonElement.on("click", search_handler);

});





