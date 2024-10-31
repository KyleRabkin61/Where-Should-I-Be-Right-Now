$(document).ready(function () {
    const scheduleUrl = "https://api.npoint.io/faf2cdc57bb4b33922ec";

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
            $.ajax({
                type: 'GET',
                url: scheduleUrl,
                success: function (data) {
                    $('#scheduleList').empty(); // Clear the previous schedule

                    const classesForDay = getClassesForDay(data, daySelected);
                    const daySchedule = dailyPeriods.daySelected;
                    let bellIndex = 0; // Start from 0

                    daySchedule.forEach(() => {
                        if(true) {
                            const getClass = classesForDay[bellIndex];
                            if (getClass) {
                                $('#scheduleList').append(`
                                    <tr>
                                        <td>${getClass.period}</td>
                                        <td>${getClass.class}</td>
                                        <td>${getClass.teacher}</td>
                                        <td>${getClass.room}</td>
                                    </tr>
                                `);
                                bellIndex++;
                            }
                        }
                    });
                },
                error: function () {
                    console.log('Connection error.');
                }
            });
        } else {
            alert('Please choose a correct letter day.');
        }
    });

    function getClassesForDay(data, day) {
        return data.schedule.filter(classInfo => classInfo.days.includes(day));
    }
});