import { AxiosError } from "axios";

export const apiCatchGlobalHandler = (err: AxiosError) => console.log({ err });
