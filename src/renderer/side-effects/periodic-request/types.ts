export interface IFork {
  stop(): void
}

export type CreateFork = (period: number) => IFork
