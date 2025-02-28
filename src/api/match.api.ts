import {
  ChildrenResponse,
  ChildResponse,
  Periodization,
  PeriodizationsResponse,
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

// /api/v1/users
// GET /search (query) search player
// GET /players -> coach
// GET /players/:id/parents
// GET /players/:id/matches
// GET /players/:id/periodizations
