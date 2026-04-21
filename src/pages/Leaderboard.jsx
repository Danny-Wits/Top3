import React, { useState, useRef } from 'react';
import {
  Container, Title, Text, Center, Loader, Group, Box, ThemeIcon,
  Card, Stack, Badge, Avatar, ScrollArea, UnstyledButton, Progress, Image,
} from '@mantine/core';
import { useCategories, useLeaderboard } from '../hooks/useVotes';
import { IconTrophy, IconMedal, IconAward, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { getCategoryConfig } from '../lib/categoryConfig';
import { getStudentName, getInitials } from '../lib/studentNames';

/**
 * Leaderboard — swipeable category selector + bar chart visualization.
 * Horizontal pill selector at top, animated score bars below.
 */
export default function Leaderboard() {
  const { data: categories, isLoading: isCatLoading } = useCategories();
  const { data: leaderboard, isLoading: isLeadLoading } = useLeaderboard();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);

  // Touch swipe state
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  if (isCatLoading || isLeadLoading) {
    return <Center style={{ height: '60dvh' }}><Loader color="indigo" size="lg" /></Center>;
  }

  const activeCategory = categories?.[activeIndex];
  const totalCategories = categories?.length || 0;

  // Get nominees for the active category
  const nominees = leaderboard?.filter(
    l => l.out_category_id === activeCategory?.id
  ) || [];

  // Find the max score for bar scaling
  const maxScore = nominees.length > 0
    ? Math.max(...nominees.map(n => n.out_total_score))
    : 1;

  const config = activeCategory ? getCategoryConfig(activeCategory.name) : {};
  const CategoryIcon = config.icon;
  const isPositive = activeCategory?.type === 'positive';
  const accentColor = isPositive ? 'indigo' : 'pink';

  // Navigate between categories
  const goTo = (index) => {
    if (index >= 0 && index < totalCategories) {
      setActiveIndex(index);
    }
  };

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo(activeIndex + 1);   // swipe left = next
      else goTo(activeIndex - 1);             // swipe right = prev
    }
  };

  const rankConfig = {
    1: { icon: IconTrophy, color: 'yellow', label: '1st Place', barColor: 'yellow.5' },
    2: { icon: IconMedal, color: 'gray.6', label: '2nd Place', barColor: 'gray.4' },
    3: { icon: IconAward, color: 'orange', label: '3rd Place', barColor: 'orange.4' },
  };

  return (
    <Container size="xs" px="md">


      <Group gap="sm" mb="lg">
        <ThemeIcon size={36} radius="xl" variant="gradient" gradient={{ from: 'yellow.5', to: 'orange' }}>
          <IconTrophy size={20} stroke={2} />
        </ThemeIcon>
        <Box>
          <Title order={3} fw={700}>Leaderboard</Title>
          <Text c="dimmed" size="sm">Swipe to browse categories.</Text>
        </Box>
      </Group>

      {/* ── Horizontal scrollable category pills ── */}
      <ScrollArea scrollbarSize={0} offsetScrollbars type="never" mb="lg" viewportRef={scrollRef}>
        <Group gap={8} wrap="nowrap" pb={4}>
          {categories?.map((cat, i) => {
            const catConfig = getCategoryConfig(cat.name);
            const CatIcon = catConfig.icon;
            const isActive = i === activeIndex;
            const catColor = cat.type === 'positive' ? 'indigo' : 'pink';

            return (
              <UnstyledButton
                key={cat.id}
                onClick={() => setActiveIndex(i)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 999,
                  backgroundColor: isActive
                    ? `var(--mantine-color-${catColor}-6)`
                    : 'var(--mantine-color-default)',
                  color: isActive ? '#fff' : 'var(--mantine-color-text)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 13,
                  whiteSpace: 'nowrap',
                  transition: 'all 150ms ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <CatIcon size={16} stroke={1.8} />
                {cat.name}
              </UnstyledButton>
            );
          })}
        </Group>
      </ScrollArea>

      {/* ── Active category header ── */}
      <Card
        padding="lg"
        withBorder={false}
        shadow="none"
        mb="md"
        style={{
          backgroundColor: isPositive
            ? 'var(--mantine-color-indigo-light)'
            : 'var(--mantine-color-pink-light)',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Group justify="space-between" align="center">
          <UnstyledButton
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            style={{ opacity: activeIndex === 0 ? 0.3 : 1, padding: 4 }}
          >
            <IconChevronLeft size={22} />
          </UnstyledButton>

          <Stack align="center" gap={4}>
            <ThemeIcon size={52} radius="xl" variant="light" color={accentColor}>
              {CategoryIcon && <CategoryIcon size={26} stroke={1.8} />}
            </ThemeIcon>
            <Text fw={800} size="lg" ta="center">{activeCategory?.name}</Text>
            <Text c="dimmed" size="xs" ta="center">{config.description}</Text>
            <Badge size="xs" variant="light" color={accentColor}>
              {activeIndex + 1} / {totalCategories}
            </Badge>
          </Stack>

          <UnstyledButton
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === totalCategories - 1}
            style={{ opacity: activeIndex === totalCategories - 1 ? 0.3 : 1, padding: 4 }}
          >
            <IconChevronRight size={22} />
          </UnstyledButton>
        </Group>
      </Card>

      {/* ── Score bars / results ── */}
      <Box
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {nominees.length === 0 ? (
          <Card padding="xl" withBorder={false} shadow="none" style={{ backgroundColor: 'var(--mantine-color-default)' }}>
            <Text c="dimmed" ta="center" size="sm" py="lg">
              No votes yet. Be the first to vote!
            </Text>
          </Card>
        ) : (
          <Stack gap="md">
            {nominees.map((nominee) => {
              const rank = rankConfig[nominee.out_position] || rankConfig[3];
              const RankIcon = rank.icon;
              const studentName = getStudentName(nominee.out_nominee_roll_number);
              const initials = getInitials(studentName);
              const barPercent = Math.round((nominee.out_total_score / maxScore) * 100);

              return (
                <Card
                  key={nominee.out_nominee_roll_number}
                  padding="lg"
                  withBorder={false}
                  shadow="none"
                  style={{ backgroundColor: 'var(--mantine-color-default)' }}
                >
                  {/* Rank + Name row */}
                  <Group justify="space-between" wrap="nowrap" mb="sm">
                    <Group gap="md" wrap="nowrap">
                      <Box style={{ position: 'relative' }}>
                        <Avatar size={48} radius="xl" color={accentColor}>
                          {initials}
                        </Avatar>
                        {/* Rank badge overlapping avatar bottom-right */}
                        <ThemeIcon
                          size={22}
                          radius="xl"
                          variant="filled"
                          color={rank.color}
                          style={{
                            position: 'absolute',
                            bottom: -2,
                            right: -2,
                            border: '2px solid var(--mantine-color-body)',
                          }}
                        >
                          <Text fw={800} fz={10}>{nominee.out_position}</Text>
                        </ThemeIcon>
                      </Box>
                      <Box>
                        <Text fw={700} size="md" lh={1.2}>{studentName}</Text>
                        <Text c="dimmed" size="xs">
                          Roll {String(nominee.out_nominee_roll_number).padStart(2, '0')}
                        </Text>
                      </Box>
                    </Group>
                    <Badge size="lg" variant="light" color={accentColor} radius="xl">
                      {nominee.out_total_score} pts
                    </Badge>
                  </Group>

                  {/* Score bar */}
                  <Box>
                    <Box
                      style={{
                        height: 12,
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
                          background: isPositive
                            ? 'linear-gradient(90deg, var(--mantine-color-indigo-4), var(--mantine-color-cyan-4))'
                            : 'linear-gradient(90deg, var(--mantine-color-pink-4), var(--mantine-color-grape-4))',
                          transition: 'width 600ms ease',
                        }}
                      />
                    </Box>
                  </Box>
                </Card>
              );
            })}
          </Stack>
        )}
      </Box>
    </Container>
  );
}
