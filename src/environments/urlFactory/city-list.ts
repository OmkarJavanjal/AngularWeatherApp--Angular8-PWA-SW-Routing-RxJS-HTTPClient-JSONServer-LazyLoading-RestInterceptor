import { AppBase } from "./AppBase";

export class CityListURL extends AppBase {
  getUrls() {
    return {
      // getcities: this.getMockUrl() + 'courses',
      // logs: this.getMockUrl() + 'logs'
      getcitiesMock: { url: this.getMockUrl() + "cities", httpMethod: "GET" },
      getcities: {
        url:
          "https://my-json-server.typicode.com/OmkarJavanjal/onlineFakeAPIAndDatabase/cityList",
        httpMethod: "GET"
      },
      logs: { url: this.getMockUrl() + "logs", httpMethod: "POST" }
    };
  }
}
