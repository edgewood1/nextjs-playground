import React from 'react';
import { Container, Stack, Title, Text, Button } from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  return (
    <Container size="md" pt={50}>
      <Stack align="center">
        <Title order={1} ta="center">
          Welcome to the Playground
        </Title>
        <Text>
          This is the main entry point of the application.
        </Text>
        <Button component={Link} href="/spanish">Go to Spanish Verbs</Button>
      </Stack>
    </Container>
  );
}