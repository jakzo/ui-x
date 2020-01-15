import { UixElement, AnyComponent, AnyChildren } from '../../types';

export type PlatformWeb = 'web';

export const renderElement = (element: UixElement<AnyComponent, AnyChildren>) => {
  const el = document.createElement(element.component.platformData?.web.tagName as string);
  // for (const [key, value] of Object.entries(element.props)) {
  //   el.setAttribute(key, value);
  // }
  return el;
};

export const render = (container: Element, element: UixElement<AnyComponent, AnyChildren>) => {
  const domEl = renderElement(element);
  container.append(domEl);
};
