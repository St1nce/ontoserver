export const serverOrigin = "http://37.193.83.22:8081";

export class Sender {
  static async sendRequest(requestParams: {
    url: string;
    method: string;
    body?: any;
    headers?: any;
  }): Promise<{ status: number; message: string; object: any }> {
    const response = await fetch(requestParams.url, {
      method: requestParams.method,
      body: requestParams.body,
      headers: requestParams.headers,
    });

    let answer: any & { status: number; message: string } = {
      status: response.status,
      message: "",
      object: null,
    };

    answer = await response.json();
    if (answer === null || answer === undefined) {
      throw { status: 500, message: "Сервер не отвечает" };
    }

    if (!response.ok)
      throw { status: response.status, message: answer.message };

    return answer;
  }

  static async sendRequestWithAuthorization(requestParams: {
    url: string;
    method: string;
    body?: any;
    headers?: any;
  }): Promise<{ status: number; message: string; object: any }> {
    const response = await fetch(requestParams.url, {
      method: requestParams.method,
      body: requestParams.body,
      headers: {
        ...requestParams.headers,
        Authorization: "Bearer " + window.localStorage.getItem("auth"),
      },
    });

    let answer: any & { status: number; message: string } = {
      status: response.status,
      message: "",
      object: null,
    };

    answer = await response.json();
    if (answer === null || answer === undefined) {
      throw new Error("Ответ от сервера не пришел");
    }

    if (!response.ok) throw new Error(response.status + " - " + answer.message);

    return answer;
  }
}
