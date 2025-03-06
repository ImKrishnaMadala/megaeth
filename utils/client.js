export default class MegaethClient {
  /**
   * @param {Object} config 
   * @param {string} config.url 
   */
  constructor({ url = 'https://carrot.megaeth.com/rpc' } = {}) {
    this.url = url;
  }

  /**
   * 
   *
   * @param {string} method 
   * @param {Array} params 
   * @returns {Promise<any>}
   */
  async request(method, params = []) {
    const payload = {
      jsonrpc: '2.0',
      method,
      params,
      id: 1,
    };

    const response = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data.result;
  }

  async getChainId() {
    return this.request('eth_chainId');
  }

  async getBalance(address, blockTag = 'latest') {
    return this.request('eth_getBalance', [address, blockTag]);
  }

  async getTransactionByHash(txHash) {
    return this.request('eth_getTransactionByHash', [txHash]);
  }

  async getTransactionReceipt(txHash) {
    return this.request('eth_getTransactionReceipt', [txHash]);
  }
}

  