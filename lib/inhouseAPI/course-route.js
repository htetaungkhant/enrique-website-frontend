import fs from 'fs';
import inhouseApi from ".";
import { getInHouseToken, getInHouseUserToken } from "./utils";

const course_route = "/course";

export async function getAllCourses(req) {
    try {
        const body = {
            page: req.body?.page || 1,
            limit: req.body?.limit || 10,
            sortByPrice: req.body?.sortByPrice, // "asc"
            sortByDate: req.body?.sortByDate, // "desc"
        }
        const response = await inhouseApi.post(`${course_route}/all`, body);

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

export async function getCourseDetails(req) {
    const { id } = req.body;
    try {
        const response = await inhouseApi.get(`${course_route}/get/${id}`);

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

export async function getCoursesByUser(req) {
    const userToken = await getInHouseUserToken(req);
    try {
        const response = await inhouseApi.get(`${course_route}/get-by-user`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
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


export async function createCourse(req) {
    const token = await getInHouseToken(req);

    const formData = new FormData();
    formData.append("title", req.body.title[0]);
    formData.append("createdBy", req.body.createdBy[0]);
    formData.append("price", req.body.price[0]);

    // Handle the image file
    const courseImageFile = req.body.courseImage[0];
    const courseImageFileContent = fs.readFileSync(courseImageFile.filepath);
    const courseImageFileBlob = new Blob([courseImageFileContent], { type: courseImageFile.mimetype });
    formData.append("courseImage", courseImageFileBlob, courseImageFile.originalFilename);

    const createdByImageFile = req.body.createdByImage[0];
    const createdByImageFileContent = fs.readFileSync(createdByImageFile.filepath);
    const createdByImageFileBlob = new Blob([createdByImageFileContent], { type: createdByImageFile.mimetype });
    formData.append("createdByImage", createdByImageFileBlob, createdByImageFile.originalFilename);

    formData.append("sessionOverview", req.body.sessionOverview[0]);
    formData.append("extraDetails", JSON.stringify(req.body.extraDetails));
    formData.append("courseVideos", JSON.stringify(req.body.courseVideos));
    // formData.append("description", req.body.description[0]);

    try {
        const response = await inhouseApi.post(`${course_route}/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201) {
            console.log("success creation new course");
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

export async function updateCourse(req) {
    const { id, title, createdBy, price, courseImage, createdByImage, sessionOverview, extraDetails, courseVideos, deletedClasses } = req.body;
    if (!id) return;
    const token = await getInHouseToken(req);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title[0]);
    formData.append("createdBy", createdBy[0]);
    formData.append("price", price[0]);

    if (Array.isArray(courseImage) && courseImage.length > 0) {
        const courseImageFile = courseImage[0];
        const courseImageFileContent = fs.readFileSync(courseImageFile.filepath);
        const courseImageFileBlob = new Blob([courseImageFileContent], { type: courseImageFile.mimetype });
        formData.append("courseImage", courseImageFileBlob, courseImageFile.originalFilename);
    }

    if (Array.isArray(createdByImage) && createdByImage.length > 0) {
        const createdByImageFile = createdByImage[0];
        const createdByImageFileContent = fs.readFileSync(createdByImageFile.filepath);
        const createdByImageFileBlob = new Blob([createdByImageFileContent], { type: createdByImageFile.mimetype });
        formData.append("createdByImage", createdByImageFileBlob, createdByImageFile.originalFilename);
    }

    formData.append("sessionOverview", sessionOverview[0]);
    formData.append("extraDetails", JSON.stringify(extraDetails));
    formData.append("courseVideos", JSON.stringify(courseVideos));
    formData.append("deletedClasses", JSON.stringify(deletedClasses));

    try {
        const response = await inhouseApi.put(`${course_route}/update`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            console.log("success update course");
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

export async function deleteCourse(req) {
    const { id } = req.body;
    const token = await getInHouseToken(req);
    try {
        const response = await inhouseApi.delete(`${course_route}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { id },
        });
        if (response.status === 200) {
            console.log("success delete course");
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