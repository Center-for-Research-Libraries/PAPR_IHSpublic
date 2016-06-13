


	function populateMember(response, ioArgs){

		var test= response;

		var store = new dojo.store.Memory(response)
	    dijit.byId("stateMember").store = store;
	    members=response.data;

	}

	function populateJournalDetail(response, ioArgs) {// AJE 2016-01-12 modifed how the innerHTML is composed : can find a copy of original function in this dir
		// AJE 2016-06-03: mine was stepped on so reinstated
	    document.getElementById("title-col1").innerHTML = '<br>' + response.title;

			/*
			// AJE: saving Travant version 2016-06-03
	    document.getElementById("content-col1").innerHTML = '<ul class="no-decoration"> ' +
	        '<li><strong>Publisher:</strong> ' + response.publisher +
	        '</li> <li><strong>Print ISSN:</strong> ' + response.printISSN +
	        '</li> <li><strong>Electronic ISSN:</strong>  ' + response.eISSN +
	        '</li> <li><strong>OCLC Number:</strong>  ' + response.oclcNumber +
	        '</li> <li><strong>Publication Range:</strong> ' + response.publicationRange +
	        '</li> <li><strong>Publication Language:</strong> ' + response.language +
	        '</li> <li><strong>Publication Country:</strong> ' + response.country +
	        '</li> <li><strong>Volume Level:</strong> ' + response.volumeLevelFlag +
	        '</li> </ul> ';
			*/

      var publisherLI = '<li><strong>Publisher:</strong> ' + response.publisher + '</li>';
			var printISSN_LI = '<li><strong>Print ISSN:</strong> ' + response.printISSN + '</li>';
			var eISSN_LI = '<li><strong>Electronic ISSN:</strong>  ' + response.eISSN + '</li>';
	    var OCLC_LI =  '<li><strong>OCLC Number:</strong>  ' + response.oclcNumber + '</li>';
	    var pub_range_LI = '<li><strong>Publication Range:</strong> ' + response.publicationRange + '</li>';
	    var language_LI = '<li><strong>Publication Language:</strong> ' + response.language + '</li>';
	    var country_LI = '<li><strong>Publication Country:</strong> ' + response.country + '</li>';
			var volume_flag_LI = '<li><strong>Volume Level:</strong> ' + response.volumeLevelFlag + '</li>';
			/* AJE 2016-06-13 : mislabeled Volume Level in my previous fix */

	    document.getElementById("content-col1").innerHTML = '<ul class="no-decoration">' + publisherLI + printISSN_LI + eISSN_LI + OCLC_LI + pub_range_LI + language_LI + country_LI + volume_flag_LI + '<ul>';

			// AJE new: make the link value right
			$("#titlehistory_link_CRL").attr("href", "http://worldcat.org/xissn/titlehistory?issn=" + response.printISSN);
			console.warn("search_home.js has set titlehistory_link_CRL.attr.href = ", $("#titlehistory_link_CRL").attr("href") );


	    call1 = false; // AJE no idea here ; is original
	}


	function updateCommitment(holdingid, obj) {

	    var holdingView = holdings[holdingid];

	    for (var index = 0, len = obj.length; index < len; ++index) {

	        if (obj.childNodes[index].selected) {
	            holdingView.commitmentView[index].checked = '1';
	        } else {
	            holdingView.commitmentView[index].checked = '0';
	        }
	    }

	}

	function updateOverallst(holdingid, obj) {

	    var holdingView = holdings[holdingid];

	    for (var index = 0, len = obj.length; index < len; ++index) {

	        if (obj.childNodes[index].selected) {
	            holdingView.overalls[index].checked = '1';
	        } else {
	            holdingView.overalls[index].checked = '0';
	        }
	    }

	}

	function updateValidation(holdingid, obj) {

	    var holdingView = holdings[holdingid];

	    for (var index = 0, len = obj.length; index < len; ++index) {

	        if (obj.childNodes[index].selected) {
	            holdingView.validationLevels[index].checked = '1';
	        } else {
	            holdingView.validationLevels[index].checked = '0';
	        }
	    }

	}

	function updateIhsVerified(holdingid, obj) {

	    var holdingView = holdings[holdingid];

	    for (var index = 0, len = obj.length; index < len; ++index) {

	        if (obj.childNodes[index].selected) {
	            holdingView.ihsVerified[index].checked = '1';
	        } else {
	            holdingView.ihsVerified[index].checked = '0';
	        }
	    }
	}


	function updateMissingPages(holdingid, search) {

	    var holdingView = holdings[holdingid];
	    holdingView.missingPages = search.value;

	}

	function updateConditions(holdingid, obj) {

	    var holdingView = holdings[holdingid];

	    for (var index4 = 0, len4 = holdingView.holdingConditionsView.length; index4 < len4; ++index4) {

	        if (holdingView.holdingConditionsView[index4].conditionId == obj.value) {
	            if (obj.checked) {
	                holdingView.holdingConditionsView[index4].checked = '1';
	            } else {
	                holdingView.holdingConditionsView[index4].checked = '0';
	            }
	        }
	    }


	}

	 function saveGlobalCondition(){

		 var holdingView = holdings[0];
		 var holdingIds = [];

		 $mvar = $('.clscbvol');
    	 	for (i=0; i<$mvar.length; i++)    {
    	 	   if( $mvar[i].checked == true){
    	 		  var res = $mvar[i].id.split(":");
    	 		  holdingIds.push(res[1]);
    	 	   }
    	 }

    	 holdingView.holdingIds = holdingIds;


   	    dojo.rawXhrPost({
   	        url: "/search/postHoldingConditions",
   	        postData: dojo.toJson(holdingView),
   	        headers: {
   	            "Content-Type": "application/json",
   	            "Accept": "application/json"
   	        },
   	        handleAs: "text",
   	        load: function(data) {

   	        	hideWaiting();
   	        	call2=false;
   	        	getJournalDetail(globalTitleId);
   	        },
   	        error: function(error) {

   	        	hideWaiting();
   	        	call2=false;
   	            alert("Error:" + error);
   	        }
   	    });

   	   call2=true;
   	   showWaiting();


	 }

	 function drawGlobaledit(){



		 try{

			  holdings[0] = clone(holdings[globalHoldingIndex]);

		      var holdingView = holdings[0];

		      holdingView.holdingId = 0;

		 	  var image1 = '&emsp;&emsp;&emsp; <img onclick="saveGlobalCondition();" src="/assets/images/save.gif" width="30" height="15">';


		 	 var tmpcommit = clone(holdingView.commitmentView[0]);
		 	 tmpcommit.id =0;
		 	 tmpcommit.name=" ";
		 	 holdingView.commitmentView.unshift(tmpcommit);

		 	 var commitment = '<select  onchange="updateCommitment(\'0\',this);">';


		 	  for (var index = 0; index < holdingView.commitmentView.length;  index++) {
		 		 commitment += '<option value="' + holdingView.commitmentView[index].id + '">' + holdingView.commitmentView[index].name + '</option>';
			        holdingView.commitmentView[index].checked = 0;
			  }

		 	 commitment += "</select>";


		 	 var tmpoveralls = clone(holdingView.overalls[0]);
		 	 tmpoveralls.id =0;
		 	 tmpoveralls.name=" ";
		 	 holdingView.overalls.unshift(tmpoveralls);

		 	  var overallst = '<select  onchange="updateOverallst(\'0\',this);">';


		 	  for (var index = 0; index < holdingView.overalls.length;  index++) {
			        overallst += '<option value="' + holdingView.overalls[index].id + '">' + holdingView.overalls[index].name + '</option>';
			        holdingView.overalls[index].checked = 0;
			  }

			  overallst += "</select>";

			  var tmpvalidationLevels = clone(holdingView.validationLevels[0]);
			  tmpvalidationLevels.id =0;
			  tmpvalidationLevels.name=" ";
			  holdingView.validationLevels.unshift(tmpvalidationLevels);

			  var validation   =  '<select  onchange="updateValidation(\'0\',this);">';

			  for (var index =0;  index < holdingView.validationLevels.length; index++) {

			        validation += '<option value="' + holdingView.validationLevels[index].id + '">' + holdingView.validationLevels[index].name + '</option>';
			        holdingView.validationLevels[index].checked = 0;
			  }
			   validation += "</select>";

			   var tmpihsVerified = clone(holdingView.ihsVerified[0]);
			       tmpihsVerified.id =0;
			       tmpihsVerified.name=" ";
				   holdingView.ihsVerified.unshift(tmpihsVerified);

			   var ihsVerified = '<select  onchange="updateIhsVerified(\'0\',this);">';


			   for (var index = 0; index < holdingView.ihsVerified.length; index++) {

			            ihsVerified += '<option value="' + holdingView.ihsVerified[index].id + '">' + holdingView.ihsVerified[index].name + '</option>';
			            holdingView.ihsVerified[index].checked = 0;
			   }

			    ihsVerified += "</select>";


			    var tmpOtherissue = '<br>';

			    for (var index = 0; index < holdingView.holdingConditionsView.length; index++) {

			            tmpOtherissue += '<input type="checkbox" onclick="updateConditions(\'0\',this);" value="' + holdingView.holdingConditionsView[index].conditionId + '">' + holdingView.holdingConditionsView[index].name + '</br>';
			            holdingView.holdingConditionsView[index].checked=0;
			    }


			  var st = image1+'<br>'+
				'     <strong>Commitment: </strong> ' + commitment +
				'     <strong><br><br>Condition:</strong> ' +
				'     <br>Overall: ' + overallst +
		        '     <br>Validation Level:' + validation +
		        '     <br>Verified in IHS:' + ihsVerified +
		        '     <br>Other Issues:' + tmpOtherissue;

			   document.getElementById('glbchildCntd').innerHTML = st;
			   document.getElementById("globaledit").style.display  = "block";
		 }catch (e){
			 console.log(e);
		 }


	 }

	function editCondition(holdingid) {

	    var holdingView = holdings[holdingid];

	    var image1 = '&emsp;&emsp;&emsp; <img onclick="saveCondition(' + holdingView.holdingId + ');" src="/assets/images/save.gif" width="30" height="15">';

	    document.getElementById(holdingid + 'image1').innerHTML = image1;


	 	 var commitment = '<select  onchange="updateCommitment('+ holdingid + ', this);">';


	 	  for (var index = 0; index < holdingView.commitmentView.length;  index++) {

	 		 if (holdingView.commitmentView[index].checked == '1') {
	 			 	commitment += '<option value="' + holdingView.commitmentView[index].id + '" selected="selected">' + holdingView.commitmentView[index].name + '</option>';
		        } else {
		        	commitment += '<option value="' + holdingView.commitmentView[index].id + '">' + holdingView.commitmentView[index].name + '</option>';
		        }

		  }

	 	 commitment += "</select>";


	    var overallst = '<select  onchange="updateOverallst(' + holdingid + ', this);">';

	    for (var index4 = 0, len4 = holdingView.overalls.length; index4 < len4; ++index4) {

	        if (holdingView.overalls[index4].checked == '1') {
	            overallst += '<option value="' + holdingView.overalls[index4].id + '" selected="selected" >' + holdingView.overalls[index4].name + '</option>';
	        } else {
	            overallst += '<option value="' + holdingView.overalls[index4].id + '">' + holdingView.overalls[index4].name + '</option>';
	        }
	    }

	    overallst += "</select>";

	    var validation = '<select  onchange="updateValidation(' + holdingid + ', this);">';

	    for (var index4 = 0, len4 = holdingView.validationLevels.length; index4 < len4; ++index4) {

	        if (holdingView.validationLevels[index4].checked == '1') {
	            validation += '<option value="' + holdingView.validationLevels[index4].id + '" selected="selected" >' + holdingView.validationLevels[index4].name + '</option>';
	        } else {
	            validation += '<option value="' + holdingView.validationLevels[index4].id + '">' + holdingView.validationLevels[index4].name + '</option>';
	        }

	    }

	    validation += "</select>";

	    var ihsVerified = '<select  onchange="updateIhsVerified(' + holdingid + ', this);">';

	    for (var index4 = 0, len4 = holdingView.ihsVerified.length; index4 < len4; ++index4) {

	        if (holdingView.ihsVerified[index4].checked == '1') {
	            ihsVerified += '<option value="' + holdingView.ihsVerified[index4].id + '" selected="selected" >' + holdingView.ihsVerified[index4].name + '</option>';
	        } else {
	            ihsVerified += '<option value="' + holdingView.ihsVerified[index4].id + '">' + holdingView.ihsVerified[index4].name + '</option>';
	        }

	    }

	    ihsVerified += "</select>";

	    var missingPages = '<input type="text" value ="' + holdingView.missingPages + '" onkeyup="updateMissingPages(' + holdingid + ',this);">';

	    var tmpOtherissue = '<br>';

	    for (var index4 = 0, len4 = holdingView.holdingConditionsView.length; index4 < len4; ++index4) {

	        if (holdingView.holdingConditionsView[index4].checked == '1') {
	            tmpOtherissue += '<input type="checkbox" onclick="updateConditions(' + holdingid + ',this);" value="' + holdingView.holdingConditionsView[index4].conditionId + '" checked="checked" >' + holdingView.holdingConditionsView[index4].name + '</br>';
	        } else {
	            tmpOtherissue += '<input type="checkbox" onclick="updateConditions(' + holdingid + ',this);" value="' + holdingView.holdingConditionsView[index4].conditionId + '">' + holdingView.holdingConditionsView[index4].name + '</br>';
	        }
	    }

	    var st = '<br> <strong> Commitment </strong> ' + commitment +
	    	'      <br><br><strong>Condition:</strong> ' +
	        '     <br>Overall: ' + overallst +
	        '     <br>Validation Level:' + validation +
	        '     <br>Verified in IHS:' + ihsVerified +
	        '     <br>Missing Pages:' + missingPages +
	        '     <br>Other Issues:' + tmpOtherissue;


	    document.getElementById(holdingid + 'col12').innerHTML = st;

	}

	function saveCondition(holdingid) {

	    var holdingView = holdings[holdingid];

	    var image1 = '&emsp;&emsp;&emsp; <img onclick="editCondition(' + holdingView.holdingId + ');" src="/assets/images/edit.gif" width="30" height="15">';

	    document.getElementById(holdingid + 'image1').innerHTML = image1;

	    document.getElementById(holdingid + 'col12').innerHTML = drawCol2Unedit(holdingView);

	    dojo.rawXhrPost({
	        url: "/search/postHoldingConditions",
	        postData: dojo.toJson(holdingView),
	        headers: {
	            "Content-Type": "application/json",
	            "Accept": "application/json"
	        },
	        handleAs: "text",
	        load: function(data) {
	        	hideWaiting();
	        },
	        error: function(error) {
	        	hideWaiting();
	            alert("Error:" + error);
	        }
	    });

	    showWaiting();
	}


	function editNote(holdingid) {

	    var holdingView = holdings[holdingid];

	    var image2 = '&emsp;&emsp;&emsp; <img onclick="saveNote(' + holdingView.holdingId + ');" src="/assets/images/save.gif" width="30" height="15">';

	    document.getElementById(holdingid + 'image2').innerHTML = image2;

	    document.getElementById(holdingid + 'notes').readOnly = false;


	}

	function saveNote(holdingid) {

	    var holdingView = holdings[holdingid];

	    var image2 = '&emsp;&emsp;&emsp; <img onclick="editNote(' + holdingView.holdingId + ');" src="/assets/images/edit.gif" width="30" height="15">';

	    document.getElementById(holdingid + 'image2').innerHTML = image2;

	    document.getElementById(holdingid + 'notes').readOnly = true;

	    holdingView.notes = document.getElementById(holdingid + 'notes').value;


	    dojo.rawXhrPost({
	        url: "/search/postHoldingNotes",
	        postData: dojo.toJson(holdingView),
	        headers: {
	            "Content-Type": "application/json",
	            "Accept": "application/json"
	        },
	        handleAs: "text",
	        load: function(data) {

	        },
	        error: function(error) {
	            alert("Error:" + error);
	        }
	    });
	}

	function drawCol2Unedit(holdingView) {

	    var tmpOtherissue = '<br>';
	    var overallst = '';
	    var validation = '';
	    var ihsVerified = '';
	    var commitment= '';

	    if (holdingView.holdingConditionsView.length > 0) {
	        for (var index3 = 0, len3 = holdingView.holdingConditionsView.length; index3 < len3; ++index3)
	            if (holdingView.holdingConditionsView[index3].checked == "1") {
	                tmpOtherissue += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + holdingView.holdingConditionsView[index3].name + '<br>';
	            }
	    } else {
	        tmpOtherissue = 'None';
	    }



	 	for (var index4 = 0, len4 = holdingView.commitmentView.length; index4 < len4; ++index4) {

	        if (holdingView.commitmentView[index4].checked == '1')
	        	commitment = holdingView.commitmentView[index4].name;

	    }


	    for (var index4 = 0, len4 = holdingView.overalls.length; index4 < len4; ++index4) {

	        if (holdingView.overalls[index4].checked == '1')
	            overallst = holdingView.overalls[index4].name;

	    }

	    for (var index4 = 0, len4 = holdingView.validationLevels.length; index4 < len4; ++index4) {

	        if (holdingView.validationLevels[index4].checked == '1')
	            validation = holdingView.validationLevels[index4].name;

	    }

	    for (var index4 = 0, len4 = holdingView.ihsVerified.length; index4 < len4; ++index4) {

	        if (holdingView.ihsVerified[index4].checked == '1')
	            ihsVerified = holdingView.ihsVerified[index4].name;

	    }

	    var st = '<strong>Commitment: </strong>' + commitment +
	    	'     <br><br><strong>Condition:</strong> ' +
	        '     <br>Overall: ' + overallst +
	        '     <br>Validation Level:' + validation +
	        '     <br>Verified in IHS:' + ihsVerified +
	        '     <br>Missing Pages:' + holdingView.missingPages +
	        '     <br>Other Issues:' + tmpOtherissue;

	    return st;
	}

	function buildHoldingHTML(holdingView) {


	    var image1 = "";
	    var image2 = "";

	    var image1Id = holdingView.holdingId + "image1";
	    var image2Id = holdingView.holdingId + "image2";
	    var notesId = holdingView.holdingId + "notes";

	    var col12 = holdingView.holdingId + 'col12';
	    var col13 = holdingView.holdingId + 'col13';

	    holdings[holdingView.holdingId] = holdingView;


	    if (holdingView.editable == '1') {
	        image1 = '&emsp;&emsp;&emsp; <img onclick="editCondition(' + holdingView.holdingId + ');" src="/assets/images/edit.gif" width="30" height="15">'
	        image2 = '&emsp;&emsp;&emsp; <img onclick="editNote(' + holdingView.holdingId + ');" src="/assets/images/edit.gif" width="30" height="15">'
	        globalHoldingIndex=holdingView.holdingId;
	    }


	    var holdingidtmp = ' <div class="holding" id="holding' + holdingView.holdingId + '"> ' +
	        '	<div class="holding-col1"> ' +
	        ' 		<strong>' + holdingView.member + ' </strong><br /> ' +
	        holdingView.location + '<br /> ' +
	        holdingView.location1 + '<br /> ' +
	        holdingView.location2 +
	        ' 	</div> ' +

	        '   <div id="' + image1Id + '">' + image1 + '</div>' +
	        '   <div class="holding-col2" id="' + col12 + '" > ' +

	        drawCol2Unedit(holdingView) +

	        '   </div> ' +

	        '  <div id="' + image2Id + '">' + image2 + '</div>' +
	        '    <div class="holding-col3" id="' + col13 + '" > ' +
	        '       <strong>Notes:</strong> ' +
	        '  	    <textarea class="issue-notes" id="' + notesId + '" readonly> ' +
	        holdingView.notes +
	        '        </textarea>' +
	        '     </div> ' +
	        '   </div> ' +
	        '  </div> ';

	    return holdingidtmp;
	}

    function drawPie(response){


    	var width = 150,
   			height = 150,
    		radius = Math.min(width, height) / 2;


    	var color = d3.scale.ordinal()
    		.range(["#8080FF", "#FFFF80", "#FF8080" ]);

		var arc = d3.svg.arc()
    	.outerRadius(radius - 10)
    	.innerRadius(0);

    	var pie = d3.layout.pie()
    		.sort(null)
    		.value(function(d) { return d.number; });

		var svg = d3.select("#content-col2").append("svg")
    	.attr("width", width)
    	.attr("height", height)
  		.append("g")
    	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    	var data = response[0].chart;


    	data.forEach(function(d) {
    		d.number = +d.number;
  		});

  		var g = svg.selectAll(".arc")
      		.data(pie(data))
    		.enter().append("g")
      		.attr("class", "arc");

  		g.append("path")
      		.attr("d", arc)
      		.style("fill", function(d) { return color(d.data.status); });

  		g.append("text")
      		.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      		.attr("dy", ".35em")
      		.style("text-anchor", "middle")
      		.attr("font-size", "10")
      		.text(function(d) { return d.data.status + '(' + d.data.number + ')' ; });

    }

    function moveCursor(volIndex){

		var volDivs = dojo.query(".dijitTitlePane");

		for (var i=0; i < volDivs.length; i++) {
			for (var i=0; i<volDivs.length; i++) {

				var volWidget = dijit.registry.byNode(volDivs[i]);
				if(volWidget.title.search("Vol") != -1) {
  					 if (!volWidget.open) volWidget.toggle();
				}

				if(volWidget.title.search("Issue") != -1) {
  					  if (volWidget.open) volWidget.toggle();
				}

			}
		}


		var issuesDiv =  document.getElementById('issues');
		issuesDiv.scrollTop = volIndex;

    }

    function drawTimeBar(response, numberOfIssue){

    	var totalsize =800;
    	var issuessize = totalsize/numberOfIssue;
    	var divindex=0;
    	var numberofissue=0;

    	var html = '<br>';

    	for (var index = 0, len = response.length; index < len; ++index) {

    		 var issueView = response[index].issueView;


			 numberofissue = 0;

	         for (var index1 = 0, len1 = issueView.length; index1 < len1; ++index1) {

	        	if(issueView[index1].issueStatus == "Held"){
	    			html += '<div class="timeline timeline-held" style="width:'+issuessize+'px;" onclick="moveCursor( ' + divindex +');"> <span class="coupontooltip"> Vol.'
	    					+ response[index].volumeNumber +  ' <br> Issue. '
	    					+ issueView[index1].issueNumber  + '<br>'
	    					+ issueView[index1].issueMonth + ' </span> </div>';
	        	}

	        	if(issueView[index1].issueStatus == "Missing") {
	        			html += '<div class="timeline timeline-missing" style="width:'+issuessize+'px;" onclick="moveCursor( ' + divindex +');"> <span class="coupontooltip"> Vol.'
	    					+ response[index].volumeNumber +  ' <br> Issue. '
	    					+ issueView[index1].issueNumber  + '<br>'
	    					+ issueView[index1].issueMonth + ' </span> </div>';

	        	}

	        	if(issueView[index1].issueStatus == "Wanted") {
	        			html += '<div class="timeline timeline-wanted" style="width:'+issuessize+'px;" onclick="moveCursor( ' + divindex +');"> <span class="coupontooltip"> Vol.'
	    					+ response[index].volumeNumber +  ' <br> Issue. '
	    					+ issueView[index1].issueNumber  + '<br>'
	    					+ issueView[index1].issueMonth + ' </span> </div>';

	        	}

	        	numberofissue+=24.75;
	         }
    		divindex+=24.75+numberofissue;
    	}

    	if(response.length > 0) {
    		html += '<div id="timeline-left">|' +  response[0].volumeYear + '</div>';
			html += '<div id="timeline-center"> | </div>';
			html +=	'<div id="timeline-right">' + response[response.length-1].volumeYear + '|</div><br>';
    	}
    	document.getElementById("timeline").innerHTML=html;


    }



	function populateVolumeDetail(response, ioArgs) {



		var numberOfIssue=0;
		var volumeLevelFlag = '0';

	    document.getElementById("summary").style.display = 'block';

	    holdings = {};

	    for (var index = 0, len = response.length; index < len; ++index) {

	    	var table1 =  document.getElementById('table1');
	    	var row = table1.insertRow(index);

	    	volumeLevelFlag = response[index].volumeLevelFlag;

	    	var cb = document.createElement('input');

	    	cb.type = 'checkbox';
	    	cb.id = 'cbvol:'+index;

	    	cb.onclick = function() {

	    		var res = this.id.split(":");
   	    	 	$mvar = $('.clscbvol.'+ res[1]);
   	    	 	for (i=0; i<$mvar.length; i++)    {
   	    	 		if ( this.checked ) {
   	    	 			$mvar[i].checked = true;

   	    	 		} else {
   	    	 			$mvar[i].checked = false;
   	    	 		}

   	    	 	}


	    	};


	    	row.appendChild(cb);


	    	var element = document.createElement('div');
			var voldiv = 'vol' + response[index].volumeNumber;
			element.id = voldiv;
			element.style.float = "Right"

			row.appendChild(element);

	    	var title = response[index].volumeYear + " Vol. " + response[index].volumeNumber;

	        //var issueid = '<div id = "issueid' + index + '"></div>';
	    	var issueid = '<table id="issuetable'+ index + '"> </table>';

	        var tp = new dijit.TitlePane({
	            title: title,
	            content: issueid,
	            style: "width: 750px;",
	            open: true
	        });

	        document.getElementById(voldiv).appendChild(tp.domNode);


	        var issueView = response[index].issueView;

	        for (var index1 = 0, len1 = issueView.length; index1 < len1; ++index1) {

	            var holdinghtml = ' ';

				numberOfIssue++;

	            var holdingViews = issueView[index1].holdingViews;

	            for (var index2 = 0, len2 = holdingViews.length; index2 < len2; ++index2) {

	                holdinghtml = holdinghtml + buildHoldingHTML(holdingViews[index2]);

	            }

	            var issueTitle =  '';
	            if( volumeLevelFlag == '1'){
	            	issueTitle = 'Volume Details' +
	                '&emsp;|&emsp;' + issueView[index1].issueStatus + '&emsp;|&emsp;' + '&emsp;|&emsp;Best Holding Condition: ' + issueView[index1].issueCondition;
	            }else {
	            	 issueTitle = 'Issue ' + issueView[index1].issueNumber + '&emsp;|&emsp;' + issueView[index1].issueMonth +
		                '&emsp;|&emsp;' + issueView[index1].issueStatus + '&emsp;|&emsp;' +
		                issueView[index1].issueCount + '&emsp;|&emsp;Best Holding Condition: ' + issueView[index1].issueCondition;
	            }


	            var clr = "";

	            if (issueView[index1].issueStatus == "Held") {
	                clr = "issue held"
	            }
	            if (issueView[index1].issueStatus == "Missing") {
	                clr = "issue missing"
	            }
	            if (issueView[index1].issueStatus == "Wanted") {
	                clr = "issue wanted"
	            }

	            var issuetp = new dijit.TitlePane({
	                title: issueTitle,
	                content: holdinghtml,
	                open: false,
	                style: "width: 700px;'",
	                class: clr
	            });

	            var issuetable =  document.getElementById('issuetable'+index);
		    	var issuerow = issuetable.insertRow(index1);

		    	for (var index3 = 0; index3 <holdingViews.length; index3++) {

		    		if(holdingViews[index3].editable == '1'){
	    				var cb1 = document.createElement('input');
	    				cb1.type = 'checkbox';
	    				cb1.style.float= 'Left'
	    				cb1.className = 'clscbvol '+index
	    				cb1.id= 'holdingid:' + holdingViews[index3].holdingId;
	    				issuerow.appendChild(cb1);
	    				break;
	    	    	}
		        }



		    	var issueelement = document.createElement('div');
		    	issueelement.style.float= 'Right';

		    	issueelement.appendChild(issuetp.domNode);


		    	issuerow.appendChild(issueelement);

		    	hideWaiting();
	        }
	    }


	    if(response.length > 0) {
	    	document.getElementById("content-col2").innerHTML = ' ';
			drawPie(response);
		}else{
			document.getElementById("content-col2").innerHTML ='<img src="/assets/images/empty.gif" height="42" width="42" />' ;
		}

	    if( volumeLevelFlag == 0)
	    	drawTimeBar(response, numberOfIssue);


		drawGlobaledit();

	    call2 = false;
	    hideWaiting();
	}

	function getJournalDetail(id) {


	    if (call1 || call2)
	        return;

	    call1 = true;
	    call2 = true;

	    globalTitleId=id;
	    showWaiting();

	    document.getElementById("title-col1").innerHTML = ' ';


	    var glbchildNode = document.getElementById("childiedit");
	    glbchildNode.parentNode.removeChild(glbchildNode);
	    var element = document.createElement('div');
	    element.id = "childiedit";
	    document.getElementById("globaledit").appendChild(element);
	    document.getElementById("globaledit").style.marginLeft  = "55px";
	    document.getElementById("globaledit").style.display  = "none";

	    var glbchildCntd = '<div id="glbchildCntd"> test</div>'
	    var tpgbedt = new dijit.TitlePane({
            title: "Multi-Record Edit (Choose Volumes and Issues Below)",
            content: glbchildCntd,
            style: "width: 750px;",
            open: false
        });
	    document.getElementById('childiedit').appendChild(tpgbedt.domNode);


	    var childNode = document.getElementById("childissues");
	    childNode.parentNode.removeChild(childNode);
	    var element = document.createElement('div');
	    element.id = "childissues";
	    document.getElementById("issues").appendChild(element);

	    //Add tbale
	    var tbl     = document.createElement("table");
	    tbl.id ="table1"
	    element.appendChild(tbl);

	    // document.getElementById("summary").innerHTML=' ';

	    dojo.xhrGet({
	        handleAs: 'json',
	        url: "/search/getJournalDetail/" + id,
	        preventCache: true,
	        error: function(e) {
	            alert("Error: " + e.message);
	        },
	        load: populateJournalDetail
	    });


	    dojo.xhrGet({
	        handleAs: 'json',
	        url: "/search/getJournalVolumeDetail/" + id + "/" + memberid,
	        preventCache: true,
	        error: function(e) {
	            alert("Error: " + e.message);
	        },
	        load: populateVolumeDetail
	    });


	    dojo.xhrGet({
	        handleAs: 'json',
	        url: "/search/getJournalWantStatus/" + id ,
	        preventCache: true,
	        error: function(e) {
	            alert("Error: " + e.message);
	        },
	        load:  function(response) {

	        	 if(response.status == 0){
	        		 document.getElementById('want-status').innerHTML = " Title Status Wanted ";
	        		 document.getElementById('want-status').value = 0;
	        	 }else {
	        		 document.getElementById('want-status').innerHTML = " Title Status Not Wanted ";
	        		 document.getElementById('want-status').value = 1;
	        	 }
	        }

	    });


	}


	function setJournalWantStatus(){

		var status =  document.getElementById('want-status').value;

		dojo.xhrGet({
	        handleAs: 'json',
	        url: "/search/setJournalWantStatus/" + globalTitleId + "/" + status,
	        preventCache: true,
	        error: function(e) {
	            alert("Error: " + e.message);
	        },
	        load:  function(response) {
	        	if(response.status == 0){
	        		 document.getElementById('want-status').innerHTML = " Title Status Wanted ";
	        		 document.getElementById('want-status').value = 0;
	        	 }else {
	        		 document.getElementById('want-status').innerHTML = " Title Status Not Wanted ";
	        		 document.getElementById('want-status').value = 1;
	        	 }
	        }

	    });
	}

	function populateSearchList(response, ioArgs) {
	    var results = document.getElementById('results');

	    results.style.visibility = "visible";

	    var ul = document.getElementById('search-list');

	    if (ul != null) {
	        results.removeChild(ul);
	    }

	    ul = document.createElement('ul');
	    ul.setAttribute('id', 'search-list');

	    for (i = 0; i < response.items.length; i++) {
	        var li = document.createElement('li');
	        var a = document.createElement('a');

	        a.innerHTML = response.items[i].title;
	        a.setAttribute('href', 'javascript:getJournalDetail(' + response.items[i].titleId + ');');
	        a.setAttribute('title', response.items[i].title);
	        li.appendChild(a);
	        ul.appendChild(li);
	    }
	    results.appendChild(ul);

	}

	function seachJournalByTitle(search) {

		var results = document.getElementById('results');
		var issn = document.getElementById('issnid');
		issn.value="";
		var oclc = document.getElementById('oclcid');
		oclc.value="";


		var value = search.value.replace('\\', ' ').replace('\/', ' ').replace('  ', ' ');

		var value1 = search.value.replace(' ', '');

	    if (value.length < 2 ) {
	        results.innerHTML = ' ';
	    } else {

	        if (value1.length % 3  == 0 || search.value.charAt(search.value.length-1) == ' ') {
	            dojo.xhrGet({
	                handleAs: 'json',
	                url: "/search/seachJournalByTitle/" + value,
	                preventCache: true,
	                error: function(e) {
	                    alert("Error: " + e.message);
	                },
	                load: populateSearchList
	            });
	        }
	    }
	}

	function seachJournalByISSN(search) {

	  var results = document.getElementById('results');

		var oclc = document.getElementById('oclcid');
		oclc.value="";

	  var title = document.getElementById('titleid');
	  title.value="";


	    var st = search.value.replace('-', '');


	    if (st.length < 2) {
	        results.innerHTML= ' ';
	    } else {
	        if (st.length == 8) {
	            dojo.xhrGet({
	                handleAs: 'json',
	                url: "/search/seachJournalByISSN/" + st,
	                preventCache: true,
	                error: function(e) {
	                    alert("Error: " + e.message);
	                },
	                load: populateSearchList
	            });
	        }
	    }
	}

	function seachJournalByOCLC(search) {

		  var results = document.getElementById('results');

		  var title = document.getElementById('titleid');
		  title.value="";

		  var issn = document.getElementById('issnid');
			issn.value="";

		  var st = search.value;

		    if (st.length < 2) {
		        results.innerHTML= ' ';
		    } else {
		        if (st.length > 4) {
		            dojo.xhrGet({
		                handleAs: 'json',
		                url: "/search/seachJournalByOCLC/" + st,
		                preventCache: true,
		                error: function(e) {
		                    alert("Error: " + e.message);
		                },
		                load: populateSearchList
		            });
		        }
		    }
		}


	function collapseAllVolumes() {

		var volDivs = dojo.query(".dijitTitlePane");

		for (var i=0; i < volDivs.length; i++) {
			for (var i=0; i<volDivs.length; i++) {

				var volWidget = dijit.registry.byNode(volDivs[i]);
				if(volWidget.title.search("Vol") != -1) {
  					 if (volWidget.open) volWidget.toggle();
				}
			}
		}

	}

	function expandAllVolumes() {

		var volDivs = dojo.query(".dijitTitlePane");

		for (var i=0; i < volDivs.length; i++) {
			for (var i=0; i<volDivs.length; i++) {

				var volWidget = dijit.registry.byNode(volDivs[i]);
				if(volWidget.title.search("Vol") != -1) {
					 if(volWidget.title == "Multi-Record Edit (Choose Volumes and Issues Below)"){

					 }else {
						 if (!volWidget.open) volWidget.toggle();

					 }
				}

			}
		}
	}


