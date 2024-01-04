import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to Galaxies.web.ts
// and on native platforms to Galaxies.ts
import GalaxiesModule from './src/GalaxiesModule';
import GalaxiesView from './src/GalaxiesView';
import { DataEventPayload, GalaxiesViewProps } from './src/Galaxies.types';

// Get the native constant value.
export const PI = GalaxiesModule.PI;

export function getDeviceInfo(): {deviceModel: string, appVersion: string} {
  return GalaxiesModule.getDeviceInfo();
}

export async function loadDummyUser() {
  return await GalaxiesModule.loadDummyUser();
} 

const emitter = new EventEmitter(GalaxiesModule ?? NativeModulesProxy.Galaxies);

export function addDataListener(listener: (event: DataEventPayload) => void): Subscription {
  return emitter.addListener<DataEventPayload>('gotData', listener);
}

export { GalaxiesView, GalaxiesViewProps, DataEventPayload };
