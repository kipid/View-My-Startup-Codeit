import { useCallback, useState } from 'react';

function useAsync(asyncFunc) {
	const [pending, setPending] = useState(false);
	const [error, setError] = useState(null);

	const wrappedAsyncFunc = useCallback(
		async (...args) => {
			try {
				setError(null);
				setPending(true);
				return await asyncFunc(...args);
			} catch (err) {
				// console.error(err); // TODO Del
				setError(err);
				return null; // undefined
			} finally {
				setPending(false);
			}
		},
		[asyncFunc],
	);

	return [pending, error, wrappedAsyncFunc, setError];
}

export default useAsync;
