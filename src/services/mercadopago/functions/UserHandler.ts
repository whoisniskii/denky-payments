import axios from 'axios';
import { MERCADOPAGO_API_BASE, USER_AGENT } from '../../../utils';
import { MercadoPagoClient } from './Client';

export class UserHandler {
  client: MercadoPagoClient;

  constructor(client: MercadoPagoClient) {
    this.client = client;
  }

  async createTestUser(accountToken: string, accountRegion = 'MLB' as UserRegion) {
    this.#makeUserValidation(accountToken, accountRegion);

    const data = await axios.post(`${MERCADOPAGO_API_BASE}/users/test_user?access_token=${accountToken}`, {
      headers: {
        Authorization: this.client.config.accessToken,
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
      },
      body: JSON.stringify({ site_id: accountRegion }),
    });

    return data;
  }

  async listUsers() {
    const { status, data } = await axios.get(`${MERCADOPAGO_API_BASE}/test_user/search?access_token=${this.client.config.accessToken}`);
    if (status < 200 || status >= 300) throw new Error(data.message);

    return data;
  }

  #makeUserValidation(accountToken: string, accountRegion: UserRegion) {
    if (!accountToken) throw new Error('You must provide the account token');
    if (!accountRegion) throw new Error('You must provide the account region');
  }
}
