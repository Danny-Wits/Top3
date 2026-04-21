import React from 'react';
import { Container, Title, Text, Box, Paper, Stack } from '@mantine/core';

export default function TermsOfService() {
  return (
    <Container size="sm" px="md" py="xl">
      <Title order={2} mb="lg" fw={800}>Terms of Service</Title>
      
      <Paper p="xl" radius="md" withBorder style={{ backgroundColor: 'var(--mantine-color-default)' }}>
        <Stack gap="md">
          <Box>
            <Text fw={700} fz="lg" mb="4px">1. Acceptance of Terms</Text>
            <Text size="sm" c="dimmed" lh={1.6}>
              By accessing and using the Top 3 application, you accept and agree to be bound by the terms 
              and provision of this agreement.
            </Text>
          </Box>
          <Box>
            <Text fw={700} fz="lg" mb="4px">2. User Conduct</Text>
            <Text size="sm" c="dimmed" lh={1.6}>
              You agree to use the application strictly for its intended purpose of voting for class 
              superlatives. Any form of harassment, hate speech, or inappropriate behavior within or 
              involving the platform will lead to immediate suspension of your account.
            </Text>
          </Box>
          <Box>
            <Text fw={700} fz="lg" mb="4px">3. Fair Voting</Text>
            <Text size="sm" c="dimmed" lh={1.6}>
              Users are not allowed to use automated scripts, multiple accounts, or any exploit mechanisms 
              to skew the voting process. We reserve the right to nullify voting results if tampered with.
            </Text>
          </Box>
          <Box>
            <Text fw={700} fz="lg" mb="4px">4. Liability</Text>
            <Text size="sm" c="dimmed" lh={1.6}>
              The developer of Top 3 is not responsible for any personal disputes arising from the voting results. 
              The app is provided "as is" and intended to be a fun activity.
            </Text>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
