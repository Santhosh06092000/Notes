export interface IAPIResponse<APIData = any> {
  status?: boolean;
  status_code?: number;
  message?: string;
  data?: APIData;
}
