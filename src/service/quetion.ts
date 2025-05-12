import axios, { ResDataType } from "./ajax";

type SearchOption = {
  keyword: string;
  isStar: boolean;
  isDeleted: boolean;
  page: number;
  pageSize: number;
};

export async function getQuetionService(id: string): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.get(url)) as ResDataType;
  return data;
}

export async function createQuetionService(): Promise<ResDataType> {
  const url = "/api/question";
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

export async function getQuetionListService(
  opt: Partial<SearchOption> = {}
): Promise<ResDataType> {
  const url = "/api/question";
  const data = (await axios.get(url, { params: opt })) as ResDataType;
  return data;
}

export async function updateQuetionService(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.patch(url, { params: opt })) as ResDataType;
  return data;
}

export async function duplicateQuetionListService(
  id: string
): Promise<ResDataType> {
  const url = `/api/question/${id}`;
  const data = (await axios.post(url)) as ResDataType;
  return data;
}

export async function deleteQuetionListService(
  ids: string[]
): Promise<ResDataType> {
  const url = "/api/delete";
  const data = (await axios.delete(url)) as ResDataType;
  return data;
}
