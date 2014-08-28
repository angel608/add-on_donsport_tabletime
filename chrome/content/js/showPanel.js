var showTimetable = {
	winobj: null,
	panel: 	null,
	timehost: 	"http://24timezones.com/ru_vremia/moscow_mestnoe_vremia.php",

	init: function() {
    var obj = document.getElementById("navigator-toolbox");
    this.winobj = (obj)?window.document:window.opener.document;
    this.panel = this.winobj.getElementById('frcPanel');
	},

	createFrcPanel: function(parent) {
		if (!this.panel)
				this.init();
		if (this.panel) {    
				this.setCurrentdate();
				this.panel.openPopup(parent, 'after_start', 0, 0, false, true);
			}
	},

	setCurrentdate: function() {
		var today;
		var req = new XMLHttpRequest();
		req.open('GET', showTimetable.timehost, false);
		 req.onreadystatechange = function() { 
			var doc = document.implementation.createHTMLDocument();
			doc.documentElement.innerHTML = req.responseText;
			today = doc.getElementById("currentTime");
			 if (today!=null){
			 	var month = (/\s(\D+) \d\d\d\d$/g).exec(today.innerHTML);
			 	var date = (/ (\d\d),/).exec(today.innerHTML);
			 	var dayofweek = (/\d\d:\d\d:\d\d, (\D+)\s/).exec(today.innerHTML);
				showTimetable.editElementById("currentdate", showTimetable.uppercaseFirstLetter(month[1])+'	'+date[1]+',	'+dayofweek[1]);
				}
		 };

		req.send(null);
	},

	editElementById: function(id,value) {
		var el = this.winobj.getElementById(id);
		if (el) {
			showTimetable.removeChilds(el);
			var textNode = this.winobj.createTextNode(value);
			el.appendChild(textNode);
		}
	},

	removeChilds: function(obj) {
			while (obj.firstChild) obj.removeChild(obj.firstChild);
	},

	uppercaseFirstLetter: function(str) {
		return str.replace(/^\D/,str.charAt(0).toUpperCase());
	}

}; 