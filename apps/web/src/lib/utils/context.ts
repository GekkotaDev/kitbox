import { getContext, setContext } from "svelte";

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-object-type
interface Context<_> {}
type InjectionKey<T> = Context<T>;

export const provide = <T>(key: InjectionKey<T>, builder: () => T): T =>
	setContext(key, builder());

export const inject = <T>(key: InjectionKey<T>): T => getContext(key);
