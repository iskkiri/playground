import { useState, useMemo } from 'react';
import { TiptapDispatchContext, TiptapStateContext } from './context/TiptapContext';

interface TiptapProviderProps {
  children: React.ReactNode;
}

export default function TiptapProvider({ children }: TiptapProviderProps) {
  const [isLinkFormOpen, setIsLinkFormOpen] = useState(false);

  const stateContextValue = useMemo(() => ({ isLinkFormOpen }), [isLinkFormOpen]);
  const dispatchContextValue = useMemo(() => ({ setIsLinkFormOpen }), [setIsLinkFormOpen]);

  return (
    <TiptapStateContext.Provider value={stateContextValue}>
      <TiptapDispatchContext.Provider value={dispatchContextValue}>
        {children}
      </TiptapDispatchContext.Provider>
    </TiptapStateContext.Provider>
  );
}
