import fs from 'fs';
import inhouseApi from ".";
import { getInHouseToken, getInHouseUserToken } from "./utils";

const ceremony_route = "/ceremony";

export async function getCeremonies(req) {
    try {
        const body = {
            page: req.body?.page || 1,
            limit: req.body?.limit || 10,
            sort: req.body?.sortByDate,
            // sortByPrice: req.body?.sortByPrice,
        }
        const response = await inhouseApi.post(`${ceremony_route}/get`, body);

        if (response.status === 200) {
            console.log("Ceremonies fetched successfully");
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

export async function getAllCeremonies(req) {
    const token = await getInHouseToken(req);
    try {
        const body = {
            page: req.body?.page || 1,
            limit: req.body?.limit || 10,
            sort: req.body?.sortByDate,
            // sortByPrice: req.body?.sortByPrice,
        }

        const response = await inhouseApi.post(`${ceremony_route}/get`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            console.log("Ceremonies fetched successfully");
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

export async function getCeremonyDetails(req) {
    const { id } = req.body;
    if (!id) return;
    const token = await getInHouseToken(req);

    try {
        const body = {
            page: req.body?.page || 1,
            limit: req.body?.limit || 10,
            sort: req.body?.sortByDate,
            // sortByPrice: req.body?.sortByPrice,
        }

        const { ceremonies } = !token
            ? await getCeremonies({ ...req, body })
            : await getAllCeremonies({ ...req, body });

        if (Array.isArray(ceremonies) && ceremonies?.length > 0) {
            const ceremony = ceremonies.find(c => c.id === id);
            if (ceremony) {
                return ceremony;
            } else {
                console.error(`Ceremony with id ${id} not found`);
                return null;
            }
        } else {
            console.error("No ceremonies found");
            return null;
        }
    }
    catch (error) {
        console.error('Error fetching ceremony details:', error);
        return null;
    }
}

export async function getRegisteredCeremoniesByUser(req) {
    const userToken = await getInHouseUserToken(req);
    try {
        const body = {
            page: req.body?.page || 1,
            limit: req.body?.limit || 10,
            sort: req.body?.sortByDate,
        }
        const response = await inhouseApi.post(`${ceremony_route}/get-registered`, body, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        if (response.status === 200) {
            console.log("Ceremonies by user fetched successfully");
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

    if (Array.isArray(req.body.gallery) && req.body.gallery.length > 0) {
        req.body.gallery.forEach((galleryImage) => {
            const galleryFileContent = fs.readFileSync(galleryImage.filepath);
            const galleryFileBlob = new Blob([galleryFileContent], { type: galleryImage.mimetype });
            formData.append("gallery", galleryFileBlob, galleryImage.originalFilename);
        });
    }

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
    const { id, title, hostNames, gallery, images, image, location, startDate, endDate, sessionOverview, extraDetails, price, deletedGalleryImages } = req.body;
    if (!id) return;
    const token = await getInHouseToken(req);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title[0]);
    formData.append("hostNames", JSON.stringify(hostNames));
    if (Array.isArray(gallery) && gallery.length > 0) {
        gallery.forEach((galleryImage) => {
            const galleryFileContent = fs.readFileSync(galleryImage.filepath);
            const galleryFileBlob = new Blob([galleryFileContent], { type: galleryImage.mimetype });
            formData.append("gallery", galleryFileBlob, galleryImage.originalFilename);
        });
    }
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
    formData.append("deletedGalleryImages", JSON.stringify(deletedGalleryImages || []));

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

export async function registerCeremony(req) {
    const { id } = req.body;
    const userToken = await getInHouseUserToken(req);
    try {
        const response = await inhouseApi.post(`${ceremony_route}/register`, { id }, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        if (response.status === 200) {
            console.log("success register ceremony");
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

export default {
    getCeremonies,
    getAllCeremonies,
    getCeremonyDetails,
    getRegisteredCeremoniesByUser,
    createCeremony,
    updateCeremony,
    registerCeremony,
    deleteCeremony,
};