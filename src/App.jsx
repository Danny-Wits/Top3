import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { AppShell, Loader, Center, Burger, Group, NavLink, Text, Image, useMantineColorScheme, useComputedColorScheme, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDeviceLaptop, IconFileText, IconShieldLock, IconHelp, IconSun, IconMoon, IconLogout, IconTrophy } from '@tabler/icons-react';
import { supabase } from './lib/supabaseClient';

import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import VotingInterface from './pages/VotingInterface.jsx';
import Leaderboard from './pages/Leaderboard.jsx';
import Profile from './pages/Profile.jsx';
import AboutDev from './pages/AboutDev.jsx';
import FAQ from './pages/FAQ.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import GeneralLeaderboard from './pages/GeneralLeaderboard.jsx';
import CategoryWinners from './pages/CategoryWinners.jsx';
import BottomNav from './components/BottomNav.jsx';

/**
 * Shell — wraps authenticated pages with AppShell + bottom nav.
 * Uses Mantine CSS vars for automatic dark/light adaptation.
 */
function Shell({ children }) {
  const [opened, { toggle, close }] = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleDark = () => {
    setColorScheme(computedColorScheme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    close();
    await supabase.auth.signOut();
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened, desktop: !opened } }}
      footer={{ height: 70 }}
      padding="md"
      styles={{
        main: {
          minHeight: '100dvh',
          paddingBottom: 90,
        },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} size="sm" />
            <Group gap="xs">
              <Image src="/logo.png" alt="Top 3" w={28} h={28} fit="contain" />
              <Text fw={900} size="xl">Top 3</Text>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="sm">
          Leaderboards
        </Text>
        <NavLink
          component={Link}
          to="/general-leaderboard"
          label="General Leaderboard"
          leftSection={<IconTrophy size={18} />}
          active={location.pathname === '/general-leaderboard'}
          onClick={close}
          variant="light"
          color="indigo"
        />
        <NavLink
          component={Link}
          to="/category-winners"
          label="Category Winners"
          leftSection={<IconTrophy size={18} />}
          active={location.pathname === '/category-winners'}
          onClick={close}
          variant="light"
          color="indigo"
        />

        <Divider my="sm" />

        <Text size="xs" fw={700} c="dimmed" tt="uppercase" mb="sm">
          Information
        </Text>
        <NavLink
          component={Link}
          to="/about"
          label="About the Dev"
          leftSection={<IconDeviceLaptop size={18} />}
          active={location.pathname === '/about'}
          onClick={close}
          variant="light"
          color="indigo"
        />
        <NavLink
          component={Link}
          to="/faq"
          label="FAQs"
          leftSection={<IconHelp size={18} />}
          active={location.pathname === '/faq'}
          onClick={close}
          variant="light"
          color="indigo"
        />
        <NavLink
          component={Link}
          to="/privacy"
          label="Privacy Policy"
          leftSection={<IconShieldLock size={18} />}
          active={location.pathname === '/privacy'}
          onClick={close}
          variant="light"
          color="indigo"
        />
        <NavLink
          component={Link}
          to="/tos"
          label="Terms of Service"
          leftSection={<IconFileText size={18} />}
          active={location.pathname === '/tos'}
          onClick={close}
          variant="light"
          color="indigo"
        />

        <Divider my="sm" />

        <NavLink
          label="Toggle Dark Mode"
          leftSection={computedColorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          onClick={() => {
            toggleDark();
            close();
          }}
          variant="light"
        />

        <NavLink
          label="Logout"
          leftSection={<IconLogout size={18} />}
          onClick={handleLogout}
          variant="light"
          color="red"
          c="red"
        />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer
        styles={{
          footer: {
            backgroundColor: 'light-dark(rgba(255,255,255,0.85), rgba(30,30,30,0.85))',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: 'none',
          },
        }}
      >
        <BottomNav />
      </AppShell.Footer>
    </AppShell>
  );
}

/**
 * ProtectedRoute — redirects unauthenticated users to /login.
 */
function ProtectedRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <Center style={{ height: '100dvh' }}>
        <Loader color="indigo" size="lg" />
      </Center>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Shell>{children}</Shell>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/categories"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/vote/:categoryId"
          element={<ProtectedRoute><VotingInterface /></ProtectedRoute>}
        />
        <Route
          path="/leaderboard"
          element={<ProtectedRoute><Leaderboard /></ProtectedRoute>}
        />
        <Route
          path="/general-leaderboard"
          element={<ProtectedRoute><GeneralLeaderboard /></ProtectedRoute>}
        />
        <Route
          path="/category-winners"
          element={<ProtectedRoute><CategoryWinners /></ProtectedRoute>}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute><Profile /></ProtectedRoute>}
        />
        <Route
          path="/about"
          element={<ProtectedRoute><AboutDev /></ProtectedRoute>}
        />
        <Route
          path="/faq"
          element={<ProtectedRoute><FAQ /></ProtectedRoute>}
        />
        <Route
          path="/privacy"
          element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>}
        />
        <Route
          path="/tos"
          element={<ProtectedRoute><TermsOfService /></ProtectedRoute>}
        />
        <Route path="*" element={<Navigate to="/categories" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
