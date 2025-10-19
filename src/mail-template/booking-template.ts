export function bookingNotificationTemplate(
  name: string,
  reason: string,
  link: string,
  linkLabel: string = "View Booking"
) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Booking Notification</title>
    </head>
    <body
      style="
        font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        background-color: #f5f7fa;
        margin: 0;
        padding: 0;
      "
    >
      <table
        align="center"
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);"
      >
        <tr>
          <td style="background: #2563eb; padding: 20px 30px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 600;">
              📢 Booking Notification
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding: 30px;">
            <p style="font-size: 16px; color: #111827;">
              Hi <strong>${name}</strong>,
            </p>

            <p style="font-size: 15px; color: #374151; line-height: 1.6;">
              You have a new update regarding your booking:
            </p>

            <div
              style="
                background: #f3f4f6;
                border-left: 4px solid #2563eb;
                padding: 12px 16px;
                margin: 16px 0;
                border-radius: 6px;
                color: #1f2937;
                font-size: 15px;
              "
            >
              ${reason}
            </div>

            <p style="font-size: 14px; color: #6b7280;">
              Please log in to your dashboard for more details or to take action.
            </p>

            <a
              href="${link}"
              style="
                display: inline-block;
                background: #2563eb;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 6px;
                font-size: 15px;
                font-weight: 500;
                margin-top: 12px;
              "
            >
              ${linkLabel}
            </a>

            <p style="margin-top: 32px; font-size: 13px; color: #9ca3af;">
              Thank you for using <strong>BookEasy</strong>.<br />
              This is an automated message — please do not reply.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
