// Purpose: This file defines the UI for the root URL of your application (i.e., when a user navigates to /). It's essentially your homepage.
// Rendering: The component exported from app/page.tsx will be rendered as the children inside your app/layout.tsx.
// Content: This is where you put the specific content for your homepage.
import { Container, Title, Text, Stack, Anchor, Group } from '@mantine/core';
import Link from 'next/link'; // For client-side navigation

export default function Home() {
  return (
    <Container size="md" pt={50}>
      <Stack align="center">
        <Title order={1} ta="center">
          Welcome to Amplify!
        </Title>
        <Text ta="center">
          This is the landing page. Explore our features or log in to get started.
        </Text>
        <Group mt="lg">
          <Anchor component={Link} href="/login" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} size="lg">
            Login
          </Anchor>
          <Anchor component={Link} href="/spanish" variant="gradient" gradient={{ from: 'teal', to: 'lime' }} size="lg">
            Practice Spanish
          </Anchor>
        </Group>
      </Stack>
    </Container>
  );
}
