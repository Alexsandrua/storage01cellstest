import { MongoClient, ObjectId } from "mongodb";
import scheme from "./scheme";
import  "dotenv/config";


// Connection URL
// DB_URI=mongodb+srv://<username>:<password>@<clustername>.mongodb.net/
const url = process.env.CONNECT_MONGO_DB;
const client = new MongoClient(url);


async function connectMDB(data) {
  
  try {
    await client.connect();
    console.log("✅ Успішно підключено до MongoDB!");

    const db = client.db("post_bank");

    const one_name = db.collection("one_name");
    const dable_name = db.collection("dable_name");
    const pasword_name = db.collection("pasword_name");

    const lettersCollection = db.collection("letters");
    const timeCollection = db.collection("time_dell");
    
    // Очистимо колекцію перед початком тесту (необов'язково)
    await lettersCollection.deleteMany({});

    const insertLerrers = await lettersCollection.insertOne({fgg:data.letters.fgg});
    const insertLerrers0 = await lettersCollection.insertOne({dpp_dpp:data.letters.dpp_dpp});
    const insertLerrers1 = await lettersCollection.insertOne({dpp_P_dpp:data.letters.dpp_P_dpp});

    const allUsers = await lettersCollection.find({}).toArray();
    console.log("Всі користувачі в базі:", allUsers);

       // Перевірочний виклик (виведе список баз даних)
   // const adminDb = client.db().admin();
   // const dbs = await adminDb.listDatabases();
   // console.log("Доступні бази даних:", dbs.databases.map(d => d.Data));
  } catch (error) {
    console.error("❌ Помилка підключення:", error.message);
  } finally {
    await client.close();
  }
}

//connectMDB();

  export default function dataload(data) {
    connectMDB(scheme);
    return 'MongoDB';
  }