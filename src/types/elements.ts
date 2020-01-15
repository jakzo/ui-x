import { AnyComponent } from './components';
import { AnyChildren } from './children';
import { ChildPlatforms } from './platforms';

export interface UixElement<Component extends AnyComponent, Children extends AnyChildren> {
  __types: {
    platforms: Component['__types']['platforms'] & ChildPlatforms<Children>;
  };

  component: Component;
  children: Children;
}

export type AnyElement = UixElement<AnyComponent, AnyChildren>;
