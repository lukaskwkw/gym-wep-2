import React, { useState } from 'react';
import { AppShell, useMantineTheme } from '@mantine/core';
import { ShellBody } from './ShellBody';
import { ShellHeader } from './ShellHeader';
import { ShellNavbar } from './ShellNavbar';

export const Shell = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return <AppShell
    styles={{
      main: {
        background: theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
      },
    }}
    navbarOffsetBreakpoint="sm"
    asideOffsetBreakpoint="sm"
    fixed
    navbar={ShellNavbar(opened)}
    header={ShellHeader(opened, setOpened, theme)}
  >
    <ShellBody />
  </AppShell>;
};
