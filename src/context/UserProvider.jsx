const { useState, useMemo, createContext, useContext } = require('react');

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);
	const valueOfUserContext = useMemo(() => ({ user, setUser }), [user]);

	return <UserContext.Provider value={valueOfUserContext}>{children}</UserContext.Provider>;
}

export function useUser() {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error('반드시 UserProvider 안에서 사용해야 합니다.');
	}

	const { user } = context;
	return user;
}

export function useSetUser() {
	const context = useContext(UserContext);

	if (!context) {
		throw new Error('반드시 UserProvider 안에서 사용해야 합니다.');
	}

	const { setUser } = context;
	return setUser;
}
