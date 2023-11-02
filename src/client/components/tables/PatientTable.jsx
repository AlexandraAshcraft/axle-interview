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

export function PatientTable() {
  const ProviderData = useRouteLoaderData('providers');
  const PatientData = useRouteLoaderData('patients');

  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  const createRows = () => {
    const rows = [];

    if (Array.isArray(PatientData)) {
      const rowsData = PatientData.map(patient => {
        return {
          id: patient.patient_id,
          patient_name: patient.first_name + ' ' + patient.last_name,
          date_of_birth: new Date(patient.date_of_birth),
          street_address: patient.street_address,
          city: patient.city,
          state: patient.state,
          zipcode: patient.zipcode,
          phone: patient.phone,
          insurance_provider: patient.insurance_provider,
        };
      });
      setRows(rowsData);
    } else {
      const row = {
        id: PatientData.patient_id,
        patient_name: PatientData.first_name + ' ' + PatientData.last_name,
        date_of_birth: new Date(PatientData.date_of_birth),
        street_address: PatientData.street_address,
        city: PatientData.city,
        state: PatientData.state,
        zipcode: PatientData.zipcode,
        phone: PatientData.phone,
        insurance_provider: PatientData.insurance_provider,
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

  const columns = [
    {
      field: 'patient_name',
      headerName: 'Patient',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'date_of_birth',
      headerName: 'DOB',
      width: 180,
      editable: true,
      align: 'left',
      headerAlign: 'left',
      type: 'date',
      //valueFormatter: params => new Date(params?.value).toLocaleString();
    },
    {
      field: 'street_address',
      headerName: 'Street Address',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'city',
      headerName: 'City',
      width: 120,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'state',
      headerName: 'State',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      type: 'singleSelect',
      valueOptions: [
        'AL',
        'AK',
        'AZ',
        'AR',
        'CA',
        'CO',
        'CT',
        'DE',
        'FL',
        'GA',
        'HI',
        'ID',
        'IL',
        'IN',
        'IA',
        'KS',
        'KY',
        'LA',
        'ME',
        'MD',
        'MA',
        'MI',
        'MN',
        'MS',
        'MO',
        'MT',
        'NE',
        'NV',
        'NH',
        'NJ',
        'NM',
        'NY',
        'NC',
        'ND',
        'OH',
        'OK',
        'OR',
        'PA',
        'RI',
        'SC',
        'SD',
        'TN',
        'TX',
        'UT',
        'VT',
        'VA',
        'WA',
        'WV',
        'WI',
        'WY',
      ],
      editable: true,
    },
    {
      field: 'zipcode',
      headerName: 'Zip Code',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      type: 'number',
      editable: true,
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      width: 140,
      align: 'left',
      headerAlign: 'left',
      type: 'number',
      editable: true,
    },
    {
      field: 'insurance_provider',
      headerName: 'Insurance Provider',
      width: 140,
      align: 'left',
      headerAlign: 'left',
      type: 'singleSelect',
      valueOptions: [
        'Aetna',
        'Anthem',
        'Blue Cross Blue Shield',
        'Cigna',
        'Kaiser Permanente',
        'Medicare',
        'UnitedHealth Group',
      ],
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 180,
      align: 'left',
      headerAlign: 'left',
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
    PatientData && (
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
