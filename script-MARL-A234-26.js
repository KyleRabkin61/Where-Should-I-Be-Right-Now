$(document).ready(function () {

    const scheduleUrl = "https://api.npoint.io/faf2cdc57bb4b33922ec"

    const bellSchedule = {
        1: {start: '8:24 AM', end: '9:31 AM'},
        2: {start: '9:36 AM', end: '10:43 AM'},
        3: {start: '10:48 AM', end: '11:55 AM'},
        4: {start: '12:41 PM', end: '1:48 PM'},
        5: {start: '1:53 PM', end: '3:00 PM'}

    }

    const btn = $('#submitDay')

    btn.on('click', function () {
        $.ajax ({
            type: 'GET',
            url: "https://api.npoint.io/faf2cdc57bb4b33922ec",
            success: function (data) {
                renderHTML(data)
            },
            error: function () {
                console.log('Connection error.')
            }
        })
    })

    function renderHTML(data) {
        console.log(data[0].class)
    }
})