import { AxiosError } from "axios";

export type FailedQueueItem = {
  resolve: (value: string) => void;
  reject: (reason?: AxiosError) => void;
};
