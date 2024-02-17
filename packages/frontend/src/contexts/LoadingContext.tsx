import { createContext, useContext } from "react";

export type LoadingStateContextType = boolean | undefined;

export type LoadingDispatcherContextType = (loading: boolean) => void;;

export const LoadingStateContext = createContext<LoadingStateContextType>(undefined);

export const LoadingDispatcherContext = createContext<LoadingDispatcherContextType>(() => {});
    
export const useLoadingStateContext = () => {
    const context = useContext(LoadingStateContext)
    if (context === undefined) {
        throw new Error("useLoadingStateContext must be used within a LoadingProvider");
    }
    return context;
}

export const useLoadingDispatcherContext = () => {
    const context = useContext(LoadingDispatcherContext)
    if (!context) {
        throw new Error("useLoadingDispatcherContext must be used within a LoadingProvider");
    }
    return context;

}
