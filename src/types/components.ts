import { AnyPlatforms, ChildPlatforms } from './platforms';
import { AnyChildren } from './children';
import { AnyProps } from './props';
import { UixElement } from './elements';

/** Component type without type tags. */
export interface UixComponentReal<
  OwnPlatforms extends AnyPlatforms,
  Children extends AnyChildren,
  Props extends AnyProps
> {
  /**
   * Platform-specific render data.
   * Used by the platform's renderer to generate components native to a specific platform.
   * If it is not set, it means the component works on any platform.
   */
  platformData?: {
    [K in OwnPlatforms]: K extends keyof UixPlatformData ? UixPlatformData[K] : any;
  };

  render: (props: Props) => Children & { '0': any }; // `& { '0': any }` forces result to be inferred as tuple
}

/**
 * Type tags used for caching types (to avoid recursive inference) and to allow users to easily
 * introspect generated types.
 */
export interface UixComponentTypeTags<
  Props extends AnyProps,
  Children extends AnyChildren,
  OwnPlatforms extends AnyPlatforms
> {
  __types: {
    ownPlatforms: OwnPlatforms;
    platforms: OwnPlatforms & ChildPlatforms<Children>;
    children: Children;
    props: Props;
  };
}

export interface UixComponent<
  OwnPlatforms extends AnyPlatforms,
  Children extends AnyChildren,
  Props extends AnyProps
>
  extends UixComponentTypeTags<Props, Children, OwnPlatforms>,
    UixComponentReal<OwnPlatforms, Children, Props> {}

export type RenderFunction<Props extends AnyProps> = (
  _props: Props,
  children: UixElement<AnyComponent, AnyChildren>,
) => UixElement<AnyComponent, AnyChildren>;

export type AnyComponent = UixComponent<AnyPlatforms, AnyChildren, AnyProps>;
