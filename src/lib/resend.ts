import { createServerFn } from "@tanstack/react-start";

async function sendOtpEmailInternal(toEmail: string, otpCode: string): Promise<{ success: boolean; error?: string }> {
  const RESEND_API_KEY = "re_t51z66gQ_DNsBjYgJQuM5TSoXHHQX3kXx";

  const directLoginUrl = `https://www.typtwo.com/login?email=${encodeURIComponent(toEmail)}`;

  const htmlContent = `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Typtwo Access Key</title>
    </head>
    <body style="background-color: #050505; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'SF Mono', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 32px 12px; margin: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
      
      <!-- Main Outer Container Box -->
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #090909; border: 1px solid #1f1f1f; border-collapse: collapse; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.8);">
        
        <!-- Top Neon Volt Accent Bar -->
        <tr>
          <td style="background-color: #ccff00; height: 5px; font-size: 0; line-height: 0;">&nbsp;</td>
        </tr>

        <!-- Header Banner Area -->
        <tr>
          <td style="padding: 32px 32px 20px 32px; background-color: #090909;">
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td align="left">
                  <span style="color: #ccff00; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; display: block; margin-bottom: 6px;">
                    ⚡ TYPTWO PORTAL ACCESS KEY
                  </span>
                  <h1 style="color: #ffffff; font-size: 22px; font-weight: 900; margin: 0; letter-spacing: 0.04em; text-transform: uppercase;">
                    Workspace Access Code
                  </h1>
                </td>
                <td align="right" valign="top">
                  <span style="background-color: #161616; border: 1px solid #282828; color: #ccff00; font-family: monospace; font-size: 9px; font-weight: 700; padding: 5px 9px; border-radius: 4px; text-transform: uppercase;">
                    SSL VERIFIED
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Subtle Line Divider -->
        <tr>
          <td style="padding: 0 32px;">
            <div style="border-bottom: 1px solid #1a1a1a;"></div>
          </td>
        </tr>

        <!-- Main Body Content -->
        <tr>
          <td style="padding: 24px 32px 32px 32px; background-color: #090909;">
            <p style="color: #a3a3a3; font-size: 13px; line-height: 1.6; margin: 0 0 24px 0;">
              Hello,<br /><br />
              Here is your single-use secret key to log in to <strong style="color: #ffffff;">Typtwo Operations Desk</strong>. Enter these 6 digits on your browser screen:
            </p>

            <!-- 6-DIGIT HERO PASSCODE BOX -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
              <tr>
                <td align="center" style="background-color: #000000; border: 2px solid #ccff00; border-radius: 6px; padding: 24px 16px;">
                  <span style="color: #666666; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.25em; text-transform: uppercase; display: block; margin-bottom: 10px;">
                    YOUR SECRET ACCESS PASSCODE
                  </span>
                  <span style="color: #ccff00; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 40px; font-weight: 900; letter-spacing: 0.35em; display: block; text-shadow: 0 0 16px rgba(204, 255, 0, 0.25);">
                    ${otpCode}
                  </span>
                </td>
              </tr>
            </table>

            <!-- Direct Action Button Link -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
              <tr>
                <td align="center">
                  <a href="${directLoginUrl}" target="_blank" style="background-color: #ccff00; color: #000000; display: block; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 11px; font-weight: 900; letter-spacing: 0.18em; text-transform: uppercase; text-decoration: none; padding: 15px 24px; border-radius: 4px; text-align: center; border: 1px solid #ccff00; box-shadow: 0 4px 14px rgba(204, 255, 0, 0.2);">
                    Open Typtwo Workspace Desk &rarr;
                  </a>
                </td>
              </tr>
            </table>

            <!-- Security Notice Banner -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #111111; border: 1px solid #202020; border-radius: 4px;">
              <tr>
                <td style="padding: 14px 16px;">
                  <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                      <td width="22" valign="top" style="color: #ccff00; font-size: 14px;">🔒</td>
                      <td style="color: #888888; font-size: 11px; line-height: 1.5; font-family: monospace;">
                        <strong style="color: #cccccc;">VALIDITY:</strong> Active for <span style="color: #ccff00;">10 minutes</span>. Never share this key with anyone.
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
          <td style="background-color: #050505; border-top: 1px solid #161616; padding: 24px 32px; text-align: center;">
            <p style="color: #555555; font-family: 'SF Mono', Monaco, Consolas, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 8px 0;">
              TYPTWO INC. &bull; CLIENT OPERATIONS CENTER
            </p>
            <p style="color: #444444; font-size: 10px; margin: 0 0 10px 0;">
              Automated security code sent to <span style="color: #777777;">${toEmail}</span>.
            </p>
            <p style="color: #444444; font-size: 10px; margin: 0;">
              <a href="https://www.typtwo.com" style="color: #888888; text-decoration: none; font-weight: bold;">www.typtwo.com</a> &bull; 
              <a href="mailto:support@typtwo.com" style="color: #888888; text-decoration: none; font-weight: bold;">support@typtwo.com</a>
            </p>
          </td>
        </tr>

      </table>

    </body>
    </html>
  `;

  // Priority Senders
  const sendOptions = [
    { from: "Typtwo Security <auth@typtwo.com>", to: [toEmail] },
    { from: "Typtwo Security <noreply@typtwo.com>", to: [toEmail] },
    { from: "Typtwo Security <onboarding@resend.dev>", to: [toEmail] }
  ];

  let lastErrorMsg = "Failed to dispatch email via Resend API";

  const plainTextContent = `Your Typtwo verification code is: ${otpCode}\n\nValid for 10 minutes.\nDirect workspace access: ${directLoginUrl}\n\nTyptwo Client Operations Center`;

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
          reply_to: "support@typtwo.com",
          subject: `Your Typtwo Security Code: ${otpCode}`,
          html: htmlContent,
          text: plainTextContent
        })
      });

      const data = await res.json();
      if (res.ok && data.id) {
        console.log(`Resend Email dispatched successfully via ${senderOpt.from}:`, data.id);
        return { success: true };
      }
      lastErrorMsg = data.message || lastErrorMsg;
      console.warn(`Resend attempt failed with sender ${senderOpt.from}:`, data);
    } catch (err: any) {
      lastErrorMsg = err.message || lastErrorMsg;
      console.error(`Resend fetch error with ${senderOpt.from}:`, err);
    }
  }

  return { success: false, error: lastErrorMsg };
}

export const sendOtpServerFn = createServerFn({ method: "POST" })
  .validator((data: { toEmail: string; otpCode: string }) => data)
  .handler(async ({ data }) => {
    return await sendOtpEmailInternal(data.toEmail, data.otpCode);
  });

export async function sendOtpEmail(toEmail: string, otpCode: string): Promise<{ success: boolean; error?: string }> {
  try {
    return await sendOtpServerFn({ data: { toEmail, otpCode } });
  } catch (err: any) {
    console.warn("ServerFn fallback to direct internal fetch:", err);
    return await sendOtpEmailInternal(toEmail, otpCode);
  }
}
