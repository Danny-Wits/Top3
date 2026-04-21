import React from 'react';
import { Container, Title, Text, Box, Paper, Stack } from '@mantine/core';

export default function PrivacyPolicy() {
  return (
    <Container size="sm" px="md" py="xl">
      <Title order={2} mb="lg" fw={800}>Privacy Policy</Title>
      
      <Paper p="xl" radius="md" withBorder style={{ backgroundColor: 'var(--mantine-color-default)' }}>
        <Stack gap="md">
          <Box>
            <Text fw={700} fz="lg" mb="4px">1. Information Collection</Text>
            <Text size="sm" c="dimmed" lh={1.6}>
              When you use Top 3, we collect a minimal amount of information required for authentication 
              and voting functionalities. This may include your email address or user ID to ensure each 
              student creates one account and casts unique votes.
            </Text>
          </Box>
          <Box>
            <Text fw={700} fz="lg" mb="4px">2. How We Use Data</Text>
            <Text size="sm" c="dimmed" lh={1.6}>
              We use your voting data purely for the purpose of the Top 3 leaderboard algorithm. We do 
              not sell, rent, or distribute your email or personal preferences to any third parties without 
              your explicit consent.
            </Text>
          </Box>
          <Box>
            <Text fw={700} fz="lg" mb="4px">3. Security</Text>
            <Text size="sm" c="dimmed" lh={1.6}>
              We implement basic security measures, such as encryption during transmission, to protect 
              your data. The app is built on top of Supabase and uses standard Row Level Security (RLS) policies 
              to keep unauthorized parties out.
            </Text>
          </Box>
          <Box>
            <Text fw={700} fz="lg" mb="4px">4. Changes to Policy</Text>
            <Text size="sm" c="dimmed" lh={1.6}>
              We may update this Privacy Policy from time to time as the app evolves. Continued use of 
              the application means you agree with the revised policy.
            </Text>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
