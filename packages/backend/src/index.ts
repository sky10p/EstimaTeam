import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Backend de EstimaTeam con TypeScript corriendo');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
