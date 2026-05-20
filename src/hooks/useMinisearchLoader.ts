import { useCallback } from "react";
import { loadMinisearch } from "../lib/minisearch";

export const useMinisearchLoader = () => useCallback(loadMinisearch, []);
