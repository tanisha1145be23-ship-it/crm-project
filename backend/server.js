require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const axios = require("axios");

const Lead = require("./models/Lead");
const connectDB = require("./config/db");

const app = express();

// =======================
// Middleware
// =======================
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// =======================
// Health Check Route (IMPORTANT)
// =======================
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// =======================
// Database
// =======================
connectDB();

// =======================
// Routes
// =======================
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const leadRoutes = require("./routes/leadRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// =======================
// Telegram Bot Logic
// =======================
const userSessions = {};
let lastUpdateId = 0;

const TOKEN = process.env.TELEGRAM_TOKEN;

async function sendTelegramMessage(chatId, text) {
  try {
    const response = await axios.post(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        chat_id: chatId,
        text: text,
      }
    );

    console.log("Message sent");
    return response.data;
  } catch (error) {
    console.error("Telegram Error:", error.message);
  }
}

// Webhook
app.post("/telegram-webhook", async (req, res) => {
  res.sendStatus(200);

  try {
    const update = req.body;
    if (!update.message) return;

    const chatId = update.message.chat.id;
    const text = update.message.text;

    if (!userSessions[chatId]) {
      userSessions[chatId] = { step: "service" };
    }

    const session = userSessions[chatId];

    if (text === "/start") {
      userSessions[chatId] = { step: "service" };

      await sendTelegramMessage(
        chatId,
        "👋 Welcome!\n\n1️⃣ Social Media\n2️⃣ SEO\n3️⃣ Ads\n4️⃣ Website"
      );
      return;
    }

    if (session.step === "service") {
      session.service = text;
      session.step = "name";

      await sendTelegramMessage(chatId, "Enter your Full Name:");
      return;
    }

    if (session.step === "name") {
      session.name = text;
      session.step = "business";

      await sendTelegramMessage(chatId, "Enter Business Name:");
      return;
    }

    if (session.step === "business") {
      session.business = text;
      session.step = "phone";

      await sendTelegramMessage(chatId, "Enter Phone Number:");
      return;
    }

    if (session.step === "phone") {
      session.phone = text;
      session.step = "budget";

      await sendTelegramMessage(chatId, "Monthly Budget?");
      return;
    }

    if (session.step === "budget") {
      session.budget = text;

      try {
        const newLead = new Lead({
          name: session.name,
          email: "telegram_user",
          businessName: session.business,
          service: session.service,
          budget: Number(session.budget),
          source: "Telegram",
        });

        await newLead.save();
      } catch (err) {
        console.error("DB Error:", err.message);
      }

      await sendTelegramMessage(
        chatId,
        `🎉 Thanks ${session.name}! We will contact you soon.`
      );

      delete userSessions[chatId];
      return;
    }
  } catch (err) {
    console.error("Webhook error:", err.message);
  }
});

// =======================
// Start Server
// =======================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});