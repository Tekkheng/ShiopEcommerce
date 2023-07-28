import express from "express";
import cors from "cors";
import FileUpload from "express-fileupload";
import session from "express-session";
import dotenv from "dotenv";

import db from "./src/config/database.js";

// untuk database session agar ketika sudah login tetapi server mati tidak ke reset session login
// npm i connect-session-sequelize
import SequelizeStore from "connect-session-sequelize";

import UserRoute from "./src/routes/UserRoute.js";
import ProductRoute from "./src/routes/ProductRoute.js";
import ContactRoute from "./src/routes/ContactRoute.js";
import CartRoute from "./src/routes/CartRoute.js";

import AuthRoute from "./src/routes/AuthRoute.js";
import PaymentRoute from "./src/routes/PaymentRoute.js";

import bodyParser from "body-parser";

dotenv.config();

const Port = process.env.APP_PORT || 5000
const app = express();

// database session
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

app.use((req, res, next) => {
    // Izinkan akses dari domain 'https://ashiop.000webhostapp.com'
    // res.setHeader('Access-Control-Allow-Origin', 'https://ashiop.000webhostapp.com');

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    // Izinkan pengiriman kuki sesi (jika digunakan)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Izinkan metode HTTP tertentu untuk permintaan lintas domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Izinkan header tertentu untuk permintaan lintas domain
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Lanjutkan ke middleware berikutnya atau route
    next();
});

app.use(cors({
    // domain yang di izinkan untuk mengakses api ini
    origin: ['https://ashiop.000webhostapp.com','https://expensive-puce-sea-urchin.cyclic.app','http://localhost:5000','http://localhost:5173'],
    // agar frontend dapat melakukan request dengan mengirimkan key dan credential
    credentials: true,
}));

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        // httpOnly: true, // jika true akan memastikan cookie hanya dapat diakses melalui protokol HTTP dan tidak dapat diakses melalui JavaScript di sisi klien.
        secure: 'auto', // 'true' untuk htpps, false untuk 'http', auto untuk dibuat auto set berdasarkan http atau https
        // sameSite: 'none', // mengizinkan cookie dikirim dalam permintaan lintas situs (cross-site) dari klien ke server. jika Anda menggunakan HTTPS dan domain yang berbeda untuk frontend dan backend.
        // maxAge: 1000 * 60 * 60 * 48, // Cookie akan kadaluarsa setelah 48 jam (2 hari)
    },
}));


// auto generate table di database jika tidak ada table
// (async()=>{
//     await db.sync();
// })();

// app.use(cors());

// app.use(cors({
//     origin: ['*'],
//     credentials: true,
// }));

// app.use(cors({
//     origin: ['https://ashiop.000webhostapp.com','https://expensive-puce-sea-urchin.cyclic.app'],
//     credentials: true,
// }));

// membuat table sessions bila tidak ada tableny di database
// store.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());
app.use(FileUpload());

// membuat folder public images dapat di akses
app.use(express.static("public"));

app.use(UserRoute);
app.use('/product',ProductRoute);
app.use('/contact',ContactRoute);
app.use('/cart',CartRoute);
app.use(AuthRoute);
app.use('/api/payment',PaymentRoute);

app.listen(Port,()=>{
    console.log(`server berjalan pada port:${Port}`);
});