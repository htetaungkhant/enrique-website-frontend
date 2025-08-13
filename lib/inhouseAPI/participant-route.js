import inhouseApi from ".";
import { getInHouseToken } from "./utils";

const participant_route = "/participant";

export async function getCeremonyParticipants(req) {
    const token = await getInHouseToken(req);

    try {
        const body = {
            page: req.body?.page || 1,
            limit: req.body?.limit || 10,
            sort: req.body?.sortByDate,
        }
        const response = await inhouseApi.post(`${participant_route}/list`, body, {
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

export async function createCeremonyParticipant(req) {
    const token = await getInHouseToken(req);

    const body = {
        firstName: req.body?.firstName,
        lastName: req.body?.lastName,
        mobile: req.body?.mobile,
        email: req.body?.email,
        country: req.body?.country,
        ceremonyId: req.body?.ceremonyId,
    };

    try {
        const response = await inhouseApi.post(`${participant_route}/create`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201) {
            console.log("success create ceremony participant");
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

export async function updateCeremonyParticipant(req) {
    const { id, firstName, lastName, email, mobile, country, ceremonyId } = req.body;
    if (!id) return;

    const token = await getInHouseToken(req);
    const body = {
        id,
        firstName,
        lastName,
        email,
        mobile,
        country,
        ceremonyId,
    };

    try {
        const response = await inhouseApi.put(`${participant_route}/update`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            console.log("success update ceremony participant");
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

export async function deleteCeremonyParticipant(req) {
    const { id } = req.body;
    const token = await getInHouseToken(req);

    try {
        const response = await inhouseApi.delete(`${participant_route}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { id },
        });
        if (response.status === 200) {
            console.log("success delete ceremony participant");
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