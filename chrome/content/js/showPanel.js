var showTimetable = {
    winobj: null,
    panel: null,
    timehost: "http://www.timeserver.ru/time.html",
    timetablehost: "http://www.donsport.ru",
    dayOfWeek: null,

    init: function() {
        var obj = document.getElementById("navigator-toolbox");
        this.winobj = (obj) ? window.document : window.opener.document;
        this.panel = this.winobj.getElementById('DonSportPanel');
    },

    createDonSportPanel: function(parent) {
        if (!this.panel)
            this.init();
        if (this.panel) {
            // $("#currentdate").load("http://www.timeserver.ru/time.html #main1_global_date");
            $(document).ready(function() {
                $(".btn-slide").click(function() {
                    $("#panel").slideToggle("slow");
                    $(this).toggleClass("active");
                });
            });
            this.panel.openPopup(parent, 'after_start', 0, 0, false, true);
            this.setCurrentdate();
            this.getTimeTable();
        }
    },

    setCurrentdate: function() {
        var req = new XMLHttpRequest();
        req.open('GET', showTimetable.timehost, false);
        req.onreadystatechange = function() {
            var doc = document.implementation.createHTMLDocument();
            doc.documentElement.innerHTML = req.responseText;
            var today = doc.getElementById("main1_global_date").innerHTML;
            showTimetable.editElementById("currentdate", showTimetable.uppercaseFirstLetter(today));
            var regexp = /(\w+),/i;
            alert(today);
            showTimetable.dayOfWeek = regexp.match(today);
            alert(showTimetable.dayOfWeek);
        };

        req.send(null);
    },

    getTimeTable: function() {

        var req1 = new XMLHttpRequest();
        var data = "clubId=12&url=http%3A%2F%2Fwww.donsport.ru%2Ftimetable%2F";
        req1.open("POST", showTimetable.timetablehost + "/timetable/?action=clubSelect", false);
        req1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        req1.send(data);

        var req = new XMLHttpRequest();
        req.open('GET', showTimetable.timetablehost + "/timetable", false);
        req.onreadystatechange = function() {
            var doc = document.implementation.createHTMLDocument();
            doc.documentElement.innerHTML = req.responseText;
            var tab = doc.getElementById("timetableContainer");
            // if (tab != null) {
            var str = tab.getElementsByTagName("tr");
            for (var i = 1; i < str.length; i++) {
                // console.log(i + " ");
                // console.log(str[i].innerHTML);
                // console.log("\n");
            };
            // jQuery(doc.documentElement.innerHTML);
            // }
        };
        req.send();
    },

    editElementById: function(id, value) {
        var el = this.winobj.getElementById(id);
        if (el) {
            showTimetable.removeChilds(el);
            var textNode = this.winobj.createTextNode(value);
            el.appendChild(textNode);
        };
    },

    removeChilds: function(obj) {
        while (obj.firstChild) obj.removeChild(obj.firstChild);
    },

    uppercaseFirstLetter: function(str) {
        return str.replace(/^\D/, str.charAt(0).toUpperCase());
    }
};
