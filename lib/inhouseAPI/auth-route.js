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

export async function signupUser(req) {
    try {
        const response = await inhouseApi.post("/auth/signup", req.body);
        // console.log("signup response", response);

        if (response.status === 201) {
            console.log("success signup user");
            return response.data;
        } else {
            console.error(`Unexpected response status: ${response.status}`);
            return null;
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                console.error('Bad request:', error.response.data);
                return error.response.data;
            } else {
                console.error(`Server returned ${error.response.status}:`, error.response.data);
                return error.response.data;
            }
        } else if (error.request) {
            console.error('No response from server:', error.request);
            return null;
        } else {
            console.error('Axios error:', error.message);
            return null;
        }
    }
}

export async function verifyEmail(req) {
    try {
        const response = await inhouseApi.post("/auth/verify-email", req.body);
        // console.log("verify-email response", response);

        if (response.status === 200) {
            console.log("success verify email");
            return response.data;
        } else {
            console.error(`Unexpected response status: ${response.status}`);
            return null;
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                console.error('Bad request:', error.response.data);
                return error.response.data;
            } else {
                console.error(`Server returned ${error.response.status}:`, error.response.data);
                return error.response.data;
            }
        } else if (error.request) {
            console.error('No response from server:', error.request);
            return null;
        } else {
            console.error('Axios error:', error.message);
            return null;
        }
    }
}

export async function forgotPassword(req) {
    try {
        const response = await inhouseApi.post("/auth/forgot-password", req.body);
        // console.log("forgot-password response", response);

        if (response.status === 200) {
            console.log("success forgot password");
            return response.data;
        } else {
            console.error(`Unexpected response status: ${response.status}`);
            return null;
        }
    }
    catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                console.error('Bad request:', error.response.data);
                return error.response.data;
            } else {
                console.error(`Server returned ${error.response.status}:`, error.response.data);
                return error.response.data;
            }
        }
        else if (error.request) {
            console.error('No response from server:', error.request);
            return null;
        } else {
            console.error('Axios error:', error.message);
            return null;
        }
    }
}

export async function resendOTP(req) {
    try {
        const response = await inhouseApi.post("/auth/resend-otp", req.body);
        // console.log("resend-otp response", response);

        if (response.status === 200) {
            console.log("success resend OTP");
            return response.data;
        } else {
            console.error(`Unexpected response status: ${response.status}`);
            return null;
        }
    }
    catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                console.error('Bad request:', error.response.data);
                return error.response.data;
            } else {
                console.error(`Server returned ${error.response.status}:`, error.response.data);
                return error.response.data;
            }
        } else if (error.request) {
            console.error('No response from server:', error.request);
            return null;
        } else {
            console.error('Axios error:', error.message);
            return null;
        }
    }
}

export async function refreshToken(refreshToken, userId) {
    try {
        const response = await inhouseApi.post("/auth/refresh-token", { refreshToken, userId });
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error("Failed to refresh token");
        }
    } catch (error) {
        if (error.response) {
            console.error(`Refresh token failed:`, error.response.data);
        } else if (error.request) {
            console.error('No response from server:', error.request);
        } else {
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

export async function updateUserPassword(req) {
    const { email, password, otp } = req.body;
    if (!email || !password || !otp) return;

    try {
        const response = await inhouseApi.put("/auth/update-password", {
            email,
            password,
            otp
        });

        if (response.status === 200) {
            console.log("success update user password");
            return response.data;
        } else {
            console.error(`Unexpected response status: ${response.status}`);
            return null;
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                console.error('Bad request:', error.response.data);
                return error.response.data;
            } else {
                console.error(`Server returned ${error.response.status}:`, error.response.data);
                return error.response.data;
            }
        } else if (error.request) {
            console.error('No response from server:', error.request);
            return null;
        } else {
            console.error('Axios error:', error.message);
            return null;
        }
    }
}

export async function getAllUsers(req) {
    const adminToken = await getInHouseToken(req);
    try {
        const body = {
            page: req.body?.page || 1,
            limit: req.body?.limit || 10,
            sort: req.body?.sort,
        };
        const response = await inhouseApi.post("/auth/users", body, {
            headers: {
                Authorization: `Bearer ${adminToken}`,
            },
        });
        if (response.status === 200) {
            console.log("success get all users");
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