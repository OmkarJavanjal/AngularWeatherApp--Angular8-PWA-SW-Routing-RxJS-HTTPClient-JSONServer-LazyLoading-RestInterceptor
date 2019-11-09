import { AppBase } from "./AppBase";

export class CityListURL extends AppBase {
  getUrls() {
    return {
      // getcities: this.getMockUrl() + 'courses',
      // logs: this.getMockUrl() + 'logs'
      getcitiesMock: { url: this.getMockUrl() + "cities", httpMethod: "GET" },
      getcities: {
        url:
          "https://us-central1-weatherapp-6ce0c.cloudfunctions.net/main/list?_limit=15&q=a",
        httpMethod: "GET"
      },
      logs: { url: this.getMockUrl() + "logs", httpMethod: "POST" }
    };
  }
}
