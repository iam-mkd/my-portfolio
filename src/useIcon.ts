import { useSyncExternalStore } from 'react'
import { iconStore, type IconKey } from './logos'

/** A brand icon from the lazily loaded chunk, or undefined until it arrives. */
export function useIcon(key?: IconKey) {
  const icons = useSyncExternalStore(iconStore.subscribe, iconStore.get, () => null)
  return key && icons ? icons[key] : undefined
}
