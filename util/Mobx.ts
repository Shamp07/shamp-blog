import { observable, action, computed } from 'mobx';

interface AnnotationType<T> {
  observables?: Array<keyof T>,
  actions?: Array<keyof T>,
  computeds?: Array<keyof T>,
}

type AnnotationsReturnType<T> = {
  [P in keyof T]?: typeof observable | typeof action | typeof computed;
};

const makeAnnotations = <T>({
  observables, actions, computeds,
}: AnnotationType<T>) => {
  const annotations: AnnotationsReturnType<T> = {};
  if (observables) observables.forEach((data) => { annotations[data] = observable; });
  if (actions) actions.forEach((data) => { annotations[data] = action; });
  if (computeds) computeds.forEach((data) => { annotations[data] = computed; });
  return annotations;
};

export default makeAnnotations;
