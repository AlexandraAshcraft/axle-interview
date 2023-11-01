import React, { useState } from 'react';
import { getCurrentWeekRange } from '../utils/helperFuncs.js';

export const StoreContext = React.createContext({});

export function StoreProvider({ children }) {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeekRange());
  const [activeTable, setActiveTable] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [selectedProvider, setSelectedProvider] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [allPatients, setAllPatients] = useState({});
  const [allProviders, setAllProviders] = useState({});
  const [allAppointments, setAllAppointments] = useState({});
  const [currModifiedAppointment, setCurrModifiedAppointment] = useState({});
  const [modifiedApptOpen, setModifiedApptOpen] = useState(false);
  const [currModifiedPatient, setCurrModifiedPatient] = useState({});
  const [modifiedPatientOpen, setModifiedPatientOpen] = useState(false);
  const [currModifiedProvider, setcurrDeleteConfirmation] = useState({});
  const [modifiedProviderOpen, setModifiedProviderOpen] = useState(false);
  const [currDeleteConfirmation, setCurrModifiedProvider] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const States = {
    currentWeek: currentWeek,
    setCurrentWeek: setCurrentWeek,
    activeTable: activeTable,
    setActiveTable: setActiveTable,
    selectedPatient: selectedPatient,
    setSelectedPatient: setSelectedPatient,
    selectedProvider: selectedProvider,
    setSelectedProvider: setSelectedProvider,
    selectedAppointment: selectedAppointment,
    setSelectedAppointment: setSelectedAppointment,
    allPatients: allPatients,
    setAllPatients: setAllPatients,
    allProviders: allProviders,
    setAllProviders: setAllProviders,
    allAppointments: allAppointments,
    setAllAppointments: setAllAppointments,
    currModifiedAppointment: currModifiedAppointment,
    setCurrModifiedAppointment: setCurrModifiedAppointment,
    modifiedApptOpen: modifiedApptOpen,
    setModifiedApptOpen: setModifiedApptOpen,
    currModifiedPatient: currModifiedPatient,
    setCurrModifiedPatient: setCurrModifiedPatient,
    modifiedPatientOpen: modifiedPatientOpen,
    setModifiedPatientOpen: setModifiedPatientOpen,
    currModifiedProvider: currModifiedProvider,
    setCurrModifiedProvider: setCurrModifiedProvider,
    modifiedProviderOpen: modifiedProviderOpen,
    setModifiedProviderOpen: setModifiedProviderOpen,
    currDeleteConfirmation: currDeleteConfirmation,
    setcurrDeleteConfirmation: setcurrDeleteConfirmation,
    deleteConfirmationOpen: deleteConfirmationOpen,
    setDeleteConfirmationOpen: setDeleteConfirmationOpen,
  };

  return (
    <StoreContext.Provider value={States}>{children}</StoreContext.Provider>
  );
}
