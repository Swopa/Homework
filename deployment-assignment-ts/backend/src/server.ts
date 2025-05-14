// backend/src/server.ts
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT: number = 3001;

app.use(cors());
app.use(express.json());

interface DataPayload {
  data: string;
}

let latestData: string = "No data received yet.";

app.post('/api/create-answer', (req: Request, res: Response) => {
  console.log('Received data:', req.body);
  const payload = req.body as DataPayload;

  if (payload && typeof payload.data === 'string') {
    latestData = payload.data;
    res.status(200).json({ message: 'Data received successfully', data: latestData });
  } else {
    res.status(400).json({ message: 'Invalid data format. Expected { "data": "some-text" }' });
  }
});

app.get('/api/get-answer', (req: Request, res: Response) => {
  res.status(200).json({ data: latestData });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on http://0.0.0.0:${PORT}`);
});