import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to Galaxies.web.ts
// and on native platforms to Galaxies.ts
import GalaxiesModule from './src/GalaxiesModule';
import GalaxiesView from './src/GalaxiesView';
import { ChangeEventPayload, GalaxiesViewProps } from './src/Galaxies.types';

// Get the native constant value.
export const PI = GalaxiesModule.PI;

export function getDeviceInfo(): {deviceModel: string, appVersion: string} {
  return GalaxiesModule.getDeviceInfo();
}

export async function setValueAsync(value: string) {
  return await GalaxiesModule.setValueAsync(value);
}

const emitter = new EventEmitter(GalaxiesModule ?? NativeModulesProxy.Galaxies);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { GalaxiesView, GalaxiesViewProps, ChangeEventPayload };
