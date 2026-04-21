import React, { useState } from 'react';
import {
  Container, Title, Select, Button, Box, Text, Center, Loader,
  Stack, Card, ThemeIcon, Group, Divider,
} from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { useCategories, useCastVote, useVoteTracking } from '../hooks/useVotes';
import { notifications } from '@mantine/notifications';
import { getCategoryConfig } from '../lib/categoryConfig';
import { getStudentName } from '../lib/studentNames';
import { IconArrowLeft, IconTrophy, IconMedal } from '@tabler/icons-react';

/**
 * VotingInterface — "Select your top 3 picks" screen.
 * 3 dropdowns for 1st/2nd/3rd place. Filters out already-selected nominees.
 * Matches the Stitch Voting Interface design.
 */
export default function VotingInterface() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { data: categories, isLoading } = useCategories();
  const { data: completedCategories } = useVoteTracking();
  const castVoteMutation = useCastVote();

  const [nominee1, setNominee1] = useState(null);
  const [nominee2, setNominee2] = useState(null);
  const [nominee3, setNominee3] = useState(null);

  if (isLoading) {
    return <Center style={{ height: '60dvh' }}><Loader color="indigo" size="lg" /></Center>;
  }

  const category = categories?.find(c => c.id.toString() === categoryId);

  if (!category) {
    return (
      <Center style={{ height: '60dvh' }}>
        <Text c="dimmed">Category not found.</Text>
      </Center>
    );
  }

  // If already voted in this category, redirect back
  if (completedCategories?.includes(category.id)) {
    return (
      <Container size="xs" px="md">
        <Center style={{ height: '60dvh', flexDirection: 'column', gap: 16 }}>
          <Text fw={700} size="lg">You have already voted in this category.</Text>
          <Button variant="light" color="indigo" onClick={() => navigate('/categories')}>
            Back to Categories
          </Button>
        </Center>
      </Container>
    );
  }

  const config = getCategoryConfig(category.name);
  const CategoryIcon = config.icon;
  const getCategoryColor = (type) => {
    if (type === 'most_likely') return 'cyan';
    if (type === 'negative') return 'pink';
    return 'indigo';
  };
  const accentColor = getCategoryColor(category.type);

  // Build roll number options with student names
  const allOptions = Array.from({ length: 50 }, (_, i) => {
    const roll = i + 1;
    const name = getStudentName(roll);
    return {
      value: roll.toString(),
      label: `${String(roll).padStart(2, '0')} — ${name}`,
    };
  });

  // Filter out already-selected nominees for each dropdown
  const getFilteredOptions = (currentValue, ...otherValues) => {
    const others = otherValues.filter(Boolean);
    return allOptions.filter(
      opt => opt.value === currentValue || !others.includes(opt.value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nominee1 || !nominee2 || !nominee3) {
      notifications.show({ color: 'red', message: 'Please select all 3 positions.' });
      return;
    }

    if (nominee1 === nominee2 || nominee1 === nominee3 || nominee2 === nominee3) {
      notifications.show({ color: 'red', message: 'Each pick must be a different classmate.' });
      return;
    }

    try {
      await castVoteMutation.mutateAsync({
        categoryId,
        nominee1,
        nominee2,
        nominee3,
      });
      notifications.show({ color: 'teal', message: 'Votes locked in! 🔒' });
      navigate('/categories');
    } catch (error) {
      notifications.show({ color: 'red', title: 'Vote failed', message: error.message });
    }
  };

  return (
    <Container size="xs" px="md">
      {/* Back button */}
      <Group
        gap={6}
        mb="lg"
        onClick={() => navigate('/categories')}
        style={{ cursor: 'pointer' }}
      >
        <IconArrowLeft size={18} color="var(--mantine-color-gray-6)" />
        <Text size="sm" c="dimmed" fw={500}>Categories</Text>
      </Group>

      {/* Category header */}
      <Card
        padding="xl"
        withBorder={false}
        shadow="none"
        mb="xl"
        style={{
          backgroundColor: `var(--mantine-color-${accentColor}-light)`,
        }}
      >
        <Group gap="md" wrap="nowrap">
          <ThemeIcon size={56} radius="xl" variant="light" color={accentColor}>
            <CategoryIcon size={28} stroke={1.8} />
          </ThemeIcon>
          <Box>
            <Title order={2} fw={800} fz={24}>{category.name}</Title>
            <Text c="dimmed" size="sm" mt={4}>{config.description}</Text>
          </Box>
        </Group>
      </Card>

      {/* Voting instructions */}
      <Text size="sm" c="dimmed" mb="lg">
        Select your top 3 picks. 1st place gets the most points.
        You cannot vote for the same person twice.
      </Text>

      {/* Vote form */}
      <form onSubmit={handleSubmit}>
        <Stack gap="lg">
          {/* 1st Place */}
          <Card padding="lg" withBorder={false} shadow="none" style={{ backgroundColor: 'var(--mantine-color-default)' }}>
            <Group gap="sm" mb="sm">
              <ThemeIcon size={28} radius="xl" color="yellow" variant="filled">
                <IconTrophy size={16} stroke={2} />
              </ThemeIcon>
              <Text fw={700} size="sm">1st Place</Text>
              <Text c="dimmed" size="xs">3 points</Text>
            </Group>
            <Select
              placeholder="Select a classmate"
              data={getFilteredOptions(nominee1, nominee2, nominee3)}
              value={nominee1}
              onChange={setNominee1}
              searchable
              clearable
              size="md"
              comboboxProps={{ shadow: 'md' }}
            />
          </Card>

          {/* 2nd Place */}
          <Card padding="lg" withBorder={false} shadow="none" style={{ backgroundColor: 'var(--mantine-color-default)' }}>
            <Group gap="sm" mb="sm">
              <ThemeIcon size={28} radius="xl" color="gray" variant="filled">
                <IconMedal size={16} stroke={2} />
              </ThemeIcon>
              <Text fw={700} size="sm">2nd Place</Text>
              <Text c="dimmed" size="xs">2 points</Text>
            </Group>
            <Select
              placeholder="Select a classmate"
              data={getFilteredOptions(nominee2, nominee1, nominee3)}
              value={nominee2}
              onChange={setNominee2}
              searchable
              clearable
              size="md"
              comboboxProps={{ shadow: 'md' }}
            />
          </Card>

          {/* 3rd Place */}
          <Card padding="lg" withBorder={false} shadow="none" style={{ backgroundColor: 'var(--mantine-color-default)' }}>
            <Group gap="sm" mb="sm">
              <ThemeIcon size={28} radius="xl" color="orange" variant="filled">
                <IconMedal size={16} stroke={2} />
              </ThemeIcon>
              <Text fw={700} size="sm">3rd Place</Text>
              <Text c="dimmed" size="xs">1 point</Text>
            </Group>
            <Select
              placeholder="Select a classmate"
              data={getFilteredOptions(nominee3, nominee1, nominee2)}
              value={nominee3}
              onChange={setNominee3}
              searchable
              clearable
              size="md"
              comboboxProps={{ shadow: 'md' }}
            />
          </Card>
        </Stack>

        {/* Action buttons */}
        <Stack gap="sm" mt="xl">
          <Button
            type="submit"
            fullWidth
            size="xl"
            loading={castVoteMutation.isPending}
            variant="gradient"
            gradient={
              accentColor === 'indigo'
                ? { from: 'indigo', to: 'cyan' }
                : accentColor === 'pink'
                ? { from: 'pink', to: 'grape' }
                : { from: 'cyan', to: 'blue' }
            }
            styles={{ root: { height: 56 } }}
          >
            Submit Votes
          </Button>
          <Button
            fullWidth
            size="md"
            variant="subtle"
            color="gray"
            onClick={() => navigate('/categories')}
          >
            Cancel &amp; Return to Categories
          </Button>
        </Stack>
      </form>
    </Container>
  );
}
