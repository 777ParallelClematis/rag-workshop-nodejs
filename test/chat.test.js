/**
 * Jest test for the /api/chat route with mocked OpenAI response
 */

import express from 'express';
import bodyParser from 'body-parser';
import request from 'supertest';
import chatRoute from '../server/routes/chat.js';

// Mock OpenAI before importing anything that uses it
jest.mock('openai', () => {
  const mockCreateCompletion = jest.fn().mockResolvedValue({
    data: {
      choices: [{ text: "Mocked AI response." }]
    }
  });

  return {
    Configuration: jest.fn(),
    OpenAIApi: jest.fn().mockImplementation(() => ({
      createCompletion: mockCreateCompletion
    }))
  };
});

// Setup express app
const app = express();
app.use(bodyParser.json());
app.use('/api/chat', chatRoute);

describe('POST /api/chat', () => {
  test('should return a mocked AI response', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ query: "What is Node.js?" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('answer');
    expect(response.body.answer).toBe("Mocked AI response.");
  });

  test('should return 400 if query is missing', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
