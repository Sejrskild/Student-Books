import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Send email
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmailToUser = async (receiver, token, mail_type, password_code) => {
  switch (mail_type) {
    case "confirm_email":
      const confirmationLink = `http://localhost:3000/api/v1/users/confirm-email?token=${token}`;
      await transporter.sendMail({
        from: '"Student Books - Din bogportal 😋" <student-books@sejrskild.com>',
        to: receiver,
        subject: "Velkommen til Student Books - Verificer din email 📘🤩",
        html: `
            <p>Hej!</p>
            <p>Tak fordi du tilmeldte dig Student Books - din ultimative bogportal!</p>
            <p>For at komme i gang, skal du bekræfte din e-mailadresse ved at klikke på linket nedenfor:</p>
            <a href="${confirmationLink}" target="_blank" style="display: inline-block; background-color: #14384F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Bekræft din e-mail</a>
            <p>Hvis du ikke har oprettet en konto på Student Books, kan du ignorere denne besked.</p>
            <p>Vi ser frem til at byde dig velkommen på vores platform!</p>
            <p>Venlig hilsen,</p>
            <p>Student Books Team</p>
          `,
      });
      break;
    case "forgot_password_code":
      await transporter.sendMail({
        from: '"Student Books - Din bogportal 😊" <student-books@sejrskild.com>',
        to: receiver,
        subject: "🔑 Nulstil dit kodeord - Student Books 📘🥳",
        html: `
            <div style="background-color: #f7f7f7; padding: 20px; font-family: Arial, sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                    <img src="https://i.imgur.com/gz29rMT.png" alt="Student Books Logo" style="max-width: 150px; display: block; margin: 0 auto;">
                    
                    <h2 style="color: #4682A9; text-align: center;">🔓 Nulstilling af Kodeord</h2>
                    
                    <p>Hej!</p>
                    <p>Vi modtog en anmodning om at nulstille dit kodeord på Student Books. Din unikke kode til nulstilling er:</p>
                    
                    <div style="background-color: #4682A9; color: #ffffff; text-align: center; padding: 10px; font-size: 20px; border-radius: 5px; margin: 20px 0;">
                        <strong>${password_code}</strong>
                    </div>
                    
                    <p style="color: #ff0000;"><strong>Bemærk:</strong> Denne kode er kun gyldig i 5 minutter. Brug den hurtigt!</p>
                    
                    <p>Indtast denne kode i nulstillingsskærmen på vores websted for at fortsætte med at ændre dit kodeord. Hvis du ikke anmodede om en nulstilling, kan du trygt ignorere denne e-mail.</p>
                    
                    <p>Skulle du have spørgsmål eller bekymringer, er du altid velkommen til at kontakte os. 💬</p>
                    <p>📚 Glade læsninger og fortsat god dag!</p>
                    <p>Venlig hilsen,</p>
                    <p>Student Books Team 📘✨</p>
                </div>
            </div>
            `,
      });
  }
};
export default sendEmailToUser;
