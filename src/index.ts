import express, { Request, Response, NextFunction } from 'express';
import { connection } from './database/config.ts';
import routers from './apis/index.ts';
import errorHandler from './middleware/errorHandel.ts';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routers);

app.get('/api/check', (req: Request, res: Response) => {
    res.send('Thành công');
});

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, req, res, next);
});

(async () => {
    try {
        await connection.getConnection();
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed:', error);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})();
