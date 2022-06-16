type ClientIdOptions = Pick<ClientConfig, 'clientId' | 'clientSecret'> & { accessToken?: undefined };
type ClientAccessTokenOptions = Pick<ClientConfig, 'accessToken'> & { clientId?: undefined; clientSecret?: undefined };

export type ClientOptions = ClientIdOptions | ClientAccessTokenOptions;

export interface ClientConfig {
  clientId: string;
  clientSecret: string;
  accessToken: string;
}

export class MercadoPagoClient {
  config: ClientOptions;

  constructor(config: ClientOptions) {
    this.#peformValidations(config);
    this.config = config;
  }

  #peformValidations(config: ClientOptions) {
    if (!config || typeof config !== 'object') {
      throw new Error('You must provide an object with the client credentials');
    }

    if (!config.accessToken && !config.clientId && !config.clientSecret) {
      throw new Error('You must provide a method of authentication (clientId and clientSecret or accessToken)');
    }

    if ((!config.clientId && !config.clientSecret === undefined) || (!config.clientId && !config.clientSecret)) {
      throw new Error('You must provide clientId and clientSecret');
    }
  }
}
