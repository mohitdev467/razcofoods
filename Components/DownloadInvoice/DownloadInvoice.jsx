import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import moment from "moment";

const generateInvoiceHTML = (orderData) => {
  const address = orderData?.deliveryAddress || "";
  const discount = orderData?.discount || 0;

  let subtotal = 0;
  const productsHTML = orderData?.products
    ?.map((item) => {
      const itemTotal = item?.product?.price * item?.quantity;
      subtotal += itemTotal;

      return `
        <tr>
          <td>${item?.product?.productName || "Product"}</td>
          <td style="text-align:center;">${item.quantity}</td>
          <td style="text-align:right;">$${item?.product?.price}</td>
          <td style="text-align:right;">$${itemTotal?.toFixed(2)}</td>
        </tr>`;
    })
    .join("");

  const finalTotal = orderData?.price - discount;

  return `
  <html>
    <head>
      <style>
        body { font-family: Helvetica; padding: 20px; }
        h1 { text-align: right; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #37b054; color: white; }
        .totals td { font-weight: bold; }
        .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #999; }
      </style>
    </head>
    <body>
      <img src="https://razcofoods.net/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.ecea7dac.png&w=256&q=75" width="100" />
      <h1>Invoice</h1>

      <p><strong>Invoice No:</strong> ${orderData.orderId}</p>
      <p><strong>Date:</strong> ${moment(orderData.createdAt).format(
        "DD/MM/YYYY"
      )}</p>

      <h3>Invoice To:</h3>
      <p>${orderData.user.name}<br/>${orderData.user.email}<br/>${address}</p>

      <h3>Invoice From:</h3>
      <p>Razco Food<br/>coustmercare@razcofoods.net<br/>+1 559-562-5900</p>

      <table>
        <thead>
          <tr><th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
        </thead>
        <tbody>
          ${productsHTML}
        </tbody>
        <tfoot>
          <tr class="totals">
            <td colspan="3" style="text-align:right;">Subtotal</td>
            <td style="text-align:right;">$${subtotal.toFixed(2)}</td>
          </tr>
          <tr class="totals">
            <td colspan="3" style="text-align:right;">Discount</td>
            <td style="text-align:right;">$${discount.toFixed(2)}</td>
          </tr>
          <tr class="totals">
            <td colspan="3" style="text-align:right;">Total</td>
            <td style="text-align:right;">$${finalTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div class="footer">Thank you for your order!</div>
    </body>
  </html>
  `;
};

export const downloadInvoice = async (orderData) => {
  try {
    const html = generateInvoiceHTML(orderData);
    const { uri } = await Print.printToFileAsync({ html });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      alert("Sharing is not available on this device");
    }
  } catch (error) {
    console.error("Error generating invoice PDF:", error);
  }
};
