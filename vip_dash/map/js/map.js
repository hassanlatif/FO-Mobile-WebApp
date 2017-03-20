INVENTORY_FILE_PATH = 'stc_ipvpn_sla_dashboard.csv';

plotN = "plotNodeCL";
plotT = "TypeCL";
var refreshTimer;
Service = 'Voice';
var INVENTORY_TYPE_NAME_CIRCUIT = 'CIRCUIT';
var INVENTORY_TYPE_NAME_FIBER = 'FIBER';
var INVENTORY_TYPE_NUM_FIBER = '1';
var INVENTORY_TYPE_NAME_COPPER = 'COPPER';
var INVENTORY_TYPE_NUM_COPPER = '2';
var INVENTORY_TYPE_NAME_UPE = 'UPE';
var INVENTORY_TYPE_NUM_UPE = '3';

// Default google map init variables
var MAP_INIT_LAT = 24.527135;
var MAP_INIT_LNG = 47.592773;
var MAP_INIT_ZOOM = 4;
//var MAP_INIT_MAX_ZOOM = 16;
// Marker Cluster init params
var MAX_MAP_CLUSTER_ZOOM = 14;
var MAX_MAP_CLUSTER_GRIDSIZE = 50;
// Link to icons for inventory

var CIRCUIT_YELLOW_SNR_C_IMG = './images/mapoints/circuit_yellow_c.gif';
var CIRCUIT_ORANGE_SNR_C_IMG = './images/mapoints/circuit_orange_c.gif';
var CIRCUIT_RED_SNR_C_IMG = './images/mapoints/circuit_red_c.gif';
var CIRCUIT_GRAY_SNR_C_IMG = './images/mapoints/circuit_gray_c_2.gif';
var CIRCUIT_BLACK_SNR_C_IMG = './images/mapoints/circuit_black_c_2.gif';

var CIRCUIT_YELLOW_SNR_F_IMG = './images/mapoints/circuit_yellow_f.gif';
var CIRCUIT_ORANGE_SNR_F_IMG = './images/mapoints/circuit_orange_f.gif';
var CIRCUIT_RED_SNR_F_IMG = './images/mapoints/circuit_red_f.gif';
var CIRCUIT_GRAY_SNR_F_IMG = './images/mapoints/circuit_gray_f.gif';
var CIRCUIT_BLACK_SNR_F_IMG = './images/mapoints/circuit_black_f.gif';

var CIRCUIT_YELLOW_SNR_T_IMG = './images/mapoints/circuit_yellow_t.gif';
var CIRCUIT_ORANGE_SNR_T_IMG = './images/mapoints/circuit_orange_t.gif';
var CIRCUIT_RED_SNR_T_IMG = './images/mapoints/circuit_red_t.gif';
var CIRCUIT_GRAY_SNR_T_IMG = './images/mapoints/circuit_gray_t.gif';
var CIRCUIT_BLACK_SNR_T_IMG = './images/mapoints/circuit_black_t.gif';

var CIRCUIT_YELLOW_SNRTT_TC_IMG = './images/mapoints/circuit_yellow_tc.gif';
var CIRCUIT_ORANGE_SNRTT_TC_IMG = './images/mapoints/circuit_orange_tc.gif';
var CIRCUIT_RED_SNRTT_TC_IMG = './images/mapoints/circuit_red_tc.gif';
var CIRCUIT_GRAY_SNRTT_TC_IMG = './images/mapoints/circuit_gray_tc.gif';
var CIRCUIT_BLACK_SNRTT_TC_IMG = './images/mapoints/circuit_black_tc.gif';

var CIRCUIT_YELLOW_SNRTT_TF_IMG = './images/mapoints/circuit_yellow_tf.gif';
var CIRCUIT_ORANGE_SNRTT_TF_IMG = './images/mapoints/circuit_orange_tf.gif';
var CIRCUIT_RED_SNRTT_TF_IMG = './images/mapoints/circuit_red_tf.gif';
var CIRCUIT_GRAY_SNRTT_TF_IMG = './images/mapoints/circuit_gray_tf.gif';
var CIRCUIT_BLACK_SNRTT_TF_IMG = './images/mapoints/circuit_black_tf.gif';

