import React from 'react';
import { Container, Stack, Title, Text, Button, Group } from '@mantine/core';
import Link from 'next/link';
import { auth, signOut } from '@/lib/auth';

export default async function Home() {
  const session = await auth();

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

        <Group mt="md">
          {session ? (
            <form action={async () => {
              'use server';
              await signOut();
            }}>
              <Button type="submit" variant="outline">Logout</Button>
            </form>
          ) : (
            <>
              <Button component={Link} href="/login">Login</Button>
              <Button component={Link} href="/signup" variant="outline">Signup</Button>
            </>
          )}
        </Group>
      </Stack>
    </Container>
  );
}