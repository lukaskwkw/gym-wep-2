import React from 'react';
import { Navbar, Text } from '@mantine/core';

export function ShellNavbar(opened: boolean): React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined {
  return <Navbar
    p="md"
    hiddenBreakpoint="sm"
    hidden={!opened}
    width={{ sm: 200, lg: 300 }}
  >
    <Navbar.Section>Logo</Navbar.Section>
    <Navbar.Section grow mt="md">
      <Text>Link1</Text>
      <Text>Link2</Text>
      <Text>Link3</Text>
    </Navbar.Section>
  </Navbar>;
}
