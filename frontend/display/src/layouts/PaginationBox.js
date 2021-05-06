import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  ul: {
    '& .MuiPaginationItem-root': {
      color: '#fff',
    },
  },
}));

export default function PaginationBox({
  totalProducts,
  productPerPage,
  paginate,
}) {
  const classes = useStyles();
  const numberOfPages = Math.ceil(totalProducts / productPerPage);
  let currentPage;

  return (
    <nav className="mb-5">
      <Pagination
        count={numberOfPages}
        page={currentPage}
        onChange={(event, value) => paginate(value)}
        color="secondary"
        size="large"
        classes={{ ul: classes.ul }}
      />
    </nav>
  );
}
