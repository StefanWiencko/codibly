import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ChangeEvent, ReactNode, useState } from "react";
import { useSearchParam } from "@/contexts/SearchParamContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type BaseKeys = {
  id: number;
  color?: string;
};

type Props<T extends BaseKeys> = {
  isPending: boolean;
  isSuccess: boolean;
  error: Error | null;
  products: T[] | undefined;
  totalPages: number | undefined;
  tableStructure: {
    title: string;
    key: keyof T;
  }[];
};

const BasicTable = <T extends BaseKeys>({
  isPending,
  isSuccess,
  error,
  products,
  tableStructure,
  totalPages,
}: Props<T>) => {
  const [modalData, setModalData] = useState<T | undefined>(undefined);
  const {
    params: { page },
    setSearchParam,
  } = useSearchParam();

  const handleChangePage = (_: ChangeEvent<unknown>, value: number) => {
    setSearchParam("page", value.toString());
  };

  const handleClose = () => setModalData(undefined);
  return (
    <>
      <Modal
        open={modalData ? true : false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 width-[400px] bg-white">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Item data
          </Typography>
          <Typography
            id="modal-modal-description"
            component="pre"
            sx={{ mt: 2 }}
          >
            {JSON.stringify(modalData, null, 2)}
          </Typography>
        </Box>
      </Modal>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableStructure.map((cell) => (
                <TableCell key={cell.title}>{cell.title}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isSuccess
              ? products?.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },

                      background: row.color ? row.color : "",
                    }}
                    onClick={() => setModalData(row)}
                  >
                    {tableStructure.map((cell, i) => (
                      <TableCell key={row.id + i}>
                        {row[cell.key] as ReactNode}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : null}
            <TableRow>
              {isSuccess && !products?.length ? (
                <TableCell colSpan={3} align="center">
                  No data
                </TableCell>
              ) : null}
              {isPending ? (
                <TableCell colSpan={3} align="center">
                  Loading...
                </TableCell>
              ) : null}
              {error ? (
                <TableCell colSpan={3} align="center">
                  {"Error: " + error.message}
                </TableCell>
              ) : null}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        sx={{ marginX: "auto", marginTop: 2, width: "fit-content" }}
        spacing={2}
      >
        {isSuccess ? (
          <Pagination
            count={totalPages}
            variant="outlined"
            color="primary"
            page={page}
            onChange={handleChangePage}
          />
        ) : null}
      </Stack>
    </>
  );
};

export default BasicTable;
