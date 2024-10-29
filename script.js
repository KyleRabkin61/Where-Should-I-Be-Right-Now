$(document).ready(function () {

    const scheduleUrl = "https://api.npoint.io/faf2cdc57bb4b33922ec"

    const bellSchedule = {
        1: {start: '8:24 AM', end: '9:31 AM'},
        2: {start: '9:36 AM', end: '10:43 AM'},
        3: {start: '10:48 AM', end: '11:55 AM'},
        lunch: {start: '11:55 AM', end: '12:35 PM'},
        4: {start: '12:41 PM', end: '1:48 PM'},
        5: {start: '1:53 PM', end: '3:00 PM'}
    }

    const dailyPeriods = {
        A: [1, 2, 3, "Lunch", 5, 6],
        B: [4, 1, 2, "Lunch", 7, 5],
        C: [3, 4, 1, "Lunch", 6, 6],
        D: [2, 3, 4, "Lunch", 5, 6],
        E: [1, 2, 3, "Lunch", 7, 5],
        F: [4, 1, 2, "Lunch", 6, 7],
        G: [3, 4, 7, "Lunch", 5, 6]
    };

    const btn = $('#submitDay');

    

    btn.on('click', function () {

        const daySelected = $('#dayInput').val().toUpperCase();

        if (['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(daySelected)) {
            $.ajax ({
                type: 'GET',
                url: scheduleUrl,
                success: function (data) {
                    console.log(getClassesForDay(data, daySelected));

                    const daySchedule = dailyPeriods[daySelected]
                    let bellIndex = 1
                    daySchedule.forEach((period) => {
                    if (period === "Lunch") {
                        const lunchTime = bellSchedule.lunch;
                        $('#scheduleList').append(`
                          <tr>
                            <td>Lunch</td>
                            <td>${lunchTime.start} - ${lunchTime.end}</td>
                            <td colspan="3">Lunch Break</td>
                          </tr>
                        `);
                      } else {
                        const getClass = getClassesForDay()
                        if (getClass) {
                          const time = bellSchedule[bellIndex];
                          $('#scheduleList').append(`
                            <tr>
                              <td>${period}</td>
                              <td>${time.start} - ${time.end}</td>
                              <td>${getClass.class}</td>
                              <td>${getClass.teacher}</td>
                              <td>${getClass.room}</td>
                            </tr>
                          `);
                          bellIndex++;
                        }
                      }
                    })
                    
                },
                error: function () {
                    console.log('Connection error.')
                }
            })
        }else {
            alert('Please choose correct letter day.')
        }

        
    })
    function getClassesForDay(data, day) {
        return data.schedule.filter(classInfo => classInfo.days.includes(day));
    }
    
})