import { PlatformWeb } from './renderer';
import { UixComponent } from '../../types';

declare global {
  interface UixPlatformData {
    web: {
      tagName: string;
    };
  }
}

const createDomComponent = (
  tagName: string,
): UixComponent<PlatformWeb, [], Record<string, string>> =>
  ({
    platformData: {
      web: {
        tagName,
      },
    },
    children: [],
  } as any);

export const Div = createDomComponent('div');
export const H1 = createDomComponent('h1');
export const P = createDomComponent('p');
