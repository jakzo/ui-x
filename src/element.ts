import { UixElement, AnyChildren, AnyComponent } from './types';

export const createElement = <Component extends AnyComponent, Children extends AnyChildren>(
  component: Component,
  // Note that it's important that `children` is inferred as a tuple
  ...children: Children
): UixElement<Component, Children> => {
  const element = {
    component,
    // props,
    children,
  };
  return element as typeof element & { __types: any };
};