var CIRCUIT_RED_C_UPE_IMG = './images/mapoints/circuit_red_c_upe_flash.gif';
var CIRCUIT_RED_F_UPE_IMG = './images/mapoints/circuit_red_f_upe_flash.gif';
var CIRCUIT_RED_T_UPE_IMG = './images/mapoints/circuit_red_t_upe_flash.gif';
var CIRCUIT_RED_TC_UPE_IMG = './images/mapoints/circuit_red_c_upe_flash.gif';
var CIRCUIT_RED_TF_UPE_IMG = './images/mapoints/circuit_red_f_upe_flash.gif';
var CIRCUIT_RED_UPE_IMG = './images/mapoints/circuit_red_upe_flash.gif';
var CIRCUIT_GRAY_UPE_IMG = './images/mapoints/circuit_gray_upe.gif';
var CIRCUIT_BLACK_UPE_IMG = './images/mapoints/circuit_black_upe.gif';

var CIRCUIT_GREEN_IMG = './images/circuit_green.png';
var CIRCUIT_YELLOW_IMG = './images/circuit_yellow.gif';
var CIRCUIT_ORANGE_IMG = './images/circuit_orange.gif';
var CIRCUIT_RED_IMG = './images/circuit_red.gif';
var CIRCUIT_GRAY_IMG = './images/circuit_gray.gif';
var CIRCUIT_BLACK_IMG = './images/circuit_black.gif';

var MARKER_INFO_WINDOW_WIDTH = 50;
var MARKER_INFO_WINDOW_HEIGHT = 50;
var refreshflag1 = 0;
var REFRESH_TIME;
var INPUT_TIME;
var op;
//alert("file is: "+INVENTORY_FILE_PATH);
if (getQueryParameter('reload') != 'null') {
    REFRESH_TIME = 1000 * (parseInt(getQueryParameter('reload')));
    //alert("inside query param"+REFRESH_TIME);
}
else {
    //alert("inside default val");
    INPUT_TIME = 1000 * 600;
    REFRESH_TIME = INPUT_TIME;
}

//var REFRESH_TIME = 1000 * 15;
var markerSearch;
var map;
var markers = [];
var filterMarker = [];
//var markerWindowHtmls = [];
var markerCluster = null;
var mcOptions = {gridSize: MAX_MAP_CLUSTER_GRIDSIZE, maxZoom: MAX_MAP_CLUSTER_ZOOM};
var oms;
var omsOptions = {markersWontMove :true, keepSpiderfied : true};
var searchedMarker;
var idleMapZoomListener;

// Bounds for Saudi Arabia
var strictBounds = new google.maps.LatLngBounds(
	new google.maps.LatLng(24, 64),
	new google.maps.LatLng(24, 64)
	);

// Marker information window
var markerInfowindow = new google.maps.InfoWindow(
    {
        content: '',
        size: new google.maps.Size(MARKER_INFO_WINDOW_WIDTH, MARKER_INFO_WINDOW_HEIGHT)
    });
// If maps is been refreshed initilze the map init values b getting from URL
if (getQueryParameter('gmlat') != 'null' && getQueryParameter('gmlng') != 'null' && getQueryParameter('gmzoom') != 'null') {
    MAP_INIT_LAT = parseFloat(getQueryParameter('gmlat'));
    MAP_INIT_LNG = parseFloat(getQueryParameter('gmlng'));
    MAP_INIT_ZOOM = parseInt(getQueryParameter('gmzoom'));
    refreshflag1 = parseInt(getQueryParameter('maprefresh'));
}


$(document).ready(function () {

	   $("#legend-panel").load("legends.html").draggable();

    function getQueryParameter(parameterName) {
        var queryString = window.location.search.substring(1);
        var parameterName = parameterName + "=";
        if (queryString.length > 0) {
            begin = queryString.indexOf(parameterName);
            if (begin != -1) {
                begin += parameterName.length;
                end = queryString.indexOf("&", begin);
                if (end == -1) {
                    end = queryString.length
                }
                return unescape(queryString.substring(begin, end));
            }
        }
        return "null";
    }

    $('#markerAdSearchInput').each(function () {
        this.value = $(this).attr('title');
        $(this).addClass('text-label');
        $(this).focus(function () {
            if (this.value == $(this).attr('title')) {
                this.value = '';
                $(this).removeClass('text-label');
            }
        });
        $(this).blur(function () {
            if (this.value == '') {
                this.value = $(this).attr('title');
                $(this).addClass('text-label');
            }
        });
    });
 

});

