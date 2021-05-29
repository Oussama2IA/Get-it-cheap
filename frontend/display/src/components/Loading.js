import { LinearProgress, CircularProgress } from '@material-ui/core';

export default function Loading() {
  return (
    <div className="loading">
      <div className="linear">
        <LinearProgress color="secondary" />
      </div>
      <CircularProgress color="secondary" />
    </div>
  );
}
