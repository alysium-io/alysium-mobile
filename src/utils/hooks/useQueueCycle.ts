import { useRef, useState } from 'react';

type QueueCycleConfig = {
	onComplete?: () => void;
};

interface IUseQueueCycle {
	addToQueue: (fn: Promise<void> | Promise<void>[]) => void;
	numItems: number;
}

const useQueueCycle = (config?: QueueCycleConfig): IUseQueueCycle => {
	const queue = useRef<Array<Promise<void>>>([]);
	const isProcessing = useRef(false);
	const [numItems, setNumItems] = useState(0);

	const addToQueue = (fn: Promise<void> | Promise<void>[]) => {
		queue.current.push(...(Array.isArray(fn) ? fn : [fn]));
		setNumItems(queue.current.length);
		processQueue();
	};

	const processQueue = async () => {
		if (isProcessing.current) return;
		isProcessing.current = true;

		try {
			while (queue.current.length > 0) {
				const fn = queue.current.shift();
				if (fn) {
					try {
						await fn;
					} catch (error) {
						console.error('Queue item failed:', error);
					}
				}
				setNumItems(queue.current.length);
			}
			config?.onComplete?.();
		} finally {
			isProcessing.current = false;
		}
	};

	return {
		addToQueue,
		numItems
	};
};

export default useQueueCycle;
