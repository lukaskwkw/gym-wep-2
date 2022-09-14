import React from 'react';
import { Header, MediaQuery, Text, Burger, MantineTheme } from '@mantine/core';

export function ShellHeader(opened: boolean, setOpened: React.Dispatch<React.SetStateAction<boolean>>, theme: MantineTheme): React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined {
  return <Header height={70} p="md">
    <div
      style={{ display: "flex", alignItems: "center", height: "100%" }}
    >
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Burger
          opened={opened}
          onClick={() => setOpened((o) => !o)}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl" />
      </MediaQuery>

      <Text>Application header</Text>
    </div>
  </Header>;
}
