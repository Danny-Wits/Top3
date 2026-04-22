import React from 'react';
import { Container, Title, Text, Center, Loader, Card, Group, Avatar, Badge, Stack, ThemeIcon, Box } from '@mantine/core';
import { useLeaderboard, useAllProfiles } from '../hooks/useVotes';
import { IconTrophy, IconFlame } from '@tabler/icons-react';
import { getStudentName, getInitials } from '../lib/studentNames';

export default function GeneralLeaderboard() {
  const { data: leaderboard, isLoading: isLeadLoading } = useLeaderboard();
  const { data: profiles } = useAllProfiles();

  if (isLeadLoading) {
    return <Center style={{ height: '60dvh' }}><Loader color="indigo" size="lg" /></Center>;
  }

  // Aggregate total scores per student across all categories
  const scoresByStudent = {};
  leaderboard?.forEach((entry) => {
    const roll = entry.out_nominee_roll_number;
    if (!scoresByStudent[roll]) {
      scoresByStudent[roll] = 0;
    }
    scoresByStudent[roll] += entry.out_total_score;
  });

  // Convert to array and sort
  const aggregated = Object.entries(scoresByStudent)
    .map(([rollStr, totalScore]) => ({
      rollNumber: parseInt(rollStr, 10),
      totalScore,
    }))
    .sort((a, b) => b.totalScore - a.totalScore);

  const maxScore = aggregated.length > 0 ? aggregated[0].totalScore : 1;

  return (
    <Container size="xs" px="md" py="xl">
      <Group gap="sm" mb="xl">
        <ThemeIcon size={42} radius="xl" variant="gradient" gradient={{ from: 'indigo.5', to: 'cyan.5' }}>
          <IconFlame size={24} stroke={2} />
        </ThemeIcon>
        <Box>
          <Title order={2} fw={800}>General Leaderboard</Title>
          <Text c="dimmed" size="sm">Overall most voted students across all categories.</Text>
        </Box>
      </Group>

      {aggregated.length === 0 ? (
        <Card padding="xl" withBorder={false} shadow="none" style={{ backgroundColor: 'var(--mantine-color-default)' }}>
          <Text c="dimmed" ta="center" size="sm">No votes recorded yet.</Text>
        </Card>
      ) : (
        <Stack gap="md">
          {aggregated.map((student, index) => {
            const studentName = getStudentName(student.rollNumber);
            const initials = getInitials(studentName);
            const profile = profiles?.find(p => p.roll_number === student.rollNumber);
            const barPercent = Math.round((student.totalScore / maxScore) * 100);
            const rank = index + 1;
            
            let rankColor = 'gray';
            if (rank === 1) rankColor = 'yellow.5';
            else if (rank === 2) rankColor = 'gray.4';
            else if (rank === 3) rankColor = 'orange.4';

            return (
              <Card
                key={student.rollNumber}
                padding="lg"
                withBorder={false}
                shadow="none"
                style={{ backgroundColor: 'var(--mantine-color-default)' }}
              >
                <Group justify="space-between" wrap="nowrap" mb="sm">
                  <Group gap="md" wrap="nowrap">
                    <Box style={{ position: 'relative' }}>
                      <Avatar size={48} radius="xl" color="indigo" src={profile?.avatar_url || null}>
                        {initials}
                      </Avatar>
                      {rank <= 3 && (
                        <ThemeIcon
                          size={22}
                          radius="xl"
                          variant="filled"
                          color={rankColor}
                          style={{
                            position: 'absolute',
                            bottom: -2,
                            right: -2,
                            border: '2px solid var(--mantine-color-body)',
                          }}
                        >
                          <Text fw={800} fz={10}>{rank}</Text>
                        </ThemeIcon>
                      )}
                    </Box>
                    <Box>
                      <Text fw={700} size="md" lh={1.2}>{studentName}</Text>
                      <Text c="dimmed" size="xs">Rank #{rank}</Text>
                    </Box>
                  </Group>
                  <Badge size="lg" variant="light" color="indigo" radius="xl" style={{ flexShrink: 0 }}>
                    {student.totalScore} pts
                  </Badge>
                </Group>
                
                <Box>
                  <Box
                    style={{
                      height: 8,
                      borderRadius: 999,
                      backgroundColor: 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-4))',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      style={{
                        height: '100%',
                        width: `${barPercent}%`,
                        borderRadius: 999,
                        background: 'linear-gradient(90deg, var(--mantine-color-indigo-4), var(--mantine-color-cyan-4))',
                      }}
                    />
                  </Box>
                </Box>
              </Card>
            );
          })}
        </Stack>
      )}
    </Container>
  );
}
