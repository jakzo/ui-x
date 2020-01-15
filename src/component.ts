import { AnyChildren, UixComponent, AnyPlatforms, UixComponentReal, AnyProps } from './types';

// export const createComponent = <
//   Platforms extends AnyPlatforms,
//   Children extends AnyChildren,
//   Props extends AnyProps = {}
// >(
//   options: UixComponent<Platforms, Children> | RenderFunction<Platforms, Props>,
// ): UixComponent<Platforms, Children> =>
//   typeof options === 'function'
//     ? {
//         //  render: options
//         children: [],
//       }
//     : options;

export const createComponent = <
  OwnPlatforms extends AnyPlatforms,
  Children extends AnyChildren,
  Props extends AnyProps
>(
  options: UixComponentReal<OwnPlatforms, Children, Props>,
): UixComponent<OwnPlatforms, Children, Props> => options as any;
