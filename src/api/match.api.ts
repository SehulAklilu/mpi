import {
  ChildrenResponse,
  ChildResponse,
  CompetitionPayload,
  Goal,
  GoalPayload,
  Periodization,
  PeriodizationsResponse,
  PreparationPayload,
  TransitionPayload,
} from "@/types/children.type";
import axiosInstance from "./axios";
import { Match, MatchData } from "@/types/match.type";

export const getPlayers = async (type: string): Promise<ChildrenResponse> => {
  const response = await axiosInstance.get(`/api/v1/users/${type}`);
  return response.data;
};

export const createMatch = async (payload: any): Promise<any> => {
  const response = await axiosInstance.post(`/api/v1/matches`, payload);
  return response.data;
};

export const getMatch = async (matchId: string): Promise<Match> => {
  const response = await axiosInstance.get(`/api/v1/matches/${matchId}`);
  return response.data;
};

export const updateMatch = async ({
  matchId,
  payload,
}: {
  matchId: string;
  payload: any;
}): Promise<any> => {
  const response = await axiosInstance.patch(
    `/api/v1/matches/${matchId}`,
    payload
  );
  return response.data;
};

export const getMatches = async (): Promise<{ matches: Match[] }> => {
  const response = await axiosInstance.get(`/api/v1/matches`);
  return response.data;
};

export const search = async (type: string): Promise<ChildrenResponse> => {
  const response = await axiosInstance.get(`/api/v1/users/${type}`);
  return response.data;
};

export const getPlayer = async (playerId: string): Promise<ChildResponse> => {
  const response = await axiosInstance.get(`/api/v1/users/players/${playerId}`);
  return response.data;
};

export const getPlayerMatches = async (
  playerId: string
): Promise<{ matches: Match[] }> => {
  const response = await axiosInstance.get(
    `/api/v1/users/players/${playerId}/matches`
  );
  return response.data;
};

export const getPlayerMatchesDetail = async (
  playerId: string,
  matchId: string
): Promise<{ matches: Match[] }> => {
  const response = await axiosInstance.get(
    `/api/v1/users/players/${playerId}/matches/${matchId}`
  );
  return response.data;
};

export const getPlayerPeriodizations = async (
  playerId: string
): Promise<PeriodizationsResponse> => {
  const response = await axiosInstance.get(
    `/api/v1/users/players/${playerId}/periodizations`
  );
  return response.data;
};

export const createPlayerPeriodizations = async (
  playerId: string,
  payload: { endingDate: string; startingDate: string; timeZone: string }
): Promise<PeriodizationsResponse> => {
  const response = await axiosInstance.post(
    `/api/v1/periodizations/${playerId}`,
    payload
  );
  return response.data;
};

export const editPlayerPeriodizations = async (
  playerId: string,
  periodizationId: string,
  payload: { endingDate: string; startingDate: string; timeZone: string }
): Promise<PeriodizationsResponse> => {
  const response = await axiosInstance.patch(
    `/api/v1/periodizations/${playerId}/${periodizationId}`,
    payload
  );
  return response.data;
};

export const deletePlayerPeriodizations = async (
  playerId: string,
  periodizationId: string
): Promise<PeriodizationsResponse> => {
  const response = await axiosInstance.delete(
    `/api/v1/periodizations/${playerId}/${periodizationId}`
  );
  return response.data;
};

// Preparation

export const createPreparation = async (
  playerId: string,
  periodizationId: string,
  payload: PreparationPayload
): Promise<any> => {
  const response = await axiosInstance.post(
    `/api/v1/periodizations/${playerId}/${periodizationId}/preparation`,
    payload
  );
  return response.data;
};

export const editPreparation = async (
  playerId: string,
  periodizationId: string,
  payload: PreparationPayload
): Promise<any> => {
  const response = await axiosInstance.patch(
    `/api/v1/periodizations/${playerId}/${periodizationId}/preparation`,
    payload
  );
  return response.data;
};

export const deletePreparation = async (
  playerId: string,
  periodizationId: string,
  payload: PreparationPayload
): Promise<any> => {
  const response = await axiosInstance.delete(
    `/api/v1/periodizations/${playerId}/${periodizationId}/preparation`
  );
  return response.data;
};

// competition
export const createCompetition = async (
  playerId: string,
  periodizationId: string,
  payload: CompetitionPayload
): Promise<any> => {
  const response = await axiosInstance.post(
    `/api/v1/periodizations/${playerId}/${periodizationId}/competition`,
    payload
  );
  return response.data;
};

