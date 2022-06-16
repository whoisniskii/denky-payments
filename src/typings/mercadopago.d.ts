interface PhoneData {
  // Código de área
  areaCode: string;
  // Número de telefono
  number: string;
}

interface AddressData {
  // Código postal
  zipCode: string;
  // Rua
  streetName: string;
  // Número da rua
  streetNumber: number;
}

// Informações de envio
interface ShipmentData {
  // Endereço do comprador
  receiverAddress: ReceiverAddressData;
}

// Endereço do comprador
interface ReceiverAddressData {
  // Código postal
  zipCode: string;
  // Província
  stateName: string;
  // Cidade
  cityName: string;
  // Rua
  streetName: string;
  // Número
  streetNumber: number;
  // Apartamento
  floor: string;
  // Departamento
  apartment: string;
}

interface PayerData {
  // Nome do comprador
  firstName?: string;
  // Apelido do comprador
  lastName?: string;
  // Telefone do comprador
  phone?: PayerPhoneData;
  // Endereço do comprador
  address?: PayerAddressData;
  // Data de cadastro do comprador em seu site
  registrationDate?: string;
}

interface ItemData {
  // Código de anúncio
  id: string;
  // Nome do item
  title: string;
  // Descrição do artigo
  description: string;
  // URL da imagem
  pictureUrl: string;
  // Categoria do item
  categoryId: string;
  // Quantidade do produto
  quantity: number;
  // Preço da unidade
  unitPrice: number;
}

type BarcodeType = 'UCC/EAN 128' | 'Code128C' | 'Code39';

interface BarcodeData {
  // Tipo de codificação
  type: BarcodeType;
  // Código de barras gerado
  content: string;
  // Largura do código de barras
  width: number;
  // Altura do código de barras
  height: number;
}

// Identificação pessoal. Este valor só retornará uma resposta quando status=approved, status=refunded o status=charged_back
interface IdentificationAdditionalInfo {
  // Tipo de identificação
  type: string;
  // Número de identificação
  number: string;
}

// Id do pagador
interface PayerAdditionalInfo {
  // Tipo de entidade do pagador (apenas para transferências bancárias)
  entityType?: 'individual' | 'association';
  // Tipo de identificação do pagador associado (se necessário o pagador é um cliente)
  type?: 'customer' | 'registered' | 'guest';
  // Identificação do pagador associado
  id?: string;
  // E-mail associado ao pagador. Este valor só retornará uma resposta quando status=approved, status=refunded o status=charged_back
  email: string;
  // Identificação pessoal. Este valor só retornará uma resposta quando status=approved, status=refunded o status=charged_back
  identification?: IdentificationAdditionalInfo;
  // Nome do pagador associado
  firstName?: string;
  // Sobrenome do pagador associado
  lastName?: string;
}

interface PaymentAdditionalInfo {
  // IP do qual provém o request (apenas para transferência bancária)
  ipAddress?: string;
  // Lista de itens a pagar
  items?: ItemData[];
  // Informação do comprador
  payer: PayerData;
  // Informações de envio
  shipments?: ShipmentData;
  // Informação de código de barra
  barcode?: BarcodeData;
}

interface CreatePaymentOptions {
  // Informações que podem melhorar a análise de prevenção de fraude e a taxa de conversão. Trata de enviar-nos toda a informação possível
  additionalInfo: PaymentAdditionalInfo;
  // Comissão coletadas pelo mercado ou pelo Mercado Pago
  applicationFee?: number;
  // Quando definido como TRUE, os pagamentos só podem ser aprovados ou rejeitados. Caso contrário, eles também podem resultar in_process.
  binaryMode?: boolean;
  // URL para a qual o Mercado Pago faz o redirecionamento final (apenas para transferência bancária)
  callbackUrl?: string;
  // Identificador da campanha de desconto
  campaignId?: string;
  // Determina se o pagamento deve ser capturado(true, default value), ou apenas reservado(false)
  capture?: boolean;
  // Valor do cupom de desconto
  couponAmount?: number;
  // Campanha de desconto com um código específico
  couponCode?: string;
  // Data de expiração do pagamento
  dateOfExpiration?: string;
  // Razão de pagamento ou título do item
  description: string;
  // Id do esquema de absorção do custo financeiro
  differentialPricingId?: number;
  // Identificação fornecida pelo vendedor em seu sistema
  externalReference?: string;
  // Número de parcelas selecionado
  installments?: number;
  // Id do emitente do meio de pagamento
  issuerId?: string;
  // O objeto de metadata mostra (se usado na integração) o JSON enviado pelo cliente com informações adicionais que precisam ser registradas no pagamento.
  metadata?: Record<string, any>;
  // URL de notificações disponível para receber notificações de eventos relacionados ao Pagamento.
  notificationUrl?: string;
  // Id do pagador
  payer?: PayerAdditionalInfo;
  // Id do meio de pagamento. Indica o ID do meio de pagamento selecionado para efetuar o pagamento.
  paymentMethodId?: string;
  // Descrição com a qual o pagamento aparecerá no resumo do cartão (ex. MERCADOPAGO)
  statementDescriptor?: string;
  // Identificador de token card. (Obrigatório para cartão de crédito)
  token?: string;
  // Preço do item
  transactionAmount: number;
}

interface UpdatePaymentOptions {
  // Identificador único de pagamento, gerado automaticamente pelo Mercado Pago
  id: string;
}

type UserRegion = 'MPE' | 'MLU' | 'MLA' | 'MLC' | 'MCO' | 'MLB' | 'MLM';
