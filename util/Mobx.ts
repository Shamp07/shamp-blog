import { observable, action } from 'mobx';

interface AnnotationType<T> {
  observables?: Array<keyof T>,
  actions?: Array<keyof T>,
}

type AnnotationsReturnType<T> = {
  [P in keyof T]?: typeof observable | typeof action;
};

const makeAnnotations = <T>({
  observables, actions,
}: AnnotationType<T>) => {
  const annotations: AnnotationsReturnType<T> = {};
  if (observables) observables.forEach((data) => { annotations[data] = observable; });
  if (actions) actions.forEach((data) => { annotations[data] = action; });
  return annotations;
};

export default makeAnnotations;
