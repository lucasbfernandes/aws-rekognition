import LocalStoragePersistence from '@core/utils/LocalStoragePersistence';

class AuthGuard {

  static innerPagesAuthentication(to, from, next) {
    const FBData = LocalStoragePersistence.get('FBLogin');
    if (FBData && FBData.status === 'connected') {
      next();
    } else {
      next({ path: '/login' });
    }
  }

  static loginPageAuthentication(to, from, next) {
    const FBData = LocalStoragePersistence.get('FBLogin');
    if (FBData && FBData.status === 'connected') {
      next({ path: '/home' });
    } else {
      next();
    }
  }
}

export default AuthGuard;
