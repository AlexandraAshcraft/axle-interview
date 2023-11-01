import { useState } from 'react';
import { deleteTableRow } from '../../api/tableData.jsx';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export const DeleteConfirmation = (activeTable, key) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const paramEndpoint = activeTable['activeTable'];
    const paramId = key;
    console.log(paramId);
    deleteTableRow(paramEndpoint, key);
    handleClose();
  };
  const type = activeTable['activeTable']['activeTable'].slice(0, -1);
  const id = key;
  console.log('id', id);

  return (
    <div>
      <button onClick={handleClickOpen}>Delete</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <h3>Delete {type}?</h3>
        </DialogTitle>

        <DialogContent>
          <h3>{`Are you sure you want to delete this ${type}? This cannot be undone once you click submit.`}</h3>
          <button onClick={handleDelete}>Submit</button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
