import React from "react"

export const TimeSlot = (day, startTime, appointments) => {
    
    
    return !appointments? (
        <div className="time-slot">
            <button className="empty-appointment">{''}</button>
        </div>
    ) : (
        <div className="time-slot">
            {appointments.map((appointment)=> {
                return (
                    <button className={appointment.status} providerId = {appointment.provider_id} >{`${appointment.patient.first_name} ${appointment.patient.last_name}`}</button>
                )
            })}
        </div>
    )
}