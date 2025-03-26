import { IAPIResponse } from "./IAPIResponse";

export interface IReduxState<APIdata> {
  isLoading?: boolean;
  data?: IAPIResponse<APIdata>;
}
