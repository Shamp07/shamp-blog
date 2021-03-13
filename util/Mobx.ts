import { observable, action } from 'mobx';

interface AnnotationType<T> {
  observables?: Array<keyof T>,
  actions?: Array<any>,
}

const makeAnnotations = <T>({
  observables, actions,
}: AnnotationType<T>) => {
  const annotations: any = {};
  if (observables) observables.forEach((data: any) => { annotations[data] = observable; });
  if (actions) actions.forEach((data: any) => { annotations[data] = action; });
  return annotations;
};

export default makeAnnotations;
