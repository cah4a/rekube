import { useState } from "react";
import { useAssert } from "./root";

/**
 * Wrapper around `useState` hook that returns a placeholder until the state is set.
 * This allows usage of state without need to check if it's set.
 * If the state is not set until the final render, it will throw an error.
 */
export function useLateState<T>(
    placeholder: T,
    description = "state is not set"
) {
    const [state, setState] = useState<T>(placeholder);

    useAssert(state !== placeholder, new Error(description));

    return [state, setState] as const;
}
