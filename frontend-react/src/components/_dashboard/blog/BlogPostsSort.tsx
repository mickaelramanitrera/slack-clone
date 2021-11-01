// material
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

interface IBlogPostsSort {
  options: any[];
  onSort: any;
}

export default function BlogPostsSort({ options, onSort }: IBlogPostsSort) {
  return (
    <TextField select size="small" value="latest" onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
