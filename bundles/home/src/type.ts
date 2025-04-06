import { BundleMeta, Meta } from '@code-push/code-push';

export type State = {
  meta: Meta | null
  metaArray: (BundleMeta & {name: string})[]
  isLoading: boolean
  isSuccess: boolean
}
