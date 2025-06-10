import inhouseApi from ".";
import { getInHouseToken, getInHouseUserToken } from "./utils";

const survey_route = "/survey";

export async function getSurveys(req) {
    try {
        const response = await inhouseApi.get(`${survey_route}/get`);

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

export async function getSurveyDetails(req) {
    const { id } = req.body;
    if (!id) return;

    try {
        const surveys = await getSurveys(req);
        if (Array.isArray(surveys) && surveys?.length > 0) {
            const survey = surveys.find(c => c.id === id);
            if (survey) {
                return survey;
            } else {
                console.error(`Survey with id ${id} not found`);
                return null;
            }
        } else {
            console.error("No Surveys found");
            return null;
        }
    }
    catch (error) {
        console.error('Error fetching survey details:', error);
        return null;
    }
}

export async function getSurveysByUser(req) {
    const token = await getInHouseUserToken(req);
    try {
        const response = await inhouseApi.get(`${survey_route}/get-by-user`, {
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

export async function getSurveysByUserId(req) {
    const { userId } = req.body;
    if (!userId) return;
    const token = await getInHouseToken(req);
    try {
        const response = await inhouseApi.post(`${survey_route}/get-by-userid`, { userId }, {
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

export async function createSurvey(req) {
    const token = await getInHouseToken(req);

    const body = {
        question: req.body?.question,
        type: req.body?.type,
        options: req.body?.options,
    };

    try {
        const response = await inhouseApi.post(`${survey_route}/create`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201) {
            console.log("success create survey");
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

export async function updateSurvey(req) {
    const { id, question, type, options } = req.body;
    if (!id) return;
    const token = await getInHouseToken(req);
    const body = {
        id,
        question,
        type,
        options,
    };

    try {
        const response = await inhouseApi.put(`${survey_route}/update`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            console.log("success update survey");
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

export async function submitSurvey(req) {
    const { questionId, answer, arrayAnswer } = req.body;
    if (!questionId || (!answer && (!arrayAnswer || (Array.isArray(arrayAnswer) && arrayAnswer.length === 0)))) return;
    const token = await getInHouseUserToken(req);
    const body = {
        questionId,
        answer,
        arrayAnswer,
    };
    try {
        const response = await inhouseApi.post(`${survey_route}/submit`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            console.log("success submit survey");
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

export async function deleteSurvey(req) {
    const { id } = req.body;
    const token = await getInHouseToken(req);
    try {
        const response = await inhouseApi.delete(`${survey_route}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { id },
        });
        if (response.status === 200) {
            console.log("success delete survey");
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