
export class AppBase {
    constructor(private baseUrl: string, private mockUrl: string, private envName: string) {}
  
    getBaseUrl() {
      return this.baseUrl;
    }

    getMockUrl() {
        return this.mockUrl;
      }
  
    getEnvName() {
      return this.envName;
    }
  
  }
  