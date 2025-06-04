import inhouseApi from ".";
import { getInHouseToken, getInHouseUserToken } from "./utils";

export async function validateUserCredentials(email, password) {
    const requestData = {
        email,
        password,
    };

    try {
        const response = await inhouseApi.post("/auth/login", requestData);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        if (error.response) {
            // Server responded with a status outside the 2xx range
            if (error.response.status === 400) {
                console.error('Invalid credentials:', error.response.data);
            } else {
                console.error(`Server returned ${error.response.status}:`, error.response.data);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response from server:', error.request);
        } else {
            // Something went wrong setting up the request
            console.error('Axios error:', error.message);
        }
        return null;
    }
}

export async function validateAdminCredentials(email, password) {
    const requestData = {
        email,
        password,
    };

    try {
        const response = await inhouseApi.post("/auth/login", requestData);

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        if (error.response) {
            // Server responded with a status outside the 2xx range
            if (error.response.status === 400) {
                console.error('Invalid credentials:', error.response.data);
            } else {
                console.error(`Server returned ${error.response.status}:`, error.response.data);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response from server:', error.request);
        } else {
            // Something went wrong setting up the request
            console.error('Axios error:', error.message);
        }
        return null;
    }
}

export async function validateGoogleIdToken(idToken) {
    try {
        const response = await inhouseApi.post("/auth/login-via-google", { idToken });

        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (error) {
        if (error.response) {
            // Server responded with a status outside the 2xx range
            if (error.response.status === 400) {
                console.error('Invalid credentials:', error.response.data);
            } else {
                console.error(`Server returned ${error.response.status}:`, error.response.data);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response from server:', error.request);
        } else {
            // Something went wrong setting up the request
            console.error('Axios error:', error.message);
        }
        return null;
    }
}

export async function updateUser(req) {
    // const adminToken = await getInHouseToken(req);
    const userToken = await getInHouseUserToken(req);

    try {
        const response = await inhouseApi.put("/auth/update-user", req.body, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });

        if (response.status === 200) {
            console.log("success update user");
            return response.data;
        } else {
            console.error(`Unexpected response status: ${response.status}`);
            return null;
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                console.error('Bad request:', error.response.data);
            } else {
                console.error(`Server returned ${error.response.status}:`, error.response.data);
            }
        } else if (error.request) {
            console.error('No response from server:', error.request);
        } else {
            console.error('Axios error:', error.message);
        }
        return null;
    }

}