import React from 'react';
import { Container, Title, Text, Box, Paper, Anchor, Group, ThemeIcon, Stack } from '@mantine/core';
import { IconBrandGithub, IconCode, IconHeart } from '@tabler/icons-react';

export default function AboutDev() {
  return (
    <Container size="sm" px="md" py="xl">
      <Title order={2} mb="lg" fw={800}>About the Developer</Title>
      
      <Paper p="xl" radius="md" withBorder style={{ 
        backgroundColor: 'var(--mantine-color-default)',
        boxShadow: 'var(--mantine-shadow-sm)'
      }}>
        <Stack gap="lg">
          <Group>
            <ThemeIcon size={64} radius="xl" color="indigo" variant="light">
              <IconCode size={32} />
            </ThemeIcon>
            <Box>
              <Text fz="xl" fw={700}>Danny</Text>
              <Text c="dimmed">Full-Stack Developer & MCA Student</Text>
            </Box>
          </Group>

          <Text size="md" lh={1.6}>
            Hi there! I'm Danny, a passionate developer pursuing an MCA (Master of Computer Applications). 
            I built the <b>Top 3</b> app as an engaging, interactive platform to allow students to vote for class superlatives 
            in a fun, premium, and seamless way. My interests lie in creating modern web applications with stunning user 
            experiences.
          </Text>

          <Box mt="md">
            <Text fw={600} mb="xs">Connect with me</Text>
            <Group gap="sm">
              <IconBrandGithub size={20} stroke={1.5} />
              <Anchor href="https://github.com/Danny-Wits" target="_blank" fw={500} c="indigo">
                github.com/Danny-Wits
              </Anchor>
            </Group>
          </Box>
          
          <Group gap={6} mt="xl" justify="center">
            <Text size="sm" c="dimmed">Built with</Text>
            <IconHeart size={16} color="var(--mantine-color-pink-6)" />
            <Text size="sm" c="dimmed">using React, Mantine, and Supabase</Text>
          </Group>
        </Stack>
      </Paper>
    </Container>
  );
}