export const editCompetition = async (
  playerId: string,
  periodizationId: string,
  payload: CompetitionPayload
): Promise<any> => {
  const response = await axiosInstance.patch(
    `/api/v1/periodizations/${playerId}/${periodizationId}/competition`,
    payload
  );
  return response.data;
};

export const deleteCompetition = async (
  playerId: string,
  periodizationId: string,
  payload: CompetitionPayload
): Promise<any> => {
  const response = await axiosInstance.delete(
    `/api/v1/periodizations/${playerId}/${periodizationId}/competition`
  );
  return response.data;
};

// Transition
export const createTransition = async (
  playerId: string,
  periodizationId: string,
  payload: TransitionPayload
): Promise<any> => {
  const response = await axiosInstance.post(
    `/api/v1/periodizations/${playerId}/${periodizationId}/transition`,
    payload
  );
  return response.data;
};

export const editTransition = async (
  playerId: string,
  periodizationId: string,
  payload: TransitionPayload
): Promise<any> => {
  const response = await axiosInstance.patch(
    `/api/v1/periodizations/${playerId}/${periodizationId}/transition`,
    payload
  );
  return response.data;
};

export const deleteTransition = async (
  playerId: string,
  periodizationId: string,
  payload: TransitionPayload
): Promise<any> => {
  const response = await axiosInstance.delete(
    `/api/v1/periodizations/${playerId}/${periodizationId}/transition`
  );
  return response.data;
};

// player goad coatch crating
export const getPlayerGoal = async (playerId: string): Promise<any> => {
  const response = await axiosInstance.get(
    `/api/v1/users/playerGoal/${playerId}`
  );
  return response.data;
};

// player goad coatch crating
export const createPlayerGoal = async (
  playerId: string,
  payload: GoalPayload
): Promise<any> => {
  const response = await axiosInstance.post(
    `/api/v1/users/playerGoal/${playerId}`,
    payload
  );
  return response.data;
};

export const editPlayerGoal = async (
  playerId: string,
  goalId: string,
  payload: GoalPayload
): Promise<any> => {
  const response = await axiosInstance.patch(
    `/api/v1/users/playerGoal/${playerId}/${goalId}`,
    payload
  );
  return response.data;
};

// player goal player role

export const getGoals = async (): Promise<Goal[]> => {
  const response = await axiosInstance.get(`/api/v1/users/myGoals`);
  return response.data;
};

export const createGoal = async (
  coatchId: string,
  payload: GoalPayload
): Promise<any> => {
  const response = await axiosInstance.post(
    `/api/v1/users/myGoals/${coatchId}`,
    payload
  );
  return response.data;
};

export const editGoal = async (
  coatchId: string,
  goalId: string,
  payload: GoalPayload
): Promise<any> => {
  const response = await axiosInstance.patch(
    `/api/v1/users/myGoals/${coatchId}/${goalId}`,
    payload
  );
  return response.data;
};

export const delelteGoal = async (
  coatchId: string,
  goalId: string
): Promise<any> => {
  const response = await axiosInstance.delete(
    `/api/v1/users/myGoals/${coatchId}/${goalId}`
  );
  return response.data;
};

// get players classes -- coatch
export const getClassesCoatch = async (playerId: string): Promise<any[]> => {
  const response = await axiosInstance.get(
    `/api/v1/classes/player/${playerId},`
  );
  return response.data;
};

// get players classes -- coatch
export const getClassesParent = async (playerId: string): Promise<any[]> => {
  const response = await axiosInstance.get(
    `/api/v1/classes/child/${playerId},`
  );
  return response.data;
};

// invite a player
export const invitePlayer = async (payload: {
  email: string;
  relationship: "player" | "coach" | "player";
}): Promise<any> => {
  const response = await axiosInstance.post(`/api/v1/users/invite`, payload);
  return response.data;
};

export const todo = async (payload: {
  title: string;
  dueDate: string;
  timezone: string;
}): Promise<any> => {
  const response = await axiosInstance.post(`/api/v1/todos`, payload);
  return response.data;
};

export const latestTodo = async (payload: {
  title: string;
  dueDate: string;
  timezone: string;
}): Promise<any> => {
  const response = await axiosInstance.post(`/api/v1/latest`, payload);
  return response.data;
};
