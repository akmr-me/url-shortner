import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import "./urlList.css";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";
import { UserState } from "../../context";
import DeleteURL from "./DeleteURL";

const rowsPerPage = 10;
const URLTable = () => {
  const { storage } = UserState();
  const [copy, setCopy] = useState("");
  const [page, setPage] = useState(0);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  if (storage.length === 0) return;

  return (
    <>
      <TableContainer className="table-wrapper">
        <Table className="fl-table">
          <TableHead sx={{ position: "sticky", zIndex: 2, top: 0 }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Short Url</TableCell>
              <TableCell>Clicks</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? storage.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : storage
            ).map((item, i) => (
              <TableRow key={page * rowsPerPage + i}>
                <TableCell width="5%">{page * rowsPerPage + i + 1}</TableCell>
                <TableCell
                  sx={{
                    maxWidth: "120px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  <Link href={`${item.full}`}>{item.full.split("//")[1]}</Link>
                </TableCell>
                <TableCell width="30%" sx={{ textAlign: "right" }}>
                  <span style={{ verticalAlign: "inherit" }}>
                    {process.env.REACT_APP_URL.split("//")[1]}/{item.short}
                  </span>

                  <Tooltip
                    title={copy || "Copy Link"}
                    placement="right-end"
                    enterDelay={200}
                    leaveDelay={200}
                    arrow
                  >
                    <Button
                      variant="text"
                      color="inherit"
                      sx={{
                        minWidth: 0,
                        color: "grey",
                        "&:hover": { color: "inherit" },
                      }}
                      disableElevation
                      onClick={(e) => {
                        navigator.clipboard.writeText(
                          `${process.env.REACT_APP_URL}/${item.short}`
                        );
                        setCopy("Copied ✓");
                        setTimeout(() => setCopy(""), 500);
                      }}
                    >
                      <ContentCopyIcon
                        sx={{
                          fontSize: "14px",
                          marginLeft: { xs: "4px", sm: "10px" },
                          cursor: "pointer",
                          "&:hover": { color: "blue" },
                        }}
                      />
                    </Button>
                  </Tooltip>
                </TableCell>
                <TableCell width="8%">{item.clicks}</TableCell>
                <TableCell width="10%">
                  <span style={{ verticalAlign: "inherit" }}>
                    {new Date(item.lastClicked).toLocaleDateString()}
                  </span>
                  <DeleteURL short={item.short} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {storage.length > 10 && (
            <TableFooter
              sx={{
                position: "sticky",
                zIndex: 2,
                bottom: 0,
                backgroundColor: "white",
              }}
            >
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[10]}
                  colSpan={5}
                  count={storage.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  sx={{
                    "& .MuiTablePagination-spacer": {
                      flex: { xs: "inherit", sm: "1 1 100%" },
                      paddingLeft: { xs: "32px", sm: "inherit" },
                    },
                  }}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default URLTable;
