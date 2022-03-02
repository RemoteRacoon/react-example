import { UserI } from "models/User";
import api, { ApiOptions } from "shared/utils/api";

class UserService {

  static rootPrefix = '/user';

  static async createUser(user: Partial<UserI>) {
    try {
      const response = await api.post({ url: this.rootPrefix, variables: user })

      if (response.success) {
        return response.user;
      }

    } catch (err) {
      return err.message;
    }
  }

  static async getUser(id?: Id): Promise<{ user: object, error: string }> {
    try {
      const { success, user } = await api.get({ url: id ? `${this.rootPrefix}/${id}` : this.rootPrefix });

      if (success) {
        return { user, error: null };
      }

    } catch (err) {
      return { error: err.message, user: null };
    }

  }

  static async updateUser(user: Partial<UserI>, id?: Id): Promise<{ success: boolean, error: string }> {

    try {
      const { success } = await api.put({
        url: id ? `/${this.rootPrefix}/${id}` : this.rootPrefix,
        variables: user
      });

      if (success) {
        return { success: true, error: null }
      }

    } catch (err) {
      return { error: err.message, success: false }
    }
  }

  static swr() {

    return {
      getUser(id?: Id, apiOptions?: ApiOptions) {
        const fetcher = (url: string) => api.get({ url: id ? `${url}/${id}` : url, ...apiOptions });

        return fetcher;
      }
    }
  }
}

export default UserService;
