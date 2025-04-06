export interface ICodePushModule {
  execute: (filename: string) => Promise<void>;
}

export type BundleMeta = { deps: string[]; version: string; url?: string }
export type Meta = Record<string, BundleMeta>
