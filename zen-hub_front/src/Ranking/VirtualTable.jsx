import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

const sample = [
  ['Usuario_Test1', 'I.A Generativa', 800, 600, 4000],
  ['Usuario_Test2', 'Backend Development', 650, 650, 3760],
  ['Usuario_Test3', 'Project Management', 450, 500, 3400],
  ['Usuario_Test4', 'Frontend Development', 210, 900, 3210],
  ['Usuario_Test5', 'I.A Generatva   ', 70, 1250, 3070],
];

function createData(id, usuario, path, tiempo, neorimas, puntaje) {
  return { id, usuario, path, tiempo, neorimas, puntaje };
}

const columns = [
  {
    width: 120,
    label: 'Usuario',
    dataKey: 'usuario',
  },
  {
    width: 140,
    label: 'Path',
    dataKey: 'path',
  },
  {
    width: 100,
    label: 'Tiempo',
    dataKey: 'tiempo',
    numeric: true,
  },
  {
    width: 100,
    label: 'Neorimas',
    dataKey: 'neorimas',
    numeric: true,
  },
  {
    width: 100,
    label: 'Puntaje',
    dataKey: 'puntaje',
    numeric: true,
  }
];

const rows = Array.from({ length: 50 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

const Scroller = React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  ));
Scroller.displayName = 'Scroller';
  
const TableBodyComponent = React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />);
TableBodyComponent.displayName = 'TableBodyComponent';
  
const TableRowComponent = (props) => <TableRow {...props} />;
TableRowComponent.displayName = 'TableRowComponent';
  
const VirtuosoTableComponents = {
    Scroller,
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
    ),
    TableHead,
    TableRow: TableRowComponent,
    TableBody: TableBodyComponent,
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        <TableCell
          key="ranking"
          variant="head"
          align="right"
          style={{ width: 70 }} // Ajusta este valor según tus necesidades
          sx={{
            backgroundColor: 'background.paper',
          }}
        >
          Ranking
        </TableCell>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? 'right' : 'left'}
            style={{ width: column.width }}
            sx={{
              backgroundColor: 'background.paper',
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    );
  }

function rowContent(index, row) {
  return (
    <React.Fragment>
     <TableCell align="right">{index + 1}</TableCell>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function VirtualTable() {
  return (
    <Paper style={{ height: '62vh', width: '95%' }}>
        <TableVirtuoso
          data={rows}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
    </Paper>
  );
}