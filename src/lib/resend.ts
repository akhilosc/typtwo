export async function sendOtpEmail(toEmail: string, otpCode: string): Promise<{ success: boolean; error?: string }> {
  const RESEND_API_KEY = "re_t51z66gQ_DNsBjYgJQuM5TSoXHHQX3kXx";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Typtwo Security Passcode</title>
    </head>
    <body style="background-color: #050505; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'SF Mono', 'Roboto Mono', Menlo, monospace; padding: 40px 20px; margin: 0;">
      <div style="max-width: 500px; margin: 0 auto; background: #0c0c0c; border: 1px solid #222222; padding: 32px; border-radius: 4px;">
        <!-- Header / Logo -->
        <div style="border-bottom: 1px solid #1e1e1e; padding-bottom: 16px; margin-bottom: 24px;">
          <span style="color: #ccff00; font-size: 11px; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase;">// TYPTWO OPERATIONS DESK</span>
          <h2 style="color: #ffffff; font-size: 20px; font-weight: bold; margin: 8px 0 0 0; text-transform: uppercase;">Security Verification Code</h2>
        </div>

        <!-- Main Body -->
        <p style="color: #a3a3a3; font-size: 13px; line-height: 1.6; margin-bottom: 24px;">
          Use the 6-digit passcode below to complete your authentication and enter your corporate workspace dashboard:
        </p>

        <!-- 6-DIGIT OTP PASSCODE BOX -->
        <div style="background-color: #111111; border: 2px solid #ccff00; text-align: center; padding: 20px; border-radius: 4px; margin-bottom: 24px;">
          <span style="color: #666666; font-size: 10px; font-weight: bold; letter-spacing: 0.2em; display: block; margin-bottom: 8px;">YOUR 6-DIGIT PASSCODE</span>
          <span style="color: #ccff00; font-size: 32px; font-weight: bold; letter-spacing: 0.35em; font-family: monospace; display: block;">${otpCode}</span>
        </div>

        <p style="color: #666666; font-size: 11px; line-height: 1.5; margin-bottom: 24px;">
          This passcode is valid for 10 minutes. If you did not request this login code, please safely disregard this email.
        </p>

        <!-- Footer -->
        <div style="border-top: 1px solid #1e1e1e; padding-top: 16px; font-size: 10px; color: #555555; text-transform: uppercase; font-weight: bold;">
          TYPTWO INC. &bull; CLIENT OPERATIONS CENTER &bull; WWW.TYPTWO.COM
        </div>
      </div>
    </body>
    </html>
  `;

  // Try sending via custom domain or onboarding@resend.dev fallback
  const sendOptions = [
    { from: "Typtwo Operations <auth@typtwo.com>", to: [toEmail] },
    { from: "Typtwo Operations <onboarding@resend.dev>", to: [toEmail] }
  ];

  for (const senderOpt of sendOptions) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`
        },
        body: JSON.stringify({
          from: senderOpt.from,
          to: senderOpt.to,
          subject: `⚡ Your 6-Digit Security Passcode: ${otpCode}`,
          html: htmlContent
        })
      });

      const data = await res.json();
      if (res.ok && data.id) {
        console.log(`Resend Email dispatched successfully via ${senderOpt.from}:`, data.id);
        return { success: true };
      }
      console.warn(`Resend attempt failed with sender ${senderOpt.from}:`, data);
    } catch (err: any) {
      console.error(`Resend fetch error with ${senderOpt.from}:`, err);
    }
  }

  return { success: false, error: "Failed to dispatch email via Resend API" };
}