// Initilize and load the google map when page is loaded
function initialize() {


    var center = new google.maps.LatLng(MAP_INIT_LAT, MAP_INIT_LNG);
    var mapOptions = {
        center: center,
        zoom: MAP_INIT_ZOOM,
        minZoom: 5,
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_CENTER
		},
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
			position: google.maps.ControlPosition.TOP_CENTER
		},

        styles: [{"featureType": "water", "elementType": "labels", "stylers": [{"visibility": "off"}]},
            {"featureType": "administrative.country", "elementType": "labels", "stylers": [{"visibility": "off"}]}],
        mapTypeId: google.maps.MapTypeId.ROADMAP
		
    };

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    checkChnInvFileOnPlotTech();
	oms = new OverlappingMarkerSpiderfier(map, omsOptions);
	//console.log("Called OMS New");
	//alert("I'm here!");
    microAjax(INVENTORY_FILE_PATH, processMarkers);
    // Listen for the dragend event
    google.maps.event.addListener(map, 'dragend', function () {
        if (strictBounds.contains(map.getCenter())) return;
        // We're out of bounds - Move the map back within the bounds
        var c = map.getCenter(),
            x = c.lng(),
            y = c.lat(),
            maxX = strictBounds.getNorthEast().lng(),
            maxY = strictBounds.getNorthEast().lat(),
            minX = strictBounds.getSouthWest().lng(),
            minY = strictBounds.getSouthWest().lat();
        if (x < minX) x = minX;
        if (x > maxX) x = maxX;
        if (y < minY) y = minY;
        if (y > maxY) y = maxY;
        map.setCenter(new google.maps.LatLng(y, x));
    });

    if (markerCluster!=null)
        markerCluster.clearMarkers();
    
    markerCluster = new MarkerClusterer(map, filterMarker, mcOptions);

}

