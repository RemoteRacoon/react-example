import api from "shared/utils/api";

class LoginService {
  static rootPrefix = '/login';

  static async login(username: string, password: string): Promise<{ token: string, error: string }> {
    try {
      const { token } = await api.post({ url: this.rootPrefix, variables: { username, password } });

      if (token) {
        return { token, error: null }
      }
    } catch (err) {
      return { error: err.error, token: null }
    }
  }

}

export default LoginService;