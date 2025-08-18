import inhouseApi from ".";
import { getInHouseUserToken } from "./utils";

const payment_route = "/payment";

export async function courseStripeCheckout(req) {
  const token = await getInHouseUserToken(req);
  try {
    const response = await inhouseApi.post(
      `${payment_route}/stripe/course`,
      req.body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Unexpected response status: ${response.status}`);
      return null;
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        console.error("Bad request:", error.response.data);
      } else {
        console.error(
          `Server returned ${error.response.status}:`,
          error.response.data
        );
      }
    } else if (error.request) {
      console.error("No response from server:", error.request);
    } else {
      console.error("Axios error:", error.message);
    }
    return null;
  }
}

export default {
  courseStripeCheckout,
};
