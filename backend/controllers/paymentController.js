// backend/controllers/paymentController.js
// PASTE YOUR SECRET KEY INSIDE THE QUOTES BELOW (e.g., "sk_test_51Mz...")
const stripe = require("stripe")(
  process.env
    .sk_test_51SttKxRFoOUzByp8RjSpJ62vUgUACYxXf0JVDrr5L33atm4AdKIhLQiu3MZKlj7Nras8AKMuyaukGGkt0zRE09W200BwNOAL7p,
);

const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe calculates in "cents/paisa" (multiply by 100)
      currency: "pkr", // Pakistan Rupee
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createPaymentIntent };
