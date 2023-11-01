export const getTableData = async activeTable => {
  await fetch(`/api/v1/${activeTable}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(data => data.json())
    .then(data => {
      if (Array.isArray(data)) {
        const columns = Object.keys(data[0]);
        setColumnNames(columns);
        setTableData(data);
      } else {
        const columns = Object.keys(data);
        setColumnNames(columns);
        setTableData([data]);
      }
    })
    .catch(error => console.log(error));
};

export const deleteTableRow = async (activeTable, id) => {
  await fetch(`/api/v1/${activeTable}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(data => data.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
};
