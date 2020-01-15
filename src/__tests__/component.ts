import { expectType, TypeEqual } from 'ts-expect';

import { $ } from '..';
import { createComponent } from '../component';
import { UixElement, AnyChildren, UixComponent, AnyProps } from '../types';

describe('createComponent', () => {
  it('infers correct types', () => {
    const WebAndroidEl: UixElement<
      UixComponent<'web' | 'android', AnyChildren, AnyProps>,
      []
    > = {} as any;
    const WebEl: UixElement<UixComponent<'web', AnyChildren, AnyProps>, []> = {} as any;

    const Comp1 = createComponent({ render: () => [WebEl] });
    expectType<TypeEqual<typeof Comp1.__types.platforms, 'web'>>(true);

    const Comp2 = createComponent({ render: () => [WebEl, WebAndroidEl] });
    expectType<TypeEqual<typeof Comp2.__types.platforms, 'web'>>(true);

    const Comp3 = createComponent({ render: () => [WebAndroidEl, WebAndroidEl] });
    expectType<TypeEqual<typeof Comp3.__types.platforms, 'web' | 'android'>>(true);

    const Comp4 = createComponent({ render: () => [$(Comp2), $(Comp3)] });
    expectType<TypeEqual<typeof Comp4.__types.platforms, 'web'>>(true);
  });
});

interface A<T> {
  t: [] extends T ? true : true;
}
interface B<T> {
  t: T;
}
interface C<T> {
  t: T;
}

const x: A<any[]> = { t: true };
const y: A<[]> = { t: true };

const any: any = {} as any;
((_: A<any[]>) => _)(any as A<[]>);
((_: B<any[]>) => _)(any as B<[]>);
((_: any[]) => _)(any as []);
((_: B<any[]>) => _)(any as C<[]>);
