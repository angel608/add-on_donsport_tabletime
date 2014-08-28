var showTimetable = {
	winobj: null,
	panel: 	null,
	timehost: 	"http://time100.ru/",

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
		req.open('GET', 'http://time100.ru/',true);
		req.send(null);
		var doc = document.implementation.createHTMLDocument();
		doc.documentElement.innerHTML = req.responseText;
		console.log(doc);
		//showTimetable.editElementById("currentdate",today);
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
	}

}; 