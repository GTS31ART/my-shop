const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { price } = JSON.parse(event.body);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: { name: 'Produit Exemple' },
        unit_amount: price
      },
      quantity: 1
    }],
    mode: 'payment',
    success_url: `${process.env.URL}/success.html`,
    cancel_url: `${process.env.URL}/cancel.html`
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ id: session.id })
  };
};
