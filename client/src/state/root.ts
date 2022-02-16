import { useRef } from "react";
import { proxy, useSnapshot } from "valtio";

import { IChartData, IFeedbackItem, IProductItem } from "../../../shared/types";

interface RootState {
  product: IProductItem | null;
  comments: IFeedbackItem[];
  chart: IChartData | null;
}

const initialRootState: RootState = {
  product: null,
  comments: [],
  chart: null,
};

export const rootState = proxy(initialRootState);

export function useRootState() {
  const state = useRef(rootState);
  return {
    snapshot: useSnapshot(rootState),
    state,
  };
}
