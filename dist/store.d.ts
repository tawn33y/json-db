import { Store } from './store.types';
export declare const createStore: (filePath: string, persistInterval?: number) => Promise<Store>;
