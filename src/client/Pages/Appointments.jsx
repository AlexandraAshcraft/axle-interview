import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { EditToolbar } from './EditToolbar.jsx';
import { useRouteLoaderData } from 'react-router-dom';

export function AppointmentTable() {
  const AppointmentData = useRouteLoaderData('home');

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const createRows = () => {
    const rows = [];
    if (Array.isArray(AppointmentData.appointments)) {
      const rowsData = AppointmentData.appointments.map(appointment => {
        const rowPatient = AppointmentData.patient_names.filter(
          patient => patient.patient_id === appointment.patient_id,
        )[0].patient_name;
        const rowProvider = AppointmentData.provider_names.filter(
          provider => provider.provider_id === appointment.provider_id,
        )[0].provider_name;
        return {
          id: appointment.appointment_id,
          patient_name: rowPatient,
          type: appointment.type,
          provider_name: rowProvider,
          date: new Date(appointment.date),
          start_time: appointment.start_time,
          end_time: appointment.end_time,
        };
      });
      setRows(rowsData);
    } else {
      const rowPatient = AppointmentData.patient_names.filter(
        patient =>
          patient.patient_id === AppointmentData.appointments.patient_id,
      )[0].patient_name;
      const rowProvider = AppointmentData.provider_names.filter(
        provider =>
          provider.provider_id === AppointmentData.appointments.provider_id,
      )[0].provider_name;

      const row = {
        id: AppointmentData.appointments.appointment_id,
        patient_name: rowPatient,
        type: AppointmentData.appointments.type,
        provider_name: rowProvider,
        date: new Date(AppointmentData.appointments.date),
        start_time: AppointmentData.appointments.start_time,
        end_time: AppointmentData.appointments.end_time,
      };
      setRows([row]);
    }
  };

  useEffect(() => {
    createRows();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = id => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = id => () => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleCancelClick = id => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find(row => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter(row => row.id !== id));
    }
  };

  const processRowUpdate = newRow => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map(row => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = newRowModesModel => {
    setRowModesModel(newRowModesModel);
  };

  const providerOptions = AppointmentData.provider_names.map(provider =>
    provider.provider_name.toString(),
  );

  const columns = [
    {
      field: 'patient_name',
      headerName: 'Patient',
      width: 180,
      editable: true,
    },
    {
      field: 'type',
      headerName: 'Appointment Type',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: [
        'Vaccination',
        'Bloodwork',
        'Physical Therapy',
        'Occupational Therapy',
        'Primary Care',
        'Dialysis',
      ],
    },
    {
      field: 'provider_name',
      headerName: 'Provider',
      width: 220,
      editable: true,
      type: 'singleSelect',
      defaultValue: '',
      valueOptions: providerOptions,
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      width: 120,
      editable: true,
    },
    {
      field: 'start_time',
      headerName: 'Start Time',
      type: 'time',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'end_time',
      headerName: 'End Time',
      type: 'time',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label='Save'
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label='Cancel'
              className='textPrimary'
              onClick={handleCancelClick(id)}
              color='inherit'
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            className='textPrimary'
            onClick={handleEditClick(id)}
            color='inherit'
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
            onClick={handleDeleteClick(id)}
            color='inherit'
          />,
        ];
      },
    },
  ];

  return (
    AppointmentData && (
      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode='row'
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
    )
  );
}
