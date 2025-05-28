import fs from 'fs';
import path from 'path';
import inhouseApi from ".";
import { getInHouseToken } from "./utils";

const facilitator_route = "/facilitator";

export async function getFacilitators(req) {
    try {
        const response = await inhouseApi.get(`${facilitator_route}/get`);

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

export async function createFacilitator(req) {
    const token = await getInHouseToken(req);

    const formData = new FormData();
    formData.append("fullName", req.body.fullName);

    // Handle the image file
    const imageFile = req.body.image[0];
    const fileContent = fs.readFileSync(imageFile.filepath);
    const blob = new Blob([fileContent], { type: imageFile.mimetype });
    formData.append("image", blob, imageFile.originalFilename);

    formData.append("designation", req.body.designation);
    formData.append("about", req.body.about);
    formData.append("areaOfExpertise", JSON.stringify(req.body.areaOfExpertise));
    formData.append("workAndImpact", JSON.stringify(req.body.workAndImpact));

    try {
        const response = await inhouseApi.post(`${facilitator_route}/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201) {
            console.log("success creation new facilitator");
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

export async function updateFacilitator(req) {
    const { id, fullName, image, designation, about, areaOfExpertise, workAndImpact } = req.body;
    const token = await getInHouseToken(req);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("fullName", fullName);

    // Handle the image file
    if (image && image.length > 0) {
        const imageFile = image[0];
        const fileContent = fs.readFileSync(imageFile.filepath);
        const blob = new Blob([fileContent], { type: imageFile.mimetype });
        formData.append("image", blob, imageFile.originalFilename);
    }

    formData.append("designation", designation);
    formData.append("about", about);
    formData.append("areaOfExpertise", JSON.stringify(areaOfExpertise));
    formData.append("workAndImpact", JSON.stringify(workAndImpact));

    try {
        const response = await inhouseApi.put(`${facilitator_route}/update`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            console.log("success update facilitator");
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

export async function deleteFacilitator(req) {
    const { id } = req.body;
    const token = await getInHouseToken(req);
    try {
        const response = await inhouseApi.delete(`${facilitator_route}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { id },
        });
        if (response.status === 200) {
            console.log("success delete facilitator");
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