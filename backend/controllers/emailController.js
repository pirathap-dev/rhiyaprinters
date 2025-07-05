// import { sendEmail } from '../utils/emailService.js';
// import { generateOTP, verifyOTP } from '../utils/otpStore.js';

// export const sendOtpController = async (req, res) => {
//   const { email } = req.body;
//   const otp = generateOTP(email);
//   const sent = await sendEmail(email, 'Your Rhiya Printers OTP', `Your OTP is: ${otp}`);
//   if (sent) {
//     res.json({ success: true, message: 'OTP sent' });
//   } else {
//     res.status(500).json({ success: false, message: 'Failed to send OTP' });
//   }
// };

// export const verifyOtpController = async (req, res) => {
//   const { email, otp, cart, shippingDetails } = req.body;

//   if (!verifyOTP(email, otp)) {
//     return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
//   }

//   //  Build readable order summaries
//   const orderItems = cart.map((item, index) => {
//     return `${index + 1}. ${item.name} (${item.color}, ${item.size}) x ${item.quantity} - LKR ${item.price * item.quantity}`;
//   }).join('\n');

//   const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   //  Email to Customer
//   const customerSubject = '🧾 Your Order is Confirmed – Rhiya Printers';
//   const customerText = `
// Hello ${shippingDetails.name},

// Thank you for your order! 🎉

// 🛒 Order Summary:
// ${orderItems}

// 💵 Total: LKR ${totalAmount}

// We'll contact you soon to confirm delivery details.

// - Rhiya Printers
//   `;

//   // Email to Owner
//   const ownerSubject = `📥 New Order from ${shippingDetails.name}`;
//   const ownerText = `
// New order received via RhiyaPrinters.ca

// 👤 Customer Info:
// Name: ${shippingDetails.name}
// Contact: ${shippingDetails.contact}
// Address: ${shippingDetails.house}, ${shippingDetails.street}, ${shippingDetails.city}, ${shippingDetails.postal}
// Email: ${email}

// 🛍️ Items:
// ${orderItems}

// 💰 Total Amount: LKR ${totalAmount}
//   `;

//   // Send emails
//   await sendEmail(email, customerSubject, customerText);
//   await sendEmail(process.env.OWNER_EMAIL, ownerSubject, ownerText);

//   res.json({ success: true, message: 'OTP verified, order confirmed, emails sent.' });
// };


import { sendEmail } from '../utils/emailService.js';
import { generateOTP, verifyOTP } from '../utils/otpStore.js';

export const sendOtpController = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP(email);
  const subject = '🔐 Verify Your Identity – Rhiya Printers';

  const plainText = `Your OTP is: ${otp}`;

  const htmlContent = `
                        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                          <div style="max-width: 500px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                            <div style="background-color: #002f6c; text-align: center; padding: 20px;">
                              <h1 style="
                                font-family: 'Courier New', Courier, monospace;
                                font-size: 28px;
                                font-weight: 900;
                                color: #ffffff;
                                letter-spacing: 4px;
                                text-shadow: 2px 2px #ccc;
                                margin: 0;">
                                Rhiya Printers
                              </h1>
                              <hr style="margin: 15px auto; width: 100%; border: 1px solid #ffffff;" />
                              <h2 style="color: white; margin: 10px 0;">Email Verification</h2>
                            </div>
                            <div style="padding: 30px; text-align: center;">
                              <p style="font-size: 16px;">Use the following OTP to verify your email address:</p>
                              <h1 style="font-size: 32px; letter-spacing: 4px; color: #002f6c; background-color: #f1f1f1; display: inline-block; padding: 10px 20px; border-radius: 6px; margin: 20px 0;">
                                ${otp}
                              </h1>
                              <p style="font-size: 14px; color: red; font-weight: bold;">⚠️ The OTP expires in 5 minutes.</p>
                              <p style="font-size: 14px; color: #777;">Do not share it with anyone.</p>

                            </div>
                            <div style="background-color: #f9f9f9; text-align: center; padding: 15px; font-size: 12px; color: #aaa;">
                              &copy; ${new Date().getFullYear()} Rhiya Printers – All rights reserved.
                            </div>
                          </div>
                        </div>
                      `;

  const sent = await sendEmail(email, subject, plainText, htmlContent);

  if (sent) {
    res.json({ success: true, message: 'OTP sent' });
  } else {
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
};

