import { TableRow, TableCell, Skeleton } from "@mui/material";

interface DictionaryDataGridLoadingProps {
  count: number;
}

const DictionaryDataGridLoading: React.FC<DictionaryDataGridLoadingProps> = ({
  count,
}) => {
  return (
    <>
      {[...Array(count).keys()].map((item) => (
        <TableRow role="checkbox" key={item}>
          <TableCell padding="checkbox"></TableCell>
          <TableCell align="right">
            <Skeleton variant="text" sx={{ width: "5rem" }} />
          </TableCell>
          <TableCell align="right">
            <Skeleton variant="text" sx={{ width: "5rem" }} />
          </TableCell>
          <TableCell align="right">
            <Skeleton variant="text" sx={{ width: "5rem" }} />
          </TableCell>
          <TableCell align="right">
            <Skeleton variant="text" sx={{ width: "5rem" }} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default DictionaryDataGridLoading;
