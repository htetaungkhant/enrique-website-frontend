import inhouseApi from ".";
import { getInHouseToken, getInHouseUserToken } from "./utils";

const support_route = "/support";

export async function getSupports(req) {
    const token = await getInHouseToken(req);

    try {
        const body = {
            page: req.body?.page || 1,
            limit: req.body?.limit || 10,
            sort: req.body?.sort,
        }
        const response = await inhouseApi.post(`${support_route}/list`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
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

export async function createSupport(req) {
    const { firstName, lastName, mobile, email, message } = req.body;
    if (!firstName || !lastName || !mobile || !email || !message) return;

    const token = await getInHouseUserToken(req);

    const body = {
        firstName,
        lastName,
        mobile,
        email,
        message,
    };

    try {
        const response = await inhouseApi.post(`${support_route}/create`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201) {
            console.log("success create support");
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

export async function updateSupport(req) {
    const { id, firstName, lastName, mobile, email, message } = req.body;
    if (!id) return;

    const token = await getInHouseToken(req);
    const body = {
        id,
        firstName,
        lastName,
        mobile,
        email,
        message,
    };

    try {
        const response = await inhouseApi.put(`${support_route}/update`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            console.log("success update support");
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

export async function deleteSupport(req) {
    const { id } = req.body;
    const token = await getInHouseToken(req);
    try {
        const response = await inhouseApi.delete(`${support_route}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { id },
        });
        if (response.status === 200) {
            console.log("success delete support");
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

export default {
    getSupports,
    createSupport,
    updateSupport,
    deleteSupport,
};