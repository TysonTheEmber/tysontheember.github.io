import React from 'react';
import Content from '@theme-original/Navbar/Content';
import ViewCounter from '@site/src/components/ViewCounter';
import type ContentType from '@theme/Navbar/Content';
import type {WrapperProps} from '@docusaurus/types';

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): JSX.Element {
  return (
    <>
      <Content {...props} />
      <ViewCounter />
    </>
  );
}
