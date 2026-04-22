import React from 'react';
import { Container, Title, Text, Center, Loader, Card, Group, Avatar, Badge, Stack, ThemeIcon, Box } from '@mantine/core';
import { useCategories, useLeaderboard, useAllProfiles } from '../hooks/useVotes';
import { IconMedal, IconCrown } from '@tabler/icons-react';
import { getStudentName, getInitials } from '../lib/studentNames';
import { getCategoryConfig } from '../lib/categoryConfig';

export default function CategoryWinners() {
  const { data: categories, isLoading: isCatLoading } = useCategories();
  const { data: leaderboard, isLoading: isLeadLoading } = useLeaderboard();
  const { data: profiles } = useAllProfiles();

  if (isCatLoading || isLeadLoading) {
    return <Center style={{ height: '60dvh' }}><Loader color="indigo" size="lg" /></Center>;
  }

  return (
    <Container size="xs" px="md" py="xl">
      <Group gap="sm" mb="xl">
        <ThemeIcon size={42} radius="xl" variant="gradient" gradient={{ from: 'yellow.5', to: 'orange.6' }}>
          <IconCrown size={24} stroke={2} />
        </ThemeIcon>
        <Box>
          <Title order={2} fw={800}>Category Winners</Title>
          <Text c="dimmed" size="sm">The top voted student in each category.</Text>
        </Box>
      </Group>

      {(!categories || categories.length === 0) ? (
        <Card padding="xl" withBorder={false} shadow="none" style={{ backgroundColor: 'var(--mantine-color-default)' }}>
          <Text c="dimmed" ta="center" size="sm">No categories found.</Text>
        </Card>
      ) : (
        <Stack gap="md">
          {categories.map((category) => {
            const config = getCategoryConfig(category.name);
            const CategoryIcon = config.icon || IconMedal;
            
            // Find the winner for this category (position 1)
            const winner = leaderboard?.find(
              entry => entry.out_category_id === category.id && entry.out_position === 1
            );

            const getCategoryColor = (type) => {
              if (type === 'most_likely') return 'cyan';
              if (type === 'negative') return 'pink';
              return 'indigo';
            };
            const accentColor = getCategoryColor(category.type);

            return (
              <Card
                key={category.id}
                padding="lg"
                withBorder={true}
                shadow="sm"
                radius="md"
                style={{ backgroundColor: 'var(--mantine-color-body)', borderColor: `var(--mantine-color-${accentColor}-2)` }}
              >
                <Group wrap="nowrap" align="center" mb="md">
                  <ThemeIcon size={40} radius="xl" variant="light" color={accentColor}>
                    <CategoryIcon size={20} stroke={1.8} />
                  </ThemeIcon>
                  <Box>
                    <Text fw={800} size="md" lh={1.1}>{category.name}</Text>
                    <Text c="dimmed" size="xs" lh={1.2} style={{ maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{config.description}</Text>
                  </Box>
                </Group>

                {winner ? (
                  <Group justify="space-between" wrap="nowrap" 
                    style={{ backgroundColor: `var(--mantine-color-${accentColor}-light)`, padding: 12, borderRadius: 8 }}>
                    <Group gap="md" wrap="nowrap">
                      <Avatar size={40} radius="xl" color={accentColor} src={profiles?.find(p => p.roll_number === winner.out_nominee_roll_number)?.avatar_url || null}>
                        {getInitials(getStudentName(winner.out_nominee_roll_number))}
                      </Avatar>
                      <Box>
                        <Text fw={700} size="sm" c={`${accentColor}.9`}>{getStudentName(winner.out_nominee_roll_number)}</Text>
                        <Text size="xs" c={`${accentColor}.7`}>Winner</Text>
                      </Box>
                    </Group>
                    <Badge size="md" variant="filled" color={accentColor}>
                      {winner.out_total_score} pts
                    </Badge>
                  </Group>
                ) : (
                  <Box style={{ backgroundColor: 'var(--mantine-color-default)', padding: 12, borderRadius: 8 }}>
                    <Text c="dimmed" ta="center" size="sm">No votes yet</Text>
                  </Box>
                )}
              </Card>
            );
          })}
        </Stack>
      )}
    </Container>
  );
}
