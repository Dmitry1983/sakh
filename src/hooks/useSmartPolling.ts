import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

interface SmartPollingOptions {
  activeInterval?: number; // интервал если приложение активно
  backgroundInterval?: number; // интервал в фоне (0 = выкл)
}

export const useSmartPolling = ({
  activeInterval = 30000,
  backgroundInterval = 0,
}: SmartPollingOptions) => {
  const [pollingInterval, setPollingInterval] = useState(activeInterval);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // Слушаем состояние приложения
    const appSub = AppState.addEventListener(
      'change',
      (state: AppStateStatus) => {
        appState.current = state;
        setPollingInterval(
          state === 'active' ? activeInterval : backgroundInterval,
        );
      },
    );

    // Слушаем сеть — нет интернета → стоп polling
    const netSub = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setPollingInterval(0);
      } else if (appState.current === 'active') {
        setPollingInterval(activeInterval);
      }
    });

    return () => {
      appSub.remove();
      netSub();
    };
  }, [activeInterval, backgroundInterval]);

  return pollingInterval;
};
