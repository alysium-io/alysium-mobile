import { ForwardedRef, MutableRefObject, useEffect, useRef } from 'react';

function useMergedRef<T>(
	forwardedRef: ForwardedRef<T>
): MutableRefObject<T | null> {
	const innerRef = useRef<T | null>(null);

	useEffect(() => {
		if (!forwardedRef) return;

		if (typeof forwardedRef === 'function') {
			forwardedRef(innerRef.current);
		} else {
			forwardedRef.current = innerRef.current;
		}
	}, [forwardedRef]);

	return innerRef;
}

export default useMergedRef;
