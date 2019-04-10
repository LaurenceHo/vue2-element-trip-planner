import * as _ from 'lodash';

export class ApiService {
  perform(method: string, urlPath: string, requestBody: any, searchParams: any, formParams: any): any {
    const requestOptions: any = {};
    requestOptions.mode = 'cors';
    requestOptions.credentials = 'include';
    requestOptions.cache = 'no-cache';

    const headers = new Headers({ Accept: '*/*' });
    this.authHeader(headers);

    // Construct request body
    if (!_.isEmpty(formParams)) {
      // Form submit
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      const formData = new FormData();
      for (const formParam of Object.keys(formParams)) {
        formData.append(formParam, formParams[formParam]);
      }
      requestOptions.body = formData;
    } else if (!_.isEmpty(requestBody)) {
      // JSON content
      headers.append('Content-Type', 'application/json');
      requestOptions.body = JSON.stringify(requestBody);
    } else if (!_.isEmpty(searchParams)) {
      const urlSearchParams = new URLSearchParams();
      for (const param of Object.keys(searchParams)) {
        urlSearchParams.append(param, searchParams[param]);
      }
      requestOptions.body = urlSearchParams;
    }

    requestOptions.method = method.toUpperCase();
    requestOptions.headers = headers;

    return fetch(urlPath, requestOptions)
      .then(this.parseResponse)
      .then(data => data);
  }

  private parseResponse = (response: Response) => response.json();

  private authHeader(headers: Headers): any {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      return headers.append('Authorization', `Bearer ${user.token}`);
    } else {
      return headers;
    }
  }
}
