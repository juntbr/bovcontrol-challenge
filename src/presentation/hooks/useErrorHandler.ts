import {AccessDeniedError} from '@/domain/errors';

type CallBackType = (error: Error) => void;
type ResultType = CallBackType;

export const useErrorHandler = (callback: CallBackType): ResultType => {
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
    } else {
      callback(error);
    }
  };
};
