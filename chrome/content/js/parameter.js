var parameter = {

    getNumberDayOfWeek: function(day) {
        var numberDay;
        switch (day.toUpperCase) {
            case "ПОНЕДЕЛЬНИК":
                numberDay = 1
                break
            case "ВТОРНИК":
                numberDay = 2
                break
            case "СРЕДА":
                numberDay = 3
                break
            case "ЧЕТВЕРГ":
                numberDay = 4
                break
            case "ПЯТНИЦА":
                numberDay = 5
                break
            case "СУББОТА":
                numberDay = 6
                break
            case "ВОСКРЕСЕНЬЕ":
                numberDay = 7
                break
            default:
                numberDay = -1;
        }
        return numberDay;
    }

};
