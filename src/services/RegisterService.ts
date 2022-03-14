import { UserI } from "models";
import { RegisterFormI } from "schemas";
import api from "shared/utils/api";
class RegisterService {
  static rootPrefix = '/register';

  static async register(user: Partial<RegisterFormI>): Promise<{ user: UserI, code: string, error: string | object }> {

    try {
      const response = await api.post({ url: this.rootPrefix, variables: user });

      if (response.success) {
        return { user: response.user, code: response.test_code, error: null };
      }

    } catch (err) {
      return { error: err, user: null, code: null };
    }
  }

  /**
   * Resend confirmation code
   * @param phone string
   */
  static async resend(phone: string): Promise<{ code: number, error: string }> {
    const url = `${this.rootPrefix}/${phone}/resent`;

    try {
      const { success, code } = await api.post({ url });

      if (success) {
        return { code, error: null };
      }

    } catch (err) {
      return { error: err.message, code: null };
    }
  }

  /**
   * Confirm registration via phone number
   * @param phone string
   */
  static async confirm(phone: string, code: string): Promise<{ success: boolean, error: string }> {
    const url = `${this.rootPrefix}/${phone}/confirm`;

    try {
      const { success } = await api.post({ url, variables: { code } });

      if (success) {
        return { success: true, error: null };
      }

    } catch (err) {
      return { error: err.message, success: false };
    }
  }
}

export default RegisterService;