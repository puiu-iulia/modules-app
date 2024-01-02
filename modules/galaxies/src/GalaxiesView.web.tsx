import * as React from 'react';

import { GalaxiesViewProps } from './Galaxies.types';

export default function GalaxiesView(props: GalaxiesViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
