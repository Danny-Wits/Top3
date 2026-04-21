import React, { useState } from 'react';
import {
  TextInput, PasswordInput, Button, Container, Title, Text, Stack, Box,
  Image, Divider, Anchor, Center,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

/**
 * Login — Instagram-style. Clean, centered, minimal.
 * Logo → tagline → inputs → button → footer.
 */
export default function Login() {
  const [rollNumber, setRollNumber] = useState('');
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    const roll = parseInt(rollNumber, 10);

    if (isNaN(roll) || roll < 1 || roll > 50) {
      notifications.show({ color: 'red', message: 'Roll number must be between 1 and 50.' });
      return;
    }
    if (pin.length < 6) {
      notifications.show({ color: 'red', message: 'PIN must be at least 6 characters.' });
      return;
    }

    setLoading(true);
    const paddedRoll = roll.toString().padStart(2, '0');
    const dummyEmail = `roll${paddedRoll}@classvote.local`;

    let { data, error } = await supabase.auth.signInWithPassword({
      email: dummyEmail,
      password: pin,
    });

    if (error && error.message.includes('Invalid login credentials')) {
      const res = await supabase.auth.signUp({ email: dummyEmail, password: pin });
      data = res.data;
      error = res.error;

      if (error && error.message.includes('User already registered')) {
        notifications.show({ color: 'red', message: 'Incorrect PIN. Try again.' });
        setLoading(false);
        return;
      }
    }

    if (error) {
      notifications.show({ color: 'red', message: error.message });
      setLoading(false);
      return;
    }

    queryClient.invalidateQueries({ queryKey: ['user'] });
    queryClient.invalidateQueries({ queryKey: ['profile'] });
    notifications.show({ color: 'teal', message: 'Welcome!' });
    navigate('/categories');
  };

  return (
    <Box
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
        backgroundColor: 'var(--mantine-color-body)',
      }}
    >
      {/* ── Main card ── */}
      <Box
        style={{
          width: '100%',
          maxWidth: 380,
          border: '1px solid var(--mantine-color-default-border)',
          borderRadius: 4,
          padding: '40px 32px 24px',
          backgroundColor: 'var(--mantine-color-body)',
        }}
      >
        {/* Logo */}
        <Center mb={12}>
          <Image
            src="/logo.png"
            alt="Top 3"
            w={64}
            h={64}
            fit="contain"
          />
        </Center>
        <Title
          order={1}
          ta="center"
          fz={36}
          fw={900}
          mb={4}
        >
          Top 3
        </Title>
        <Text c="dimmed" ta="center" size="sm" mb={28} fw={500}>
          Your class. Your vote. Completely anonymous.
        </Text>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <Stack gap="sm">
            <TextInput
              placeholder="Roll Number (1 – 50)"
              type="number"
              min={1}
              max={50}
              value={rollNumber}
              onChange={(e) => setRollNumber(e.currentTarget.value)}
              required
              size="md"
              radius="sm"
              styles={{
                input: {
                  backgroundColor: 'var(--mantine-color-default-hover)',
                  border: '1px solid var(--mantine-color-default-border)',
                  fontSize: 14,
                },
              }}
            />
            <PasswordInput
              placeholder="PIN (min 6 characters)"
              value={pin}
              onChange={(e) => setPin(e.currentTarget.value)}
              required
              size="md"
              radius="sm"
              styles={{
                input: {
                  backgroundColor: 'var(--mantine-color-default-hover)',
                  border: '1px solid var(--mantine-color-default-border)',
                  fontSize: 14,
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              size="md"
              loading={loading}
              color="indigo"
              radius="sm"
              mt={4}
              styles={{ root: { fontWeight: 600 } }}
            >
              Log In
            </Button>
          </Stack>
        </form>

        <Divider my="lg" label="OR" labelPosition="center" />

        <Text c="dimmed" ta="center" size="xs" lh={1.6}>
          First time? Just enter your roll number and choose a PIN.
          Your account will be created automatically.
        </Text>
      </Box>

      {/* ── Footer card ── */}
      <Box
        mt="sm"
        style={{
          width: '100%',
          maxWidth: 380,
          border: '1px solid var(--mantine-color-default-border)',
          borderRadius: 4,
          padding: '16px 32px',
          backgroundColor: 'var(--mantine-color-body)',
          textAlign: 'center',
        }}
      >
        <Text size="sm">
          MCA 2025 — For the select 50
        </Text>
      </Box>
    </Box>
  );
}
