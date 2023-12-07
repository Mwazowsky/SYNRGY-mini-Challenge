import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import useAction from './list.hooks';
import { ICar } from '../cars.types';

import CommonPage from '../../../components/common-page/common-page';
import { Link, useNavigate } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import { HeaderElementStyled } from './list.styled';

export default function List() {
  const navigate = useNavigate();
  const {
    cars,
    loading,
    setParams,
    params,
    meta,
    handleEdit,
    handleRemove,
    handleSearch,
  } = useAction();

  const renderLoading = () => {
    return (
      <TableCell colSpan={5}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem 0',
          }}
        >
          <CircularProgress />
        </div>
      </TableCell>
    );
  };
  const renderContent = () => {
    if (loading) {
      return renderLoading();
    }
    return cars["cars"]?.map((record: ICar) => (
      <TableRow
        key={record.car_id}
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
          '&:hover': {
            cursor: 'pointer',
          },
          position: 'relative',
        }}
        onClick={() => navigate(`/detail/${record.car_id}`)}
      >
        <TableCell component="th">
          <Box sx={{ mb: 1 }}>{record.manufacture}</Box>
          <Box>
            <strong>Model:</strong> {record.model}
          </Box>
        </TableCell>

        <TableCell>{record.type}</TableCell>
        <TableCell>{record.year}</TableCell>
        <TableCell align="right">{record.plate}</TableCell>
        <TableCell align="right">{record.rentPerDay}</TableCell>
        <TableCell>
          {format(parseISO(`${record.availableAt}`), 'dd/MM/yyyy HH:mm:ss')}
        </TableCell>
        <TableCell>
          <Stack
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              height: '100%',
            }}
            gap={1}
          >
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={(e) => handleRemove(e, record)}
            >
              Remove
            </Button>
            <Button
              type="button"
              variant="outlined"
              onClick={(e) => handleEdit(e, record)}
            >
              Edit
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <CommonPage
      title="Books"
      actionElement={
        <HeaderElementStyled>
          <TextField
            name="search"
            placeholder="Search books title or author"
            onChange={handleSearch}
            size="small"
          />
          <Link to={'/create'}>
            <Button type="button" variant="contained">
              Create new
            </Button>
          </Link>
        </HeaderElementStyled>
      }
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Manufacture</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Year</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>
                Plate
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Rent /Day</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Available At</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderContent()}</TableBody>
        </Table>
      </TableContainer>
      <Pagination
        sx={{ mt: 3 }}
        count={meta?.totalPages}
        variant="outlined"
        shape="rounded"
        onChange={(_, page: number) => {
          setParams({
            ...params,
            page,
          });
        }}
      />
    </CommonPage>
  );
}
