import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (_,res)=>{
    res.json({
        status: 'ok',
        service: 'auth-service',
        version: '1.0.0',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    })
})

export default app;