export interface AnalysisProvider {
  name: string;
  initialize: (config?: Record<string, unknown>) => Promise<void> | void;
  trackEvent: (eventName: string, payload?: Record<string, unknown>) => void;
}

let provider: AnalysisProvider | null = null;

export const setAnalysisProvider = (nextProvider: AnalysisProvider) => {
  provider = nextProvider;
};

export const trackAnalysisEvent = (eventName: string, payload?: Record<string, unknown>) => {
  provider?.trackEvent(eventName, payload);
};
