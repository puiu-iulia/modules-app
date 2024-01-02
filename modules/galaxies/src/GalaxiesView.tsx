import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { GalaxiesViewProps } from './Galaxies.types';

const NativeView: React.ComponentType<GalaxiesViewProps> =
  requireNativeViewManager('Galaxies');

export default function GalaxiesView(props: GalaxiesViewProps) {
  return <NativeView {...props} />;
}