function attachMarkerMessage(marker, message) {
    google.maps.event.addListener(marker, 'click', function () {
        markerInfowindow.setContent(message);
        markerInfowindow.open(map, marker);
    });
}
// Reads the inventory file and creates all Marker for each item.
processMarkers = function (markerdoc) {
	//console.log("process markers called");
    lines = markerdoc.split("\n");
    markers = [];
    var lat = "";
    var lng = "";
    var marker = "";
    var markerHtm = "";
    var markerLatLng = "";
    var lineSplit = [];
    var currMarkerIcon = "";
    var option = "";
    var prev_lng = 0;
    var prev_lat = 0;
    var ch_plot_ord = 0;

	//alert ('HERE!');
  
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].length > 1) {
            lineSplit = lines[i].split(",");
            if (lineSplit.length == 17) { // Old 17 (11.08.2016)

				//// New (Circuit is UPE, Fiber, Copper, or '--')
                var circuitTechType = lineSplit[15]; 
				
				//// Circuit Status (Circuit is UP, DOWN, SWITCHED_OFF, etc.)
				var circuitTechStatus = lineSplit[16]; // Old 15 
				//alert ("/" + circuitTechType + "/--/" + circuitTechStatus + "/");
    
				//// Severity as in TBSM Object Server. Greater Than 0 means a problem. 0 = Green alarm.
				var selectSeverity = lineSplit[12]; //old 14
				//alert("Severity = " + selectSeverity);
				
				//// A flag to indicate whether the circuit belongs to Hajj category or only VIP.
				var selectHajjStatus = lineSplit[4]; //old 3
				//alert("Hajj Status = " + selectHajjStatus);
				
				//// Trouble Ticket Severity (1 = S1 Ticket, 2 = S2 = Ticket, 3 = S3 Ticket)
				var escalation_severity = lineSplit[9]; // old 7
				//alert("Escalation Severity = " + escalation_severity);
				
				//// This variable indicates whether the circuit is FIBER (FTTX = 1) or COPPER (DSL = 2).
				var isSnr = lineSplit[11]; //old 9
				//alert("Is SNR = " + isSnr);
				
                //// Adjust Plot items if they are on same map points. The DB query should be sort by latt, long, technology.
                var cur_lat = parseFloat(lineSplit[5]); //old 12
				//alert("Lat = " + cur_lat);
                var cur_lng = parseFloat(lineSplit[6]); //old 13
				//alert("Long = " + cur_lng);

                lat = parseFloat(cur_lat);
                lng = parseFloat(cur_lng);

                //Flagging Start
                if (lat != 'NaN' & lng != 'NaN') {
                    
					if (circuitTechType == "UPE") {
						//alert ("In UPE");
						if (circuitTechStatus == "DOWN") {
							//alert ("In UPE->DOWN");
							if (parseInt(escalation_severity) > 0 && parseInt(selectSeverity) > 0) {
									currMarkerIcon = CIRCUIT_RED_T_UPE_IMG;
    								lineSplit[12] = 5;
    						}
    						else {
									//alert("Black UPE DOWN");
    								currMarkerIcon = CIRCUIT_BLACK_UPE_IMG; // TODO: Create a Black Icon with 'U' inside.
    								lineSplit[12] = 5;
    						}
						}
						else if (circuitTechStatus == "SWITCHED_OFF") {
							//alert ("In UPE->SWITCHED_OFF");
							if (parseInt(escalation_severity) > 0 && parseInt(selectSeverity) > 0) {
								//alert("HERE!");
									currMarkerIcon = CIRCUIT_RED_T_UPE_IMG;
    								lineSplit[12] = 5;
    						}
    						else {
								//alert("HERE!");
    								currMarkerIcon = CIRCUIT_GRAY_UPE_IMG; // TODO: Icon doesn't exist. Create it. 
    								lineSplit[12] = 5;
    						}
						}
						else if (circuitTechStatus == "UP") {
							if (parseInt(selectSeverity) > 0) {
								if (parseInt(escalation_severity) == 1 && parseInt(selectSeverity) > 0) {
    								currMarkerIcon = CIRCUIT_RED_IMG; // TODO: Check if the icon has a 'T'.
    								lineSplit[12] = 5;
    							}
    							else if (parseInt(escalation_severity) == 2 && parseInt(selectSeverity) > 0) {
    								currMarkerIcon = CIRCUIT_ORANGE_IMG; // TODO: Check if the icon has a 'T'.
    								lineSplit[12] = 3;
    							}
								else if (parseInt(escalation_severity) == 2 && parseInt(selectSeverity) > 0) {
									currMarkerIcon = CIRCUIT_YELLOW_IMG;
    								lineSplit[12] = 1;
								}
    							else {
    								currMarkerIcon = CIRCUIT_RED_UPE_IMG;
    								lineSplit[12] = 5;
    							}
							}
							else {
								currMarkerIcon = CIRCUIT_GREEN_IMG;
							}
						}
						else {
							currMarkerIcon = CIRCUIT_GREEN_IMG;
						}
					} // END 'if' for UPE
					else if (circuitTechType == "FIBER") {
						if (circuitTechStatus == "DOWN") {
							if (parseInt(escalation_severity) > 0 && parseInt(selectSeverity) > 0) {
									currMarkerIcon = CIRCUIT_RED_SNRTT_TF_IMG;
    								lineSplit[12] = 5;
    						}
    						else {
							//alert("HERE!");
    								currMarkerIcon = CIRCUIT_BLACK_SNR_F_IMG;
    								lineSplit[12] = 5;
    						}
						}
						else if (circuitTechStatus == "SWITCHED_OFF") {
							//alert("Escalation Severity (FIBER, SWITCHED_OFF) = " + escalation_severity);
							if (parseInt(escalation_severity) > 0 && parseInt(selectSeverity) > 0) {
									currMarkerIcon = CIRCUIT_RED_SNRTT_TF_IMG;
    								lineSplit[12] = 5;
    						}
    						else {
									//alert("TESTING");
    								currMarkerIcon = CIRCUIT_GRAY_SNR_F_IMG; // TODO: Icon doesn't exist. Create it. 
    								lineSplit[12] = 5;
    						}
						}
						else if (circuitTechStatus == "UP") {
							if (parseInt(selectSeverity) > 0) {
								if (parseInt(escalation_severity) == 1 && parseInt(selectSeverity) > 0) {
									if (parseInt(isSnr) == 1) {
										currMarkerIcon = CIRCUIT_RED_SNRTT_TF_IMG;
										lineSplit[12] = 5;
									}
									else {
										currMarkerIcon = CIRCUIT_RED_IMG; // TODO: Check if the icon has a 'T'.
										lineSplit[12] = 5;
									}
    							}
    							else if (parseInt(escalation_severity) == 2 && parseInt(selectSeverity) > 0) {
									if (parseInt(isSnr) == 1) {
										currMarkerIcon = CIRCUIT_ORANGE_SNRTT_TF_IMG;
										lineSplit[12] = 3;
									}
									else {
										currMarkerIcon = CIRCUIT_ORANGE_IMG; // TODO: Check if the icon has a 'T'.
										lineSplit[12] = 3;
									}
    							}
    							else if (parseInt(escalation_severity) == 3 && parseInt(selectSeverity) > 0) {
									if (parseInt(isSnr) == 1) {
										currMarkerIcon = CIRCUIT_YELLOW_SNRTT_TF_IMG;
										lineSplit[12] = 1;
									}
									else {
										currMarkerIcon = CIRCUIT_YELLOW_IMG;
										lineSplit[12] = 1;
									}
    							}
								else {
    								currMarkerIcon = CIRCUIT_RED_SNR_F_IMG;
    								lineSplit[12] = 5;
    							}
							}
							else {
								currMarkerIcon = CIRCUIT_GREEN_IMG;
							}
						}
						else {
							if (parseInt(selectSeverity) > 0) {
								//alert("FIBER -> N/A --> SEVERITY.GT.0 --> ESEV: " + escalation_severity + " / SNR: " + isSnr);
								if (parseInt(escalation_severity) > 0 && parseInt(isSnr) == 1) {
									//alert("ESEV > 0 and isSnr == 1");
									currMarkerIcon = CIRCUIT_RED_SNRTT_TF_IMG;
									lineSplit[12] = 5;
								}
								else if (parseInt(escalation_severity) == 1 && parseInt(selectSeverity) > 0) {
									currMarkerIcon = CIRCUIT_RED_IMG;
									lineSplit[12] = 5;
    							}
    							else if (parseInt(escalation_severity) == 2 && parseInt(selectSeverity) > 0) {
									//alert("COPPER -> ORANGE");
    								currMarkerIcon = CIRCUIT_ORANGE_IMG; 
    								lineSplit[12] = 3;
    							}
    							else if (parseInt(escalation_severity) == 3 && parseInt(selectSeverity) > 0) {
    								currMarkerIcon = CIRCUIT_YELLOW_IMG;
    								lineSplit[12] = 1;
    							}
								else if (parseInt(isSnr) == 1) {
									//alert("IS_SNR = FIBER");
									currMarkerIcon = CIRCUIT_RED_SNR_F_IMG;
    								lineSplit[12] = 5;
								}
								else {
    								currMarkerIcon = CIRCUIT_RED_IMG;
    								lineSplit[12] = 5;
    							}
							}
							else {
								currMarkerIcon = CIRCUIT_GREEN_IMG;
							}
						}
					} //END 'else if' for FIBER
					else if (circuitTechType == "COPPER") {
						if (circuitTechStatus == "DOWN") {
							if (parseInt(escalation_severity) > 0) {
									currMarkerIcon = CIRCUIT_RED_SNRTT_TC_IMG;
    								lineSplit[12] = 5;
    						}
    						else {
    								currMarkerIcon = CIRCUIT_BLACK_SNR_C_IMG;
    								lineSplit[12] = 5;
    						}
						}
						else if (circuitTechStatus == "SWITCHED_OFF") {
							if (parseInt(escalation_severity) > 0) {
									currMarkerIcon = CIRCUIT_RED_SNRTT_TC_IMG;
    								lineSplit[12] = 5;
    						}
    						else {
    								currMarkerIcon = CIRCUIT_GRAY_SNR_C_IMG; // TODO: Icon doesn't exist. Create it. 
    								lineSplit[12] = 5;
    						}
						}
						else if (circuitTechStatus == "UP") {
							if (parseInt(selectSeverity) > 0) {
								//alert("COPPER -> UP -> SEVERITY>0");
								if (parseInt(escalation_severity) == 1) {
									if (parseInt(isSnr) == 2) {
										currMarkerIcon = CIRCUIT_RED_SNRTT_TC_IMG;
										lineSplit[12] = 5;
									}
									else {
										currMarkerIcon = CIRCUIT_RED_IMG; // TODO: Check if the icon has a 'T'.
										lineSplit[12] = 5;
									}
    							}
    							else if (parseInt(escalation_severity) == 2) {
									//alert("COPPER -> ORANGE");
									if (parseInt(isSnr) == 2) {
										currMarkerIcon = CIRCUIT_ORANGE_SNRTT_TC_IMG;
										lineSplit[12] = 3;
									}
									else {
										currMarkerIcon = CIRCUIT_ORANGE_IMG; // TODO: Check if the icon has a 'T'.
										lineSplit[12] = 3;
									}
    							}
    							else if (parseInt(escalation_severity) == 3) {
									if (parseInt(isSnr) == 2) {
										currMarkerIcon = CIRCUIT_YELLOW_SNRTT_TC_IMG;
										lineSplit[12] = 1;
									}
									else {
										currMarkerIcon = CIRCUIT_YELLOW_IMG;
										lineSplit[12] = 1;
									}
    							}
								else {
    								currMarkerIcon = CIRCUIT_RED_SNR_C_IMG;
    								lineSplit[12] = 5;
    							}
							}
							else {
								currMarkerIcon = CIRCUIT_GREEN_IMG;
							}
						}
						else {
							if (parseInt(selectSeverity) > 0) {
								//alert("COPPER -> N/A --> SEVERITY.GT.0 --> ESEV: " + escalation_severity + " / SNR: " + isSnr);
								if (parseInt(escalation_severity) > 0 && parseInt(isSnr) == 2) {
									//alert("ESEV > 0 and isSnr == 2");
									currMarkerIcon = CIRCUIT_RED_SNRTT_TC_IMG;
									lineSplit[12] = 5;
								}
								else if (parseInt(escalation_severity) == 1) {
									currMarkerIcon = CIRCUIT_RED_IMG;
									lineSplit[12] = 5;
    							}
    							else if (parseInt(escalation_severity) == 2) {
									//alert("COPPER -> ORANGE");
    								currMarkerIcon = CIRCUIT_ORANGE_IMG; 
    								lineSplit[12] = 3;
    							}
    							else if (parseInt(escalation_severity) == 3) {
    								currMarkerIcon = CIRCUIT_YELLOW_IMG;
    								lineSplit[12] = 1;
    							}
								else if (parseInt(isSnr) == 2) {
									//alert("IS_SNR = COPPER");
									currMarkerIcon = CIRCUIT_RED_SNR_C_IMG;
    								lineSplit[12] = 5;
								}
								else {
    								currMarkerIcon = CIRCUIT_RED_IMG;
    								lineSplit[12] = 5;
    							}
							}
							else {
								currMarkerIcon = CIRCUIT_GREEN_IMG;
							}
						}
					} // END 'else if' for COPPER
					else { // ELSE IF: Tech Type is UNKNOWN ('--')
						if (parseInt(selectSeverity) > 0) {
								//alert("*--* -> SEVERITY.GT.0");
								if (parseInt(escalation_severity) == 1) {
    								currMarkerIcon = CIRCUIT_RED_IMG; 
    								lineSplit[12] = 5;
    							}
    							else if (parseInt(escalation_severity) == 2) {
									//alert("COPPER -> ORANGE");
    								currMarkerIcon = CIRCUIT_ORANGE_IMG; 
    								lineSplit[12] = 3;
    							}
    							else if (parseInt(escalation_severity) == 3) {
    								currMarkerIcon = CIRCUIT_YELLOW_IMG;
    								lineSplit[12] = 1;
    							}
								else if (parseInt(isSnr) == 1) {
									//alert("IS_SNR = FIBER");
									currMarkerIcon = CIRCUIT_RED_SNR_F_IMG;
    								lineSplit[12] = 5;
								}
								else if (parseInt(isSnr) == 2) {
									//alert("IS_SNR = COPPER");
									currMarkerIcon = CIRCUIT_RED_SNR_C_IMG;
    								lineSplit[12] = 5;
								}
								else {
    								currMarkerIcon = CIRCUIT_RED_IMG;
    								lineSplit[12] = 5;
    							}
							}
							else {
								currMarkerIcon = CIRCUIT_GREEN_IMG;
							}
					}
					
                    //Comment to Adjust latt, lng for plot items on same coordinates.
                    markerLatLng = new google.maps.LatLng(parseFloat(lat), parseFloat(lng));
                    marker = new google.maps.Marker({
                        position: markerLatLng,
                        title: 'Customer: ' + lineSplit[0] + ' / Circuit: ' + lineSplit[2],
                        icon: currMarkerIcon,
                        optimized: false
                    });

                    //shoconsole.log(marker.getPosition().toString());

                    addAlarmCount = parseInt(lineSplit[14]) //old 16

					var cktLastUnderscoreIdx = lineSplit[2].lastIndexOf("_"); //no change in lineSplit
					var cktOneViewParam = lineSplit[2].substr(0, cktLastUnderscoreIdx) + ' ' + lineSplit[2].substr(cktLastUnderscoreIdx + 1);
					   
					var markerHtml = '<span style=\'font-family: Arial;font-size:12px;\'>Customer Name : ' + lineSplit[0] + '<br>Technology Type : ' + lineSplit[1] + ' (' + circuitTechType + ')'+ '<br>Circuit Name : ' + lineSplit[2] + '<br>SLA Package : ' + lineSplit[3] + '<br>Priority : ' + lineSplit[4] + '<br>Location : ' + lineSplit[7] + '<br>District : ' + lineSplit[8] + '<br>Region : ' + lineSplit[10] + '<br>Access Tech. (Type / Status) : ' + circuitTechType + ' / ' + circuitTechStatus + '<br>OneView (External) : ' + '<a target=\'_blank\' href=\'http://e-oneview.stc.com.sa/csc/startup.do?subscriberid=' + cktOneViewParam + '&customField=81\'> Open OV</a>' + '<br> Number of Alarms : ' + lineSplit[14] + ' <a target=\'_blank\' href=\'../../../console/webtop/cgi-bin/SLAFilteredAEL.cgi?DS=NCOMS&VIEW=SLA_Dashboard&FILTER=TNSQM_ResourceName like :sq:' + lineSplit[2] + ':sq:\'><b>' + '(Open AEL)</a><br/><div>&nbsp;</div></span>';
		 
					marker.set('Customer Name', lineSplit[0]);
					//alert("Customer Name -> " + lineSplit[0]);
					
					marker.set('Type', lineSplit[1]);
					//alert("MRS -> " + lineSplit[1]);
					
					marker.set('Circuit Name', lineSplit[2]);
					//alert("Circuit Name -> " + lineSplit[2]);
					
					marker.set('IS_HAJJ', lineSplit[4]);
					//alert("IS_HAJJ -> " + lineSplit[3]);
				
					marker.set('SLA_Package', lineSplit[3]);
					//alert("SLA Package -> " + lineSplit[4]);
					
					marker.set('Location', lineSplit[7]);
					//alert("Location -> " + lineSplit[5]);
					
					marker.set('District', lineSplit[8]);
					//alert("District -> " + lineSplit[6]);
					
					marker.set('Escalation_Severity', lineSplit[9]);					
								//alert("Escalation_Severity -> " + lineSplit[7]);
				
					marker.set('Region', lineSplit[10]);
								//alert("Region -> " + lineSplit[8]);
					
					//marker.set('IS_SNR', lineSplit[8]);
					
					marker.set('Latitude', lineSplit[5]);
					//alert("Latitude -> " + lineSplit[12]);
					
					marker.set('Longitude', lineSplit[6]);
								//alert("Longitude -> " + lineSplit[13]);
					
					marker.set('alarmCount', lineSplit[14]);
					//alert("alarmCount -> " + lineSplit[16]);
					
					marker.set('mType', lineSplit[13]);
					//alert("mType -> " + lineSplit[15]);
				
					//marker.set('Type', lineSplit[15]);
					//alert("Device Type -> " + lineSplit[15]);

					//alert(lineSplit[13]);
					marker.set('mSeverity', lineSplit[12]);
					//alert("mSeverity -> " + lineSplit[14]);

					attachMarkerMessage(marker, markerHtml);
					markers.push(marker);
					oms.addMarker(marker);
                } // END IF NaN
            } // End line split
        } // END IF Lines
    } //END FOR
    filterSearchMarkers(false);
}


