import React, { useState } from 'react';
import { IconButton, styled } from '@mui/material';
import { Drop } from '@/components/Icons';
import TreeAdoptionDirections from './AdoptionDirections';

const BackgroundIcon = styled(Drop)`
  width: 28px;
  height: 28px;
  float: left;
  transform: scaleX(1.1);
`;

export default function Adopt() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <BackgroundIcon fill="#337ab7" />
      </IconButton>
      {open && (
        <TreeAdoptionDirections
          onmap
          open={open}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
