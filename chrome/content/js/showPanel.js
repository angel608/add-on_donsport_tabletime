var showTimetable = {
	winobj: null,
	panel: 	null,

	init: function() {
    var obj = document.getElementById("navigator-toolbox");
    this.winobj = (obj)?window.document:window.opener.document;
    this.panel = this.winobj.getElementById('frcPanel')
	},

	createFrcPanel: function(parent) {
		var now = new Date();
		alert(now);
		if (!this.panel)
			this.init();
		if (this.panel)
			this.panel.openPopup(parent, 'after_start', 0, 0, false, true);
	}
}; 