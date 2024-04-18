import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';

/*const sample = [
  ['Usuario_Test1', 'I.A Generativa', 800, 600, 4000],
  ['Usuario_Test2', 'Backend Development', 650, 650, 3760],
  ['Usuario_Test3', 'Project Management', 450, 500, 3400],
  ['Usuario_Test4', 'Frontend Development', 210, 900, 3210],
  ['Usuario_Test5', 'I.A Generatva   ', 70, 1250, 3070],
];*/

function createData(rank, username, path, minutes, neorimas, points) {
  return { rank, username, path, minutes, neorimas, points };
}

const columns = [
  {
    width: 70,
    label: 'Ranking',
    dataKey: 'rank',
    numeric: true,
  },
  {
    width: 120,
    label: 'Usuario',
    dataKey: 'username',
  },
  {
    width: 140,
    label: 'Path',
    dataKey: 'path',
  },
  {
    width: 100,
    label: 'Tiempo',
    dataKey: 'minutes',
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
    dataKey: 'points',
    numeric: true,
  }
];


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

// eslint-disable-next-line react/prop-types
export default function VirtualTable( { data } ) {

  // eslint-disable-next-line react/prop-types
  const rows = data.slice(0, 50).map((item) => createData(item.rank, item.username, item.path, item.minutes, item.neorimas, item.points));

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