function showMarkerInfo(index) {
    hidePopup('popup');
    
    //alert(index);
    idleMapZoomListener = google.maps.event.addListener(map, 'idle', function () {

        console.log(filterMarker[index].getPosition().toString());
        
        map.panTo(filterMarker[index].getPosition());
        
        var delay=1000; //1 second
        setTimeout(function() {
            //your code to be executed after 1 second
          google.maps.event.trigger(filterMarker[index], "click");
          google.maps.event.removeListener(idleMapZoomListener);

        }, delay);

      
    });

    if (map.getZoom() == 16) {
        map.setZoom(17);
    } else {
        map.setZoom(16);
    }
}


function getQueryParameter(parameterName) {
    var queryString = window.location.search.substring(1);
    var parameterName = parameterName + "=";
    if (queryString.length > 0) {
        begin = queryString.indexOf(parameterName);
        if (begin != -1) {
            begin += parameterName.length;
            end = queryString.indexOf("&", begin);
            if (end == -1) {
                end = queryString.length
            }
            return unescape(queryString.substring(begin, end));
        }
    }
    return "null";
}

function checkChnInvFileOnPlotTech() {
    var selectTypeChbox = document.getElementById(plotT);
    if (Service == 'Connect|LTE') {
        var is2G = selectTypeChbox.options[0].selected;
        var is3G = selectTypeChbox.options[1].selected;
        var is4G = selectTypeChbox.options[2].selected;
        var isCore = selectTypeChbox.options[3].selected;
        if (is2G == false && is3G == false && is4G == true) {
            INVENTORY_FILE_PATH = INVENTORY_FILE_PATH_LTE;
            //alert('Change Inventory File: '+ INVENTORY_FILE_PATH_LTE);
        } else if ((is2G == true || is3G == true) && is4G == false) {
            INVENTORY_FILE_PATH = INVENTORY_FILE_PATH_CONNECT;
            //alert('Change Inventory File: '+ INVENTORY_FILE_PATH_CONNECT);
        }
        else {
            INVENTORY_FILE_PATH = INVENTORY_FILE_PATH_CONNECTLTE;
            //alert('Inventory File: '+INVENTORY_FILE_PATH_CONNECTLTE);
        }
    }
}
// Replots the markers by checking the selected plot option and selected type
function filterSearchMarkers(isButtonClick) {

    var plotOptChbox = "";
    var isAnyChecked = false;
    //added code for drop down check list functionality
    //var selectPlotOptChbox = document.getElementById(plotN);

    var cri = 5;
    var major = 4;
    var minor = 3;
    var warn = 1;
    var info = 2;
    var clr = 0;
	
	var showCktsCat = 'VIP';
	
    filterMarker = [];
    //if ( isAnyChecked = false){
    var all = 0;
    //modified code for populating markers based on check list selection
    for (var k = 0; k < markers.length; k++) {
        //alert("reached here" + markers[k].get('Customer Name')+'-'+customer1+'-'+markers[k].get('mSeverity'));
        if (( markers[k].get('mSeverity') == cri || markers[k].get('mSeverity') == major || markers[k].get('mSeverity') == minor || markers[k].get('mSeverity') == warn || markers[k].get('mSeverity') == info || markers[k].get('mSeverity') == clr )) {
            //alert("Status: " + markers[k].get('IS_HAJJ') + " --> " + hajjonly);
			if (showCktsCat == "HAJJ") // If IS_HAJJ status matches the selected filter in the dropdown.
			{	
				//alert("Hajj only flag! Plotting --> " + k);
				if ((markers[k].get('IS_HAJJ') == "HAJJ") || (markers[k].get('IS_HAJJ') == "HAJJ-VIP")) { //HM 23-02-2016
					filterMarker[all] = markers[k];
					all++;
				}
			}
			if (showCktsCat == "VIP")
			{
				if ((markers[k].get('IS_HAJJ') == "VIP") || (markers[k].get('IS_HAJJ') == "HAJJ-VIP")) {
					filterMarker[all] = markers[k];
					all++;
				}
			}
			if (showCktsCat == "HAJJ+VIP") 
			{
				//alert("All Ckts flag");
				filterMarker[all] = markers[k];
				all++;
			}
            //alert("reached here" + markers[k].get('Customer Name'));
        }
    }


    if (markerCluster == null) {
        markerCluster = new MarkerClusterer(map, filterMarker, mcOptions);
        //oms.addMarkers(filterMarker, false);
    } else {
        markerCluster.clearMarkers();
        markerCluster.addMarkers(filterMarker, false);
    }
	
}
google.maps.event.addDomListener(window, 'load', initialize);
// update the refresh timer and when it reaches 0 reload the page.


function resetMapCenter() {
    map.setZoom(4);
    map.setCenter(new google.maps.LatLng(24.527135, 47.592773));
}
		
