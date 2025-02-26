import { ChildrenResponse } from "@/types/children.type";
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
