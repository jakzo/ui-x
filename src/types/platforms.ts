import { AnyChildren } from './children';
import { AnyComponent, UixComponent } from './components';
import { AnyElement } from './elements';
import { OnlyString } from './util';
import { AnyProps } from './props';

export type AnyPlatforms = string;

/**
 * Union of platform keys that a component itself (not including children) supports.
 * Returns AnyPlatform (all strings) if the component is not tied to any specific platforms.
 */
export type ComponentOwnPlatforms<Component extends AnyComponent> = Component extends UixComponent<
  infer ComponentPlatforms,
  AnyChildren,
  AnyProps
>
  ? ComponentPlatforms
  : AnyPlatforms;

/**
 * Union of platform keys which all children support.
 * Returns AnyPlatform (all strings) if the children are not tied to any specific platforms.
 */
export type ChildPlatforms<Children extends AnyChildren> =
  // Empty tuple means all platforms are valid
  // TODO: PROBLEM HERE
  [] extends Children
    ? AnyPlatforms // Indexing by `number` gives an object with the properties common to all tuple items
    : OnlyString<keyof ChildrenTupleToPlatformMapTuple<Children>[number]>;
type ChildrenTupleToPlatformMapTuple<T extends AnyChildren> = {
  [K in keyof T]: T[K] extends AnyElement ? { [P in T[K]['__types']['platforms']]: any } : never;
};

// TODO: This does the same thing as ChildPlatforms. Can I consolidate them?
/**
 * Takes a tuple of platform key unions and returns a union of the platform keys which are common
 * to all unions in the tuple.
 */
export type CommonPlatforms<
  TupleOfPlatforms extends (AnyPlatforms | number | symbol)[] // extends all key types to make TS happy
> =
  // Empty tuple means all platforms are valid
  [] extends TupleOfPlatforms
    ? AnyPlatforms // Indexing by `number` gives an object with the properties common to all tuple items
    : OnlyString<keyof PlatformTupleToPlatformMapTuple<TupleOfPlatforms>[number]>;
/** Turns `['a', 'b' | 'c']` into `[{ a: any }, { b: any, c: any }]`. */
type PlatformTupleToPlatformMapTuple<T extends (string | number | symbol)[]> = {
  [K in keyof T]: T[K] extends string ? { [P in T[K]]: any } : never;
};
