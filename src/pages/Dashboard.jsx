import React from 'react';
import { Title, Card, Text, Badge, Container, Group, Center, Loader, Box, Stack, ThemeIcon, Image } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useCategories, useVoteTracking } from '../hooks/useVotes';
import { IconLock, IconChevronRight } from '@tabler/icons-react';
import { getCategoryConfig } from '../lib/categoryConfig';

/**
 * Dashboard — "Category Hub" from Stitch design.
 * Shows categories split into "Hall of Fame" (positive) and "Drama Club" (negative).
 * Completed categories are visually locked.
 */
export default function Dashboard() {
  const navigate = useNavigate();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: completedCategories, isLoading: isTrackingLoading } = useVoteTracking();

  if (isCategoriesLoading || isTrackingLoading) {
    return <Center style={{ height: '60dvh' }}><Loader color="indigo" size="lg" /></Center>;
  }

  const positiveCategories = categories?.filter(c => c.type === 'positive') || [];
  const negativeCategories = categories?.filter(c => c.type === 'negative') || [];

  return (
    <Container size="xs" px="md">

      {/* Subheading */}
      <Box mb="lg">
        <Title order={3} fw={700}>Vote Now</Title>
        <Text c="dimmed" size="sm" mt={4}>
          Select your top picks for the class superlatives.
        </Text>
      </Box>

      {/* ---- POSITIVE SECTION ---- */}
      <Text size="xs" fw={700} c="indigo.6" tt="uppercase" mb="xs" mt="lg">
        The Hall of Fame
      </Text>
      <Stack gap="sm">
        {positiveCategories.map(cat => (
          <CategoryCard
            key={cat.id}
            category={cat}
            isCompleted={completedCategories?.includes(cat.id)}
            onTap={() => navigate(`/vote/${cat.id}`)}
            colorScheme="indigo"
          />
        ))}
      </Stack>

      {/* ---- NEGATIVE SECTION ---- */}
      <Text size="xs" fw={700} c="pink.6" tt="uppercase" mb="xs" mt="xl">
        The Drama Club
      </Text>
      <Stack gap="sm">
        {negativeCategories.map(cat => (
          <CategoryCard
            key={cat.id}
            category={cat}
            isCompleted={completedCategories?.includes(cat.id)}
            onTap={() => navigate(`/vote/${cat.id}`)}
            colorScheme="pink"
          />
        ))}
      </Stack>
    </Container>
  );
}

/**
 * CategoryCard — a single category row.
 * Uses tonal surface layering (white card on #f1f7ff background).
 * Completed categories are greyed + locked.
 */
function CategoryCard({ category, isCompleted, onTap, colorScheme }) {
  const config = getCategoryConfig(category.name);
  const Icon = config.icon;

  return (
    <Card
      padding="lg"
      withBorder={false}
      shadow="none"
      onClick={() => !isCompleted && onTap()}
      style={{
        cursor: isCompleted ? 'default' : 'pointer',
        opacity: isCompleted ? 0.55 : 1,
        backgroundColor: isCompleted
          ? 'var(--mantine-color-default-hover)'
          : 'var(--mantine-color-default)',
        transition: 'transform 150ms ease, box-shadow 150ms ease',
      }}
      onMouseDown={(e) => {
        if (!isCompleted) e.currentTarget.style.transform = 'scale(0.98)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <Group justify="space-between" wrap="nowrap">
        <Group wrap="nowrap" gap="md">
          <ThemeIcon
            size={48}
            radius="xl"
            variant="light"
            color={isCompleted ? 'gray' : colorScheme}
          >
            <Icon size={24} stroke={1.8} />
          </ThemeIcon>
          <Box>
            <Text fw={700} size="md" lh={1.3}>{category.name}</Text>
            <Text c="dimmed" size="xs" mt={2}>{config.description}</Text>
            {isCompleted && (
              <Badge color="teal" size="xs" variant="light" mt={4}>Voted</Badge>
            )}
          </Box>
        </Group>
        {isCompleted
          ? <IconLock size={18} color="var(--mantine-color-gray-5)" />
          : <IconChevronRight size={18} color="var(--mantine-color-gray-4)" />
        }
      </Group>
    </Card>
  );
}
