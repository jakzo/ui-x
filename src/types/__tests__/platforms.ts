import { expectType, TypeEqual } from 'ts-expect';

import { AnyChildren } from '../children';
import {
  ComponentOwnPlatforms,
  AnyPlatforms,
  CommonPlatforms,
  ChildPlatforms,
  ComponentPlatforms,
} from '../platforms';
import { UixComponent, UixComponentReal } from '../components';
import { UixElement } from '../elements';

// const createComponentMock = <ChildPlatforms extends { platform?: { [name: string]: any } }[]>(
//   childPlatforms: ChildPlatforms,
// ): UixComponent<>[] => childPlatforms as any;

const createComponentMock = <Component extends UixComponent<string, AnyChildren>>(
  component: Component,
) => component;

describe('ComponentPlatforms', () => {
  it('should return platforms common to component and children', () => {
    type Common = ComponentPlatforms<
      UixComponent<
        'a' | 'b' | 'd',
        [
          UixElement<any, [], 'a' | 'b' | 'c'>,
          UixElement<any, [], 'a' | 'b' | 'c'>,
          UixElement<any, [], 'a' | 'b' | 'c' | 'd'>,
        ]
      >
    >;
    expectType<TypeEqual<Common, 'a' | 'b'>>(true);
  });

  it('should return platforms common to children when there is no component platformData', () => {
    type Common = ComponentPlatforms<
      UixComponent<
        AnyPlatforms,
        [
          UixElement<any, [], 'a' | 'b' | 'c'>,
          UixElement<any, [], 'a' | 'b' | 'c'>,
          UixElement<any, [], 'a' | 'b' | 'c' | 'd'>,
        ]
      >
    >;
    expectType<TypeEqual<Common, 'a' | 'b' | 'c'>>(true);
  });

  it('should return component platforms when there are no children', () => {
    type Common = ComponentPlatforms<{
      platformData: {
        a: 0;
        b: 0;
        d: 0;
      };
      children: [];
    }>;
    expectType<TypeEqual<Common, 'a' | 'b' | 'd'>>(true);
  });
});

describe('ComponentOwnPlatforms', () => {
  it('should return the platform keys of a component', () => {
    const Component = createComponentMock({
      platformData: { web: 0, android: 0 },
      children: [],
    });
    type Platforms = ComponentOwnPlatforms<typeof Component>;
    expectType<TypeEqual<Platforms, 'web' | 'android'>>(true);
  });

  it('should return AnyPlatforms if there is no platform data', () => {
    const Component = createComponentMock({
      children: [],
    });
    type Platforms = ComponentOwnPlatforms<typeof Component>;
    expectType<TypeEqual<Platforms, AnyPlatforms>>(true);
  });

  it('should return never if there are no platforms', () => {
    const Component = createComponentMock({
      platformData: {},
      children: [],
    });
    type Platforms = ComponentOwnPlatforms<typeof Component>;
    expectType<TypeEqual<Platforms, never>>(true);
  });
});

describe('ChildPlatforms', () => {
  it('should return common platforms', () => {
    type Common = ChildPlatforms<
      [
        UixElement<any, [], 'a' | 'b' | 'c'>,
        UixElement<any, [], 'a' | 'b' | 'd'>,
        UixElement<any, [], 'a' | 'b' | 'c' | 'd'>,
      ]
    >;
    expectType<TypeEqual<Common, 'a' | 'b'>>(true);
  });

  it('should return never if there are no common platforms', () => {
    type Common = ChildPlatforms<[UixElement<any, [], 'a'>, UixElement<any, [], 'b'>]>;
    expectType<TypeEqual<Common, never>>(true);
  });

  it('should return AnyPlatforms if there are no items in the tuple', () => {
    type Common = ChildPlatforms<[]>;
    expectType<TypeEqual<Common, AnyPlatforms>>(true);
  });
});

describe('CommonPlatforms', () => {
  it('should return common strings in a tuple of string unions', () => {
    type Common = CommonPlatforms<['a' | 'b' | 'c', 'a' | 'b' | 'd', 'a' | 'b' | 'c' | 'd']>;
    expectType<TypeEqual<Common, 'a' | 'b'>>(true);
  });

  it('should return never if there are no common strings', () => {
    type Common = CommonPlatforms<['a', 'b']>;
    expectType<TypeEqual<Common, never>>(true);
  });

  it('should return AnyPlatforms if there are no items in the tuple', () => {
    type Common = CommonPlatforms<[]>;
    expectType<TypeEqual<Common, AnyPlatforms>>(true);
  });
});
