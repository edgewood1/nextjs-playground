// /Users/meldejesus/Desktop/Amplify/components/RegisterForm.tsx
'use client';

import { Anchor, Button, Container, Paper, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => {
        if (value.length < 12) return 'Password must be at least 12 characters';
        if (!/[A-Z]/.test(value)) return 'Password must contain an uppercase letter';
        if (!/[a-z]/.test(value)) return 'Password must contain a lowercase letter';
        if (!/[0-9]/.test(value)) return 'Password must contain a number';
        if (!/[^A-Za-z0-9]/.test(value)) return 'Password must contain a special character';
        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setError('');
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        router.push('/login'); // Redirect to login page on successful registration
      } else {
        const data = await res.json();
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">
        Create an account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{' '}
        <Anchor size="sm" component="button" onClick={() => router.push('/login')}>
          Sign in
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              required
              label="Name"
              placeholder="Your Name"
              autoComplete="name"
              {...form.getInputProps('name')}
            />
            <TextInput
              required
              label="Email"
              placeholder="hello@example.com"
              autoComplete="username"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              autoComplete="new-password"
              description="12+ characters with uppercase, lowercase, number, and special character"
              {...form.getInputProps('password')}
            />
            {error && <Text c="red" size="sm" mt="xs">{error}</Text>}
            <Button fullWidth mt="xl" type="submit">Register</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
