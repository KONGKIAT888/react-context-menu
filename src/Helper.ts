export const uniqueId = (): string => `_${Math.random().toString(36).substr(2, 9)}`;

export const throttle = (func: (...args: any[]) => void, limit: number): () => void => {
    let lastFunc: ReturnType<typeof setTimeout>;
    let lastRan: number;
    return function (this: Window, ...args: any[]): void {
        const context = this;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
};