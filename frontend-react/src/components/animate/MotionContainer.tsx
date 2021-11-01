import { ReactNode } from 'react';
import { motion } from 'framer-motion';
// material
import { Box } from '@mui/material';
//
import { varWrapEnter } from './variants';

interface IMotionContainerProps {
  open: boolean;
  children: ReactNode;
  [name: string]: any;
}

export default function MotionContainer({ open, children, ...other }: IMotionContainerProps) {
  return (
    <Box component={motion.div} initial={false} animate={open ? 'animate' : 'exit'} variants={varWrapEnter} {...other}>
      {children}
    </Box>
  );
}
