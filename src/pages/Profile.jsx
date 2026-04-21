import React, { useState, useEffect, useRef } from 'react';
import {
  Container, Title, Text, Box, TextInput, Button, Avatar, Stack,
  Card, Group, Center, Loader, Badge, FileButton, Image,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCamera, IconLink, IconUpload, IconCheck, IconLogout } from '@tabler/icons-react';
import { useProfile, useUpdateProfile } from '../hooks/useVotes';
import { getStudentName, getInitials } from '../lib/studentNames';
import { supabase } from '../lib/supabaseClient';

/**
 * Profile page — view your info, set your avatar via file upload or URL.
 * Display name is always derived from the student list (not editable).
 */
export default function Profile() {
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const [avatarUrl, setAvatarUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState('file'); // 'file' | 'url'

  // Populate when profile loads
  useEffect(() => {
    if (profile) {
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  if (isLoading) {
    return <Center style={{ height: '60dvh' }}><Loader color="indigo" size="lg" /></Center>;
  }

  if (!profile) {
    return <Center style={{ height: '60dvh' }}><Text c="dimmed">Profile not found.</Text></Center>;
  }

  const displayName = getStudentName(profile.roll_number);
  const initials = getInitials(displayName);

  /**
   * Upload a file to Supabase Storage → get public URL → save to profile.
   */
  const handleFileUpload = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      notifications.show({ color: 'red', message: 'Please select an image file.' });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      notifications.show({ color: 'red', message: 'Image must be under 2MB.' });
      return;
    }

    setUploading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      // Upload to storage (upsert to replace existing)
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Add cache-buster so the browser shows the new image
      const freshUrl = `${publicUrl}?t=${Date.now()}`;

      // Save URL to profile
      await updateProfile.mutateAsync({ avatar_url: freshUrl });
      setAvatarUrl(freshUrl);
      notifications.show({ color: 'teal', message: 'Avatar updated!' });
    } catch (err) {
      notifications.show({ color: 'red', message: err.message || 'Upload failed.' });
    } finally {
      setUploading(false);
    }
  };

  /**
   * Save an avatar from a pasted URL.
   */
  const handleUrlSave = async () => {
    if (!avatarUrl.trim()) {
      notifications.show({ color: 'red', message: 'Please enter an image URL.' });
      return;
    }

    try {
      await updateProfile.mutateAsync({ avatar_url: avatarUrl.trim() });
      notifications.show({ color: 'teal', message: 'Avatar updated!' });
    } catch (err) {
      notifications.show({ color: 'red', message: err.message });
    }
  };

  return (
    <Container size="xs" px="md">

      {/* Avatar + Info Card */}
      <Card
        padding="xl"
        withBorder={false}
        shadow="none"
        mb="xl"
        style={{ backgroundColor: 'var(--mantine-color-default)' }}
      >
        <Stack align="center" gap="md">
          <Box style={{ position: 'relative' }}>
            <Avatar
              src={avatarUrl || null}
              alt={displayName}
              size={110}
              radius="xl"
              color="indigo"
              style={{
                border: '4px solid var(--mantine-color-indigo-2)',
              }}
            >
              {initials}
            </Avatar>
            {/* Camera overlay badge */}
            <Box
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: 'var(--mantine-color-indigo-6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid var(--mantine-color-body)',
              }}
            >
              <IconCamera size={14} color="#fff" />
            </Box>
          </Box>

          <Box ta="center">
            <Text fw={800} size="xl">{displayName}</Text>
            <Badge
              size="lg"
              variant="light"
              color="indigo"
              radius="xl"
              mt={4}
            >
              Roll {String(profile.roll_number).padStart(2, '0')}
            </Badge>
          </Box>
        </Stack>
      </Card>

      {/* ── Avatar upload mode selector ── */}
      <Group justify="center" gap="xs" mb="lg">
        <Button
          size="sm"
          variant={mode === 'file' ? 'filled' : 'light'}
          color="indigo"
          leftSection={<IconUpload size={16} />}
          onClick={() => setMode('file')}
        >
          Upload File
        </Button>
        <Button
          size="sm"
          variant={mode === 'url' ? 'filled' : 'light'}
          color="indigo"
          leftSection={<IconLink size={16} />}
          onClick={() => setMode('url')}
        >
          Paste URL
        </Button>
      </Group>

      {/* ── Mode: File Upload ── */}
      {mode === 'file' && (
        <Card padding="lg" withBorder={false} shadow="none" style={{ backgroundColor: 'var(--mantine-color-default)' }}>
          <Stack align="center" gap="md">
            <Text c="dimmed" size="sm" ta="center">
              Choose an image (max 2MB). JPG, PNG, or WebP.
            </Text>
            <FileButton
              accept="image/*"
              onChange={handleFileUpload}
            >
              {(props) => (
                <Button
                  {...props}
                  size="lg"
                  variant="gradient"
                  gradient={{ from: 'indigo', to: 'cyan' }}
                  leftSection={<IconUpload size={18} />}
                  loading={uploading}
                  fullWidth
                  styles={{ root: { height: 56 } }}
                >
                  {uploading ? 'Uploading...' : 'Choose Photo'}
                </Button>
              )}
            </FileButton>
          </Stack>
        </Card>
      )}

      {/* ── Mode: URL ── */}
      {mode === 'url' && (
        <Card padding="lg" withBorder={false} shadow="none" style={{ backgroundColor: 'var(--mantine-color-default)' }}>
          <Stack gap="md">
            <TextInput
              label="Image URL"
              placeholder="https://example.com/photo.jpg"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.currentTarget.value)}
              size="lg"
              leftSection={<IconLink size={18} />}
              styles={{
                input: { backgroundColor: 'var(--mantine-color-default-hover)', border: 'none' },
              }}
            />
            {/* Preview */}
            {avatarUrl && (
              <Center>
                <Avatar src={avatarUrl} size={80} radius="xl" color="indigo">
                  {initials}
                </Avatar>
              </Center>
            )}
            <Button
              fullWidth
              size="lg"
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
              leftSection={<IconCheck size={18} />}
              onClick={handleUrlSave}
              loading={updateProfile.isPending}
              styles={{ root: { height: 56 } }}
            >
              Save Avatar
            </Button>
          </Stack>
        </Card>
      )}

      <Box mt="xl" pt="xl">
        <Button
          fullWidth
          variant="light"
          color="red"
          size="md"
          leftSection={<IconLogout size={18} />}
          onClick={async () => await supabase.auth.signOut()}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}
