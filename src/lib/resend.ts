export async function sendOtpEmail(toEmail: string, otpCode: string): Promise<{ success: boolean; error?: string }> {
  const RESEND_API_KEY = "re_t51z66gQ_DNsBjYgJQuM5TSoXHHQX3kXx";

  const directLoginUrl = `https://www.typtwo.com/login?email=${encodeURIComponent(toEmail)}`;

  const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Typtwo Security Verification</title>
    </head>
    <body style="background-color: #050505; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'SF Mono', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 30px 10px; margin: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
      
      <!-- Container Box -->
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 540px; background-color: #0b0b0b; border: 1px solid #222222; border-collapse: collapse; margin: 0 auto; border-radius: 6px; overflow: hidden;">
        
        <!-- Top Neon Accent Line -->
        <tr>
          <td style="background-color: #ccff00; height: 4px; font-size: 0; line-height: 0;">&nbsp;</td>
        </tr>

        <!-- Header Padding Area -->
        <tr>
          <td style="padding: 32px 32px 20px 32px; background-color: #0b0b0b;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td align="left">
                  <span style="color: #ccff00; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; display: block; margin-bottom: 6px;">
                    // TYPTWO OPERATIONS DESK &bull; PORTAL ACCESS
                  </span>
                  <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0; tracking-tight: -0.02em; text-transform: uppercase; letter-spacing: 0.05em;">
                    Portal Verification Code
                  </h1>
                </td>
                <td align="right" valign="top">
                  <span style="background-color: #161616; border: 1px solid #2a2a2a; color: #888888; font-family: monospace; font-size: 9px; font-weight: 700; padding: 4px 8px; border-radius: 3px; text-transform: uppercase;">
                    AES-256 SSL
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="padding: 0 32px;">
            <div style="border-bottom: 1px solid #1a1a1a;"></div>
          </td>
        </tr>

        <!-- Main Body Content -->
        <tr>
          <td style="padding: 24px 32px; background-color: #0b0b0b;">
            <p style="color: #b0b0b0; font-size: 13px; line-height: 1.6; margin: 0 0 24px 0;">
              Hello,<br /><br />
              You requested access to your corporate workspace on <strong style="color: #ffffff;">Typtwo Client Desk</strong>. Please enter the 6-digit passcode below into your browser screen to complete authentication:
            </p>

            <!-- 6-DIGIT HERO PASSCODE BOX -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
              <tr>
                <td align="center" style="background-color: #000000; border: 2px solid #ccff00; border-radius: 4px; padding: 24px 16px;">
                  <span style="color: #666666; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; display: block; margin-bottom: 10px;">
                    YOUR 6-DIGIT SECURITY PASSCODE
                  </span>
                  <span style="color: #ccff00; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 38px; font-weight: 800; letter-spacing: 0.35em; display: block; text-shadow: 0 0 12px rgba(204, 255, 0, 0.2);">
                    ${otpCode}
                  </span>
                </td>
              </tr>
            </table>

            <!-- Direct Action Button Fallback -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
              <tr>
                <td align="center">
                  <a href="${directLoginUrl}" target="_blank" style="background-color: #ccff00; color: #000000; display: block; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; padding: 14px 24px; border-radius: 3px; text-align: center; border: 1px solid #ccff00;">
                    Verify & Open Workspace Dashboard &rarr;
                  </a>
                </td>
              </tr>
            </table>

            <!-- Security Callout Box -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #121212; border: 1px solid #222222; border-radius: 4px; margin-bottom: 10px;">
              <tr>
                <td style="padding: 14px 16px;">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="24" valign="top" style="color: #ccff00; font-size: 14px;">🔒</td>
                      <td style="color: #888888; font-size: 11px; line-height: 1.5; font-family: monospace;">
                        <strong style="color: #cccccc;">SECURITY NOTICE:</strong> This code is valid for <span style="color: #ccff00;">10 minutes</span>. Never share this code with anyone. Typtwo staff will never ask for your passcode.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background-color: #070707; border-top: 1px solid #1a1a1a; padding: 24px 32px; text-align: center;">
            <p style="color: #555555; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px 0;">
              TYPTWO INC. &bull; HIGH-PERFORMANCE DIGITAL OPERATIONS
            </p>
            <p style="color: #444444; font-size: 10px; margin: 0 0 12px 0;">
              Confidential automated security notification dispatched to <span style="color: #666666;">${toEmail}</span>.
            </p>
            <p style="color: #444444; font-size: 10px; margin: 0;">
              <a href="https://www.typtwo.com" style="color: #777777; text-decoration: none; font-weight: bold;">www.typtwo.com</a> &bull; 
              <a href="mailto:support@typtwo.com" style="color: #777777; text-decoration: none; font-weight: bold;">support@typtwo.com</a>
            </p>
          </td>
        </tr>

      </table>

    </body>
    </html>
  `;

  // Priority Senders
  const sendOptions = [
    { from: "Typtwo Operations <auth@typtwo.com>", to: [toEmail] },
    { from: "Typtwo Operations <noreply@typtwo.com>", to: [toEmail] },
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
