import { Store } from './interface';
export declare const createStore: (filePath: string, persistInterval?: number) => Promise<Store>;
