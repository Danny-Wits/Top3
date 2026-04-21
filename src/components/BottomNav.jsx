import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Group, UnstyledButton, Text } from '@mantine/core';
import { IconChecklist, IconTrophy, IconUser } from '@tabler/icons-react';
import { supabase } from '../lib/supabaseClient';

/**
 * BottomNav — 4-tab persistent mobile navigation.
 * Vote | Leaderboard | Profile | Theme Toggle
 */
export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => location.pathname.startsWith(path);

  const tabs = [
    {
      label: 'Vote',
      icon: IconChecklist,
      action: () => navigate('/categories'),
      active: isActive('/categories') || isActive('/vote'),
    },
    {
      label: 'Leaderboard',
      icon: IconTrophy,
      action: () => navigate('/leaderboard'),
      active: isActive('/leaderboard'),
    },
    {
      label: 'Profile',
      icon: IconUser,
      action: () => navigate('/profile'),
      active: isActive('/profile'),
    },
  ];

  return (
    <Group justify="space-around" align="center" h="100%" px="xs">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <UnstyledButton
            key={tab.label}
            onClick={tab.action}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              flex: 1,
              padding: '8px 0',
            }}
          >
            <Icon
              size={22}
              stroke={1.8}
              color={tab.active ? 'var(--mantine-color-indigo-6)' : 'var(--mantine-color-dimmed)'}
            />
            <Text
              size="xs"
              fw={tab.active ? 700 : 500}
              c={tab.active ? 'indigo.6' : 'dimmed'}
            >
              {tab.label}
            </Text>
          </UnstyledButton>
        );
      })}
    </Group>
  );
}
