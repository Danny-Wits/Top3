import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabaseClient';

// ─── Auth ────────────────────────────────────────────────────────
export const useUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    },
  });
};

// ─── Profile ─────────────────────────────────────────────────────
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data;
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, avatar_url }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const updates = {};
      if (name !== undefined) updates.name = name;
      if (avatar_url !== undefined) updates.avatar_url = avatar_url;

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
};

// ─── All Profiles ──────────────────────────────────────────────────
export const useAllProfiles = () => {
  return useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('roll_number, avatar_url');
      if (error) throw error;
      return data;
    },
  });
};

// ─── Categories ──────────────────────────────────────────────────
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      if (error) throw error;

      // Group visually by parsing the types in order
      const typeOrder = { positive: 1, negative: 2, most_likely: 3 };
      return data.sort((a, b) => {
        if (typeOrder[a.type] !== typeOrder[b.type]) {
          return typeOrder[a.type] - typeOrder[b.type];
        }
        return a.id - b.id; // secondary sort by ID
      });
    },
  });
};

// ─── Vote Tracking ───────────────────────────────────────────────
export const useVoteTracking = () => {
  return useQuery({
    queryKey: ['vote_tracking'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vote_tracking')
        .select('category_id');
      if (error) throw error;
      // Return a flat array of completed category IDs
      return data.map(item => item.category_id);
    },
  });
};

// ─── Leaderboard ─────────────────────────────────────────────────
export const useLeaderboard = () => {
  return useQuery({
    queryKey: ['leaderboard'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_leaderboard');
      if (error) throw error;
      return data;
    },
  });
};

// ─── Cast Vote (via RPC) ────────────────────────────────────────
export const useCastVote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ categoryId, nominee1, nominee2, nominee3 }) => {
      const { data, error } = await supabase.rpc('cast_vote', {
        p_category_id: parseInt(categoryId, 10),
        p_nominee_1: parseInt(nominee1, 10),
        p_nominee_2: parseInt(nominee2, 10),
        p_nominee_3: parseInt(nominee3, 10),
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vote_tracking'] });
      queryClient.invalidateQueries({ queryKey: ['leaderboard'] });
    },
  });
};
