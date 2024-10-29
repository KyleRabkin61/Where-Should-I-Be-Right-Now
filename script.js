$(document).ready(function () {

    const scheduleUrl = "https://api.npoint.io/faf2cdc57bb4b33922ec"

    const bellSchedule = {
        1: {start: '8:24 AM', end: '9:31 AM'},
        2: {start: '9:36 AM', end: '10:43 AM'},
        3: {start: '10:48 AM', end: '11:55 AM'},
        4: {start: '12:41 PM', end: '1:48 PM'},
        5: {start: '1:53 PM', end: '3:00 PM'}

    }

    const btn = $('#submitDay');

    const daySelected = $('#dayInput');

    btn.on('click', function () {

        if (['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(daySelected.val().toUpperCase())) {
            $.ajax ({
                type: 'GET',
                url: "https://api.npoint.io/faf2cdc57bb4b33922ec",
                success: function (day) {
                    getClassesForDay(day)
                },
                error: function () {
                    console.log('Connection error.')
                }
            })
        }else {
            alert('Please choose correct letter day.')
        }
        daySelected.val('')
    })

    function getClassesForDay(day) {
        return day.schedule.filter(classInfo => classInfo.days.includes(day))

    }
    
})