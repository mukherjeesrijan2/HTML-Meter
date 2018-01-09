window.addEventListener("DOMContentLoaded", function () {
	( function (globalVAR) { // IIFE

		// Add style - for the progress bar
		var head = document.getElementsByTagName('head')[0];
		head.innerHTML += "<style type='text/css'>\
			.progress {\
				display: inline-block;\
				height: 20px;\
				width: 10em;\
				background-color: #EBF5FB;\
				vertical-align: -0.2em;\
			}\
			.progress > .bar {\
				display: block;\
				background-color: #85C1E9;\
				height: 100%;\
				width: auto;\
				position: relative;\
			}\
			.progress > .bar > .meter {\
				display: none;\
				position: absolute;\
				right: 0;\
				color: #85C1E9;\
				font-family: sans-serif;\
				padding: 2px 0px;\
				bottom: 20px;\
				text-align: right;\
				-webkit-user-select: none;\
				cursor: default;\
			}\
			.progress > .bar > .meter:after {\
				content: '\\25CF';\
			}\
			.progress .bar .visible_meter {\
				display: block;\
			}\
			.progress .bar .meterDown {\
				top: 20px;\
			}\
		</style>";

		// Get the progress Bars and initialize it
		var progressBARs = document.querySelectorAll('[data-elem = "progress"]');
		var numOfElem 	 = progressBARs.length;

		// Local Variables
		var max, value, child, grandChild, bar, meter, defaultMETER, nodes, theme, meterPosition;

		var insideHTML = '\
			<div class="bar">\
				<span class="meter"></span>\
			</div>';
		for (var i = 0; i < numOfElem; i++) {
			progressBARs[i].className += "progress";
			progressBARs[i].innerHTML = insideHTML;

			// Get the attributes
			max 			= parseInt(progressBARs[i].getAttribute("max"));
			value   		= parseInt(progressBARs[i].getAttribute("value"));
			defaultMETER	= progressBARs[i].getAttribute("meter"); 
			meterPosition  = progressBARs[i].getAttribute("meterPosition");

			// Get child nodes
			nodes = getChilds(progressBARs[i]);
			bar   = nodes.bar;
			meter = nodes.meter;

			if (defaultMETER == "on") {
				meter.classList.add("visible_meter");	
			}
			if (meterPosition == "down") {
				meter.classList.add("meterDown");
			}

			if (value <= max) {
				// progressBARs[i].style.width = max + "px";

				bar.style.width = ((value/max) * 100) + "%";
				meter.innerHTML = ((value/max) * 100) + "%";
			} else {
				// progressBARs[i].style.width = max + "px";
				bar.style.width = "0px";
				meter.innerHTML = "0%";
			}
		}

		// Private Functions 
		function getChilds (elem) {
			child = elem.childNodes;
			bar   = child[1]; 
			grandChild = bar.childNodes;
			meter 	   = grandChild[1];
			return {bar:bar, meter: meter}
		}

		function hasClass(element, cls) {
		    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
		}

		// User Use Functions 

		var changeValue = function (elem, value) {
			max = parseInt(elem.getAttribute("max"));
			if(value <= max) {
				elem.setAttribute("value", value);

				// Get child nodes
				var changeNode = getChilds(elem);
				var bar 	   = changeNode.bar;
				var meter      = changeNode.meter;

				bar.style.width = ((value/max) * 100) + "%";
				meter.innerHTML = parseFloat(((value/max) * 100)).toFixed(1) + "%";
			} else {
				return "changeError";
			}
		} 


		var property = function (object, elem) {
			var changeNode = getChilds(elem);
			var barELEM        = changeNode.bar;
			var meterELEM      = changeNode.meter;

			switch (object.meter) {
				case 'on':
					if(!hasClass(meterELEM, "visible_meter")) {
						meterELEM.className += " visible_meter";
					}
					break;
				case 'off':
					if (hasClass(meterELEM, "visible_meter")) {
						meterELEM.classList.remove("visible_meter");
					}
					break;
			}
		}

		var theme = function (themeName, progressElem) { // Per-built Themes...
			theme = [
				{
					name: "default",
					container: "rgba(0,0,0,.1)",
					bar: "tomato",
					meter: "tomato"
				},
				{
					name: "orange",
					container: "#FDEBD0",
					bar: "#F7DC6F",
					meter: "#F7DC6F"
				},
				{
					name: "blue",
					container: "#EBF5FB",
					bar: "#85C1E9",
					meter: "#85C1E9"
				},
				{
					name: "green",
					container: "#D5F5E3",
					bar: "#82E0AA",
					meter: "#82E0AA"
				},
				{
					name: "purple",
					container: "#E8DAEF",
					bar: "#BB8FCE",
					meter: "#BB8FCE"
				},
				{
					name: "red",
					container: "#FADBD8",
					bar: "#F1948A",
					meter: "#F1948A"
				},
				{
					name: "redDark",
					container: "#F2D7D5",
					bar: "#D98880",
					meter: "#D98880"
				},
				{
					name: "blueDark",
					container: "#D4E6F1",
					bar: "#7FB3D5",
					meter: "#7FB3D5"
				},
				{
					name: "deepBlue",
					container: "#85C1E9",
					bar: "#2E86C1",
					meter: "#2E86C1"
				},
				{
					name: "yellow",
					container: "#FCF3CF",
					bar: "#F4D03F",
					meter: "#F4D03F"
				}
			];

			for (object in theme) {
				var object = theme[object];
				if (object.name == themeName) {
					var node  = getChilds(progressElem);
					var bar   = node.bar;
					var meter = node.meter;
					// Add Styles
					progressElem.style.backgroundColor = object.container;
					bar.style.backgroundColor =  object.bar;
					meter.style.color = object.meter;
				}
			}
		}

		var progressBAR = {changeValue, property, theme}



		// Disclose in the window through object
		globalVAR.progressBAR = progressBAR;


	}) (window);
});