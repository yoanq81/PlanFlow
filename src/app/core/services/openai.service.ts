import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface OpenAIResponse {
choices: {
  index: number;
  message: {
    content: string;
    role: string;
  },
  logprobs?: string;
 }[];
}

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  #apiUrl = 'https://api.openai.com/v1/chat/completions';
  #apiKey = environment.openAiApiKey;
  #http = inject(HttpClient);

  generateText(prompt: string): Observable<OpenAIResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.#apiKey}`,
    });
    const body = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 150,
      temperature: 0.7,
    };

    // const body = { gpt-4
    //      model: 'gpt-4o-mini',
    //      messages: [
    //        { role: 'system', content: 'You are a helpful assistant.' },
    //        { role: 'user', content: prompt },
    //      ],
    //      max_tokens: 100,
    //    };
    return this.#http.post<OpenAIResponse>(this.#apiUrl, body, { headers });
  }
}
