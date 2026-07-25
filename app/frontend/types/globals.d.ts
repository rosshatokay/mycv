import { ThemeMethods } from '@/lib/theme'
import type { FlashData, SharedProps } from '@/types'

declare module '@inertiajs/core' {
  export interface InertiaConfig {
    sharedPageProps: SharedProps
    flashDataType: FlashData
    errorValueType: string[]
  }
}

declare global {
	interface Window {
		Theme: ThemeMethods
	}
}
