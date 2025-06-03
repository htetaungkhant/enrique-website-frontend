import inhouseApi from ".";
import { getInHouseToken } from "./utils";

const newsletter_route = "/newsletter";

export async function getNewsLetters(req) {
    const token = await getInHouseToken(req);

    try {
        const body = {
            page: req.body?.page || 1,
            limit: req.body?.limit || 10,
            sort: req.body?.sortByDate,
        }
        const response = await inhouseApi.post(`${newsletter_route}/all`, body, {
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

export async function getNewsLetterDetails(req) {
    const { id } = req.body;
    if (!id) return;

    try {
        const body = {
            page: req.body?.page || 1,
            limit: req.body?.limit || 10,
            sort: req.body?.sortByDate,
        }

        const { newsletters } = await getNewsLetters({ ...req, body });
        if (Array.isArray(newsletters) && newsletters?.length > 0) {
            const newsletter = newsletters.find(c => c.id === id);
            if (newsletter) {
                return newsletter;
            } else {
                console.error(`NewsLetter with id ${id} not found`);
                return null;
            }
        } else {
            console.error("No NewsLetters found");
            return null;
        }
    }
    catch (error) {
        console.error('Error fetching newsletter details:', error);
        return null;
    }
}

export async function createNewsLetter(req) {
    const token = await getInHouseToken(req);
    const body = {
        name: req.body?.name,
        email: req.body?.email,
    };

    try {
        const response = await inhouseApi.post(`${newsletter_route}/create`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201) {
            console.log("success create newsletter");
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

export async function updateNewsLetter(req) {
    const { id, name, email } = req.body;
    if (!id) return;
    const token = await getInHouseToken(req);
    const body = {
        id,
        name,
        email,
    };
    try {
        const response = await inhouseApi.put(`${newsletter_route}/update`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            console.log("success update newsletter");
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

export async function deleteNewsLetter(req) {
    const { id } = req.body;
    const token = await getInHouseToken(req);
    try {
        const response = await inhouseApi.delete(`${newsletter_route}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { id },
        });
        if (response.status === 200) {
            console.log("success delete newsletter");
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