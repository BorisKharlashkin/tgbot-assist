import { GigaChat } from 'gigachat-node';
import config from 'config'

class gigachatClass {
  constructor() {
    this.client = new GigaChat(config.get('OPENAI_KEY'));
    this.initialized = false;
  }

  async init() {
    if (!this.initialized) {
      await this.client.createToken();
      this.initialized = true;
    }
  }

async chatgen(mess) {
    try {
      // const client = new GigaChat(config.get('OPENAI_KEY'));
      // await client.createToken();
      if (!this.initialized) {
        await this.init();
      }

      const response = await this.client.completion({
        model:"GigaChat",
        messages: mess,
        })
        return response.choices[0].message
      } catch (e) {
        console.log('Error while gpt chat', e.message)
      }
}

}
export const model = new gigachatClass()