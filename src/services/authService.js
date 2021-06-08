export const AuthService = {
     isAuthenticated: true,
    isLoggedIn() {
        return this.isAuthenticated && sessionStorage.getItem('authToken') ? true : false;
    },
    authenticate(token) {
        if (token) {
            this.isAuthenticated = true
            sessionStorage.setItem('authToken', token);

        }
    },
    setUserData(userData){
        if (this.isAuthenticated && userData) {
            sessionStorage.setItem('userData', JSON.stringify(userData));
        }
    },
    signOut() {
        this.isAuthenticated = false
        sessionStorage.clear();
    }
};
