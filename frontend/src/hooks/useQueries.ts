import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Exchange } from '../backend';

export function useGetHistory() {
  const { actor, isFetching } = useActor();

  return useQuery<Exchange[]>({
    queryKey: ['history'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitPrompt() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (prompt: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.submitPrompt(prompt);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });
}

export function useClearHistory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.clearHistory();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['history'] });
    },
  });
}
