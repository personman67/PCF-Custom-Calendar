import * as React from 'react';
import { Calendar, Views, momentLocalizer} from 'react-big-calendar';
import * as moment from 'moment';
import * as schedulejson from "../eventData/schedule.json";
import { useCallback, } from 'react';

const localizer = momentLocalizer(moment);

export interface ICalendarProps {
  value: string;
  onChange: (value:string) => void;
}



export const CalendarComponent: React.FC<ICalendarProps> = (props) => {
  {
    const events = schedulejson.schedule.map(event => ({
      ...event,
      start: new Date(event.start), // Convert start to Date object
      end: new Date(event.end),     // Convert end to Date objecty
    }));

    /*
    //------------Custom Event Styling-----------
      const eventPropGetter = useCallback(
        (event, start, end, isSelected) => ({
          ...(event.title.includes("Crew A") && {
            style: {
              backgroundColor: '#f4f0f7',
              color: '#8f6cab',
            },
          }),
        }),
        []
      )
    //----------------------------------------------
    */

      //-----------Event Selection-----------------------
      const onSelectEvent = useCallback((event) => {

        const selectedEvent = {
          title: event.title,
          date: event.start,
          // Add more properties as needed
        };

        const eventDetails = JSON.stringify(selectedEvent);
        
        console.log('Selected Event:', eventDetails);
        props.onChange(eventDetails)

      }, [props]);
      //-------------------------------------------------

    return (
      <div className='component'>
        <div className='calendar-container'>
        <Calendar
            views={[Views.MONTH]}
            //eventPropGetter={eventPropGetter}
            onSelectEvent={onSelectEvent}
            events={schedulejson.schedule}
            startAccessor={"start"}
            endAccessor={"end"}
            localizer={localizer}
            style={{ height: 708 }}
            showMultiDayTimes={true}
            components={{
              toolbar: props => {
                return (
                  <div className='rbc-toolbar'>
                    <div>
                      <span className='rbc-toolbar-label'>{props.label}</span>
                    </div>
                    <div>
                      <button onClick={() => props.onNavigate('TODAY')}>Today</button>
                      <button onClick={() => props.onNavigate('PREV')}>Previous</button>
                      <button onClick={() => props.onNavigate('NEXT')}>Next</button>
                    </div>
                  </div>
                );
              }
            }}
          />
        </div>
      </div>
    );
  }
}