export const verifyOtpController = async (req, res) => {
  const { email, otp, cart, shippingDetails } = req.body;

  if (!verifyOTP(email, otp)) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  // Build readable order summaries
  const orderItemsHtml = cart.map((item, index) => {
    return `
          <tr>
            <td style="padding: 6px; border: 1px solid #ccc;">${index + 1}</td>
            <td style="padding: 6px; border: 1px solid #ccc;">${item.name}</td>
            <td style="padding: 6px; border: 1px solid #ccc;">${item.color}</td>
            <td style="padding: 6px; border: 1px solid #ccc;">${item.size}</td>
            <td style="padding: 6px; border: 1px solid #ccc;">${item.quantity}</td>
            <td style="padding: 6px; border: 1px solid #ccc;">CAD ${item.price * item.quantity}</td>
          </tr>
        `;
  }).join('');

  const ownerOrderItemsHtml = cart.map((item, index) => {
    return `
          <tr>
            <td style="padding: 6px; border: 1px solid #ccc;">${index + 1}</td>
            <td style="padding: 6px; border: 1px solid #ccc;">${item.name}</td>
            <td style="padding: 6px; border: 1px solid #ccc;">${item.color}</td>
            <td style="padding: 6px; border: 1px solid #ccc;">${item.size}</td>
            <td style="padding: 6px; border: 1px solid #ccc;">${item.quantity}</td>
            <td style="padding: 6px; border: 1px solid #ccc;">CAD ${item.price}</td>
            <td style="padding: 6px; border: 1px solid #ccc;">${item.image}</td>
          </tr>
        `;
  }).join('');

  const orderItems = cart.map((item, index) => {
    return `${index + 1}. ${item.name} (${item.color}, ${item.size}) x ${item.quantity} - CAD ${item.price * item.quantity}`;
  }).join('\n');


  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  // Plain Texts
  const customerSubject = '🧾 Your Order is Confirmed – Rhiya Printers';
  const customerText = `
                          Hello ${shippingDetails.name},

                          Thank you for your order! 🎉

                          🛒 Order Summary:
                          ${orderItems}

                          💵 Total: CAD ${totalAmount} (Shipment fees is not added yet).

                          We'll contact you soon to confirm delivery details and final amount including shipping fees.

                          - Rhiya Printers
                            `;

  const ownerSubject = `📥 New Order from ${shippingDetails.name}`;
  const ownerText = `
                          New order received via RhiyaPrinters.ca

                          👤 Customer Info:
                          Name: ${shippingDetails.name}
                          Contact: ${shippingDetails.contact}
                          Address: ${shippingDetails.house}, ${shippingDetails.street}, ${shippingDetails.city}, ${shippingDetails.province}, ${shippingDetails.postal}
                          Email: ${email}

                          🛍️ Items:
                          ${orderItems}

                          💰 Total Amount: CAD ${totalAmount}
                            `;

  // HTML Templates
  const customerHtml = `
                            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                              <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                
                                <div style="background-color: #002f6c; padding: 20px; text-align: center;">
                                  <h1 style="
                                    font-family: 'Courier New', Courier, monospace;
                                    font-size: 28px;
                                    font-weight: 900;
                                    color: #ffffff;
                                    letter-spacing: 4px;
                                    text-shadow: 2px 2px #ccc;
                                    margin: 0;">
                                    Rhiya Printers
                                  </h1>
                                  <hr style="margin: 15px auto; width: 100%; border: 1px solid #ffffff;" />
                                  <h2 style="color: #ffffff; margin-top: 10px;">Your Order is Confirmed 🎉</h2>
                                </div>
                                
                                <div style="padding: 20px;">
                                  <p>Hi <strong>${shippingDetails.name}</strong>,</p>
                                  <p>Thank you for ordering from <strong>Rhiya Printers</strong>!</p>

                                  <h3 style="margin-top: 30px;">🛒 Order Summary</h3>
                                  <!-- Fallback-friendly scroll container -->
                                  <table role="presentation" style="width: 100%; border-collapse: collapse; overflow-x: auto; display: block;">
                                    <thead style="background-color: #f0f0f0;">
                                      <tr>
                                        <th style="padding: 8px; border: 1px solid #ccc; min-width: 50px;">#</th>
                                        <th style="padding: 8px; border: 1px solid #ccc; min-width: 120px;">Product</th>
                                        <th style="padding: 8px; border: 1px solid #ccc; min-width: 80px;">Color</th>
                                        <th style="padding: 8px; border: 1px solid #ccc; min-width: 80px;">Size</th>
                                        <th style="padding: 8px; border: 1px solid #ccc; min-width: 50px;">Qty</th>
                                        <th style="padding: 8px; border: 1px solid #ccc; min-width: 100px;">Unit Price</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      ${orderItemsHtml}
                                    </tbody>
                                  </table>



                                  <p><strong>Total:</strong> CAD ${totalAmount} (Shipment fees is not added yet)</p>

                                  <p>📦 We will contact you soon to confirm delivery details and total amount with shipping fees.</p>

                                  <hr style="margin: 30px 0;" />

                                  <p style="font-size: 13px; color: #888;">This order was placed at <a href="https://rhiyaprinters.ca">RhiyaPrinters.ca</a></p>
                                </div>

                                <div style="background-color: #002f6c; color: white; text-align: center; padding: 15px;">
                                  <p style="margin: 0;">&copy; ${new Date().getFullYear()} Rhiya Printers. All rights reserved.</p>
                                </div>
                              </div>
                            </div>
                          `;

  const ownerHtml = `
                            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                              <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                                
                                <div style="background-color: #002f6c; padding: 20px; text-align: center;">
                                  <h1 style="
                                    font-family: 'Courier New', Courier, monospace;
                                    font-size: 28px;
                                    font-weight: 900;
                                    color: #ffffff;
                                    letter-spacing: 4px;
                                    text-shadow: 2px 2px #ccc;
                                    margin: 0;">
                                    Rhiya Printers
                                  </h1>
                                  <hr style="margin: 15px auto; width: 100%; border: 1px solid #ffffff;" />
                                  <h2 style="color: #ffffff;">📥 New Order Received</h2>
                                </div>
                                
                                <div style="padding: 20px;">
                                  <h3>👤 Customer Info</h3>
                                  <p>
                                    Name: ${shippingDetails.name}<br/>
                                    Contact: ${shippingDetails.contact}<br/>
                                    Address: ${shippingDetails.house}, ${shippingDetails.street}, ${shippingDetails.city}, ${shippingDetails.province}, ${shippingDetails.postal}<br/>
                                    Email: ${email}
                                  </p>

                                  <h3>🛍️ Order Items</h3>
                                  <!-- Fallback-friendly scroll container -->
                                  <table role="presentation" style="width: 100%; border-collapse: collapse; overflow-x: auto; display: block;">
                                    <thead style="background-color: #f0f0f0;">
                                      <tr>
                                        <th style="padding: 8px; border: 1px solid #ccc; min-width: 50px;">#</th>
                                        <th style="padding: 8px; border: 1px solid #ccc; min-width: 120px;">Product</th>
                                        <th style="padding: 8px; border: 1px solid #ccc; min-width: 80px;">Color</th>
                                        <th style="padding: 8px; border: 1px solid #ccc; min-width: 80px;">Size</th>
                                        <th style="padding: 8px; border: 1px solid #ccc; min-width: 50px;">Qty</th>
                                        <th style="padding: 8px; border: 1px solid #ccc; min-width: 100px;">Unit Price</th>
                                        <th style="padding: 8px; border: 1px solid #ccc; min-width: 100px;">Image</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      ${ownerOrderItemsHtml}
                                    </tbody>
                                  </table>

                                  <p><strong>Total:</strong> CAD ${totalAmount}</p>
                                </div>

                                <div style="background-color: #002f6c; color: white; text-align: center; padding: 15px;">
                                  <p style="margin: 0;">RhiyaPrinters.ca Admin Panel</p>
                                </div>
                              </div>
                            </div>
                          `;

  await sendEmail(email, customerSubject, customerText, customerHtml);
  await sendEmail(process.env.OWNER_EMAIL, ownerSubject, ownerText, ownerHtml);

  res.json({ success: true, message: 'OTP verified, order confirmed, emails sent.' });
};
