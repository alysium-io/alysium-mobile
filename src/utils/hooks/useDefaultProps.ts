import merge from 'lodash/merge';

const useDefaultProps = <T>(defaults: Partial<T>, props: T): T => {
	return merge({}, defaults, props);
};

export default useDefaultProps;
