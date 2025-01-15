import { CreateTodoRequest, UpdateTodosRequest } from "../../api/Todo/types";

export type ImcompletedTodoType = {
  id: number;
  name: string;
  created_at: string;
  completed_at?: string;
  imcompleted_at: string;
  updateDetailStatus: string;
};

export type ImcompletedTodoWithEditMode = ImcompletedTodoType & {
  isEditMode: boolean;
};

export type CompletedTodoType = {
  id: number;
  name: string;
  created_at: string;
  completed_at: string;
  imcompleted_at: string;
  updateDetailStatus: string;
};

export type UpdateTodoParams = {
  params: UpdateTodosRequest;
  successMessage: string;
};

export type CreateTodoParams = {
  request: CreateTodoRequest;
  setInputError: React.Dispatch<React.SetStateAction<string>>;
};

export type UpdateTodoDetailParams = {
  request: UpdateTodosRequest;
  setInputError: React.Dispatch<React.SetStateAction<string>>;
};
