import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ChangeEvent, ReactNode } from "react";
import { useSearchParam } from "@/contexts/SearchParamContext";

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
  const {
    params: { page },
    setSearchParam,
  } = useSearchParam();

  const handleChangePage = (_: ChangeEvent<unknown>, value: number) => {
    setSearchParam("page", value.toString());
  };
  console.log(products);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableStructure.map((cell) => (
                <TableCell>{cell.title}</TableCell>
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
                    onClick={() => console.log("xd")}
                  >
                    {tableStructure.map((cell) => (
                      <TableCell>{row[cell.key] as ReactNode}</TableCell>
                    ))}
                  </TableRow>
                ))
              : null}
            {isSuccess && !products?.length ? (
              <TableRow>
                <TableCell>No data</TableCell>
                <TableCell>No data</TableCell>
                <TableCell>No data</TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
        {isPending ? (
          <h1 className="absolute top-20 left-1/2 -translate-x-1/2 w-fit">
            Loading...
          </h1>
        ) : null}
        {error ? (
          <h1 className="absolute top-20 left-1/2 -translate-x-1/2 mx-auto my-2 w-fit">
            {"Error: " + error.message}
          </h1>
        ) : null}
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
