import axios from 'axios';
import { MERCADOPAGO_API_BASE, USER_AGENT } from '../../../utils';
import { MercadoPagoClient } from './Client';

export class PaymentsHandler {
  client: MercadoPagoClient;

  constructor(client: MercadoPagoClient) {
    this.client = client;
  }

  async makePayment(createPaymentOptions: CreatePaymentOptions) {
    this.#makePaymentValidation(createPaymentOptions);

    const { status, data } = await axios.post(`${MERCADOPAGO_API_BASE}/payments`, {
      body: createPaymentOptions,
      headers: {
        Authorization: `Bearer ${this.client.config.accessToken}`,
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
      },
    });
    if (status < 200 || status >= 300) throw new Error(data.message);

    return data;
  }

  // TODO: Implement searchPayments method
  /*
  async searchPayments() {
    const { status, data } = await axios.get(`${MERCADOPAGO_API_BASE}/payments/search`, {
      headers: {
        Authorization: `Bearer ${this.client.config.accessToken}`,
        'User-Agent': USER_AGENT,
      },
    });
    if (status < 200 || status >= 300) throw new Error(data.message);

    return data;
  }
  */

  async fetchPayment(paymentId: string) {
    if (!paymentId) throw new Error('You must provide the payment id');

    const { status, data } = await axios.get(`${MERCADOPAGO_API_BASE}/payments/${paymentId}`, {
      headers: {
        Authorization: `Bearer ${this.client.config.accessToken}`,
        'User-Agent': USER_AGENT,
      },
    });
    if (status < 200 || status >= 300) throw new Error(data.message);

    return data;
  }

  async updatePayment(updatePaymentOptions: UpdatePaymentOptions) {
    if (!updatePaymentOptions.id) throw new Error('You must provide the payment id');

    const { status, data } = await axios.put(`${MERCADOPAGO_API_BASE}/payments/${updatePaymentOptions.id}`, {
      headers: {
        Authorization: `Bearer ${this.client.config.accessToken}`,
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
      },
      body: updatePaymentOptions,
    });
    if (status < 200 || status >= 300) throw new Error(data.message);

    return data;
  }

  #makePaymentValidation(createPaymentOptions: CreatePaymentOptions) {
    if (!createPaymentOptions) throw new Error('You must provide the payment options');

    if (!createPaymentOptions.transactionAmount) throw new Error('You must provide the transaction amount');
    if (!createPaymentOptions.description) throw new Error('You must provide the description');

    if (!createPaymentOptions.payer) throw new Error('You must provide the payer');
    if (!createPaymentOptions.payer.email) throw new Error("You must provide the payer's email");
  }
}
