import fs from 'fs';
import inhouseApi from ".";
import { getInHouseToken } from "./utils";

const ceremony_route = "/ceremony";

export async function getCeremonies(req) {
    try {
        const body = {
            page: req.body?.page || 1,
            limit: req.body?.limit || 10,
            sortByDate: req.body?.sortByDate,
            // sortByPrice: req.body?.sortByPrice,
        }
        const response = await inhouseApi.post(`${ceremony_route}/get`, body);

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

export async function createCeremony(req) {
    const token = await getInHouseToken(req);

    const formData = new FormData();
    formData.append("title", req.body.title[0]);
    formData.append("hostNames", JSON.stringify(req.body.hostNames));

    if (Array.isArray(req.body.images) && req.body.images.length > 0) {
        req.body.images.forEach((image) => {
            const imageFileContent = fs.readFileSync(image.filepath);
            const imageFileBlob = new Blob([imageFileContent], { type: image.mimetype });
            formData.append("images", imageFileBlob, image.originalFilename);
        });
    }

    const imageFile = req.body.image[0];
    const imageFileContent = fs.readFileSync(imageFile.filepath);
    const imageFileBlob = new Blob([imageFileContent], { type: imageFile.mimetype });
    formData.append("image", imageFileBlob, imageFile.originalFilename);

    formData.append("location", JSON.stringify(req.body.location));
    formData.append("startDate", req.body.startDate[0]);
    formData.append("endDate", req.body.endDate[0]);
    formData.append("sessionOverview", req.body.sessionOverview[0]);
    formData.append("extraDetails", JSON.stringify(req.body.extraDetails));
    formData.append("price", req.body.price[0]);

    try {
        const response = await inhouseApi.post(`${ceremony_route}/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201) {
            console.log("success creation new ceremony");
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

export async function updateCeremony(req) {
    const { id, title, hostNames, images, image, location, startDate, endDate, sessionOverview, extraDetails, price } = req.body;
    if (!id) return;
    const token = await getInHouseToken(req);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title[0]);
    formData.append("hostNames", JSON.stringify(hostNames));
    if (Array.isArray(images) && images.length > 0) {
        images.forEach((img) => {
            const imageFileContent = fs.readFileSync(img.filepath);
            const imageFileBlob = new Blob([imageFileContent], { type: img.mimetype });
            formData.append("images", imageFileBlob, img.originalFilename);
        });
    }
    if (image && image.length > 0) {
        const imageFile = image[0];
        const imageFileContent = fs.readFileSync(imageFile.filepath);
        const imageFileBlob = new Blob([imageFileContent], { type: imageFile.mimetype });
        formData.append("image", imageFileBlob, imageFile.originalFilename);
    }
    formData.append("location", JSON.stringify(location));
    formData.append("startDate", startDate[0]);
    formData.append("endDate", endDate[0]);
    formData.append("sessionOverview", sessionOverview[0]);
    formData.append("extraDetails", JSON.stringify(extraDetails));
    formData.append("price", price[0]);

    try {
        const response = await inhouseApi.put(`${ceremony_route}/update`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            console.log("success update ceremony");
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

export async function deleteCeremony(req) {
    const { id } = req.body;
    const token = await getInHouseToken(req);
    try {
        const response = await inhouseApi.delete(`${ceremony_route}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { id },
        });
        if (response.status === 200) {
            console.log("success delete ceremony");
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