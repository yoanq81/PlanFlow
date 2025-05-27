import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface OpenAIResponse {
  choices: {
    text: string;
    index: number;
    logprobs: any;
    finish_reason: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  #apiUrl = 'https://api.openai.com/v1/completions';
  #apiKey = environment.openAiApiKey;
  #http = inject(HttpClient);

  generateText(prompt: string): Observable<OpenAIResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.#apiKey}`,
    });
    const body = {
      model: 'gpt-4',
      prompt,
      max_tokens: 150,
      temperature: 0.7,
    };
    return this.#http.post<OpenAIResponse>(this.#apiUrl, body, { headers });
  }
}
