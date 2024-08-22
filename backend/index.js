import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './database/connectDB.js';
import authRoute from './routes/auth.routes.js';
import domainRoute from './routes/domain.routes.js';
import offerRoute from './routes/offer.routes.js';
import messageRoute from './routes/message.routes.js';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();
app.use(cookieParser());
// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/auth', authRoute );
app.use('/api/domains', domainRoute );
app.use('/api/offers', offerRoute );
app.use('/api/messages', messageRoute );

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port ', PORT);
    }
);