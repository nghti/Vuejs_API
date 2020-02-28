export default {
  path: '/login',
  name: 'auth.login',
  component: () => import('../../views/auth/Login'),
  meta: {
    public: true,
    onlyWhenLoggedOut: true
  }
}
