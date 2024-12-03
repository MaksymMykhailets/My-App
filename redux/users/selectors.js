export const selectUsersState = (state) => state.users;
export const selectUser = (state) => state.users.user;
export const selectIsLoading = (state) => state.users.isLoading;
export const selectError = (state) => state.users.error;
export const selectIsAuthenticated = (state) => !!state.users.user;