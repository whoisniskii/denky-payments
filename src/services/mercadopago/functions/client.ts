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
      throw new Error('You must provide an Object with the client credentials');
    }

    if (!config.accessToken && !config.clientId && !config.clientSecret) {
      throw new Error('You must provide a method of authentication (clientId and clientSecret or accessToken)');
    }

    if ((config.clientId !== undefined && config.clientSecret === undefined) || (config.clientId === undefined && config.clientSecret !== undefined)) {
      throw new Error('You must provide clientId and clientSecret');
    }
  }
}

// const deveDarErro = new MercadoPagoClient({ clientId: '', clientSecret: '', accessToken: '' });
// const deveDarErro2 = new MercadoPagoClient({ clientId: '', accessToken: '' });
// const deveFuncionar = new MercadoPagoClient({ clientId: '', clientSecret: '' });
// const deveFuncionar2 = new MercadoPagoClient({ accessToken: '' });
// console.log(deveDarErro, deveDarErro2, deveFuncionar, deveFuncionar2);
