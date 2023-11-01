import { useContext } from 'react';
import { StoreContext } from '../../context/globalContext';
import { TimeSlot } from './Timeslot';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { PatientSearch } from '../filters/PatientSearch.jsx';

export const WeeklySchedule = () => {
  const { currentWeek, setCurrentWeek } = useContext(StoreContext);
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const timeSlots = [
    '8:00 AM',
    '8:30 AM',
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
    '6:00 PM',
  ];

  return (
    <div className='schedule'>
      <div className='schedule-header'>
        <h2>Weekly Appointments:</h2>
        <h3 className='week-header'>
          <ArrowBackIosIcon />
          {` ${currentWeek[0]} - ${currentWeek[6]} `}
          <ArrowForwardIosIcon />
        </h3>
      </div>
      <div className='filters'>
        <PatientSearch />
      </div>
      <table>
        <tr className='column-names'>
          <th id='timeslot-header'>{''}</th>
          {currentWeek.map((day, index) => {
            return (
              <th key={day}>
                <div>
                  <div>{daysOfWeek[index]}</div> <div>{day.slice(0, 5)}</div>
                </div>
              </th>
            );
          })}
        </tr>
        {timeSlots.map(time => {
          return (
            <tr key={time} className='table-row'>
              <td key={time}>{time}</td>
              {currentWeek.map(day => {
                return (
                  <td key={day + time}>
                    <TimeSlot day={day} startTime={time} />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};
