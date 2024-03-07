export declare function useGetState<T>(startingValue: T): readonly [T, (newState: T | ((oldValue: T) => T)) => void, () => T];
export default useGetState;
