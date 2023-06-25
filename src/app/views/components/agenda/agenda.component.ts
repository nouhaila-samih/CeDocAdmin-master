import { Component, OnInit, Input } from "@angular/core";
//import { CalendarOptions } from "@fullcalendar/angular"; // useful for typechecking
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

@Component({
    selector: "app-agenda",
    templateUrl: "./agenda.component.html",
    styleUrls: ["./agenda.component.css"],
})
export class AgendaComponent implements OnInit {
    @Input() events = [{}];
    @Input() defaultDate = Date.now(); //The initial date displayed when the calendar first loads.

    options: any;

    constructor() {}

    ngOnInit() {
        this.options = {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
            /* Whereas the local timezone will vary from browser to browser, 
      the UTC time zone is guaranteed to be the same in every browser. 
      It will also not experience daylight savings times. 
      The UTC time zone was designed this way and it serves as a 
      time zone that other time zones define themselves relative to.
       */
            timeZone: "UTC",

            height: "auto",

            //The initial date displayed when the calendar first loads.
            //When not specified, this value defaults to the current date.
            //initialDate : '2019-01-01',

            minTime: "08:00:00",
            maxTime: "19:00:00",
            firstDay: 1, //Monday => 1

            header: {
                left: "prev,next",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
            },

            editable: false,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,

            defaultDate: this.defaultDate,

            allDaySlot: false, //Determines if the “all-day” slot is displayed at the top of the calendar.
        };

        // this.events = [
        //     {
        //         id: 1,
        //         title: "All Day Event",
        //         start: "2017-02-01",
        //     },
        //     {
        //         id: 2,
        //         title: "Long Event",
        //         start: "2017-02-07",
        //         end: "2017-02-10",
        //     },
        //     {
        //         id: 3,
        //         title: "Repeating Event",
        //         start: "2017-02-09T16:00:00",
        //     },
        //     {
        //         id: 4,
        //         title: "Repeating Event",
        //         start: "2022-05-30T16:00:00",
        //         end: "2022-05-30T16:30:00",
        //     },
        //     {
        //         id: 5,
        //         title: "Repeating Event",
        //         start: "2022-05-30T16:30:00",
        //         end: "2022-05-30T17:00:00",
        //     },
        // ];
    }
}
