import fs from 'fs';
import inhouseApi from ".";
import { getInHouseToken } from "./utils";

const course_route = "/course";

export async function getAllCourses(req) {
    try {
        const body = {
            page: req.body?.page || 1,
            limit: req.body?.limit || 10,
            sortByPrice: req.body?.sortByPrice,
            sortByDate: req.body?.sortByDate,
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


export async function createCourse(req) {
    const token = await getInHouseToken(req);

    const formData = new FormData();
    formData.append("title", req.body.title);
    formData.append("createdBy", req.body.createdBy);
    formData.append("price", req.body.price);

    // Handle the image file
    const courseImageFile = req.body.courseImage[0];
    const courseImageFileContent = fs.readFileSync(courseImageFile.filepath);
    const courseImageFileBlob = new Blob([courseImageFileContent], { type: courseImageFile.mimetype });
    formData.append("courseImage", courseImageFileBlob, courseImageFile.originalFilename);

    const createdByImageFile = req.body.createdByImage[0];
    const createdByImageFileContent = fs.readFileSync(createdByImageFile.filepath);
    const createdByImageFileBlob = new Blob([createdByImageFileContent], { type: createdByImageFile.mimetype });
    formData.append("createdByImage", createdByImageFileBlob, createdByImageFile.originalFilename);

    formData.append("sessionOverview", req.body.sessionOverview);
    formData.append("extraDetails", JSON.stringify(req.body.extraDetails));
    formData.append("courseVideos", JSON.stringify(req.body.courseVideos));
    formData.append("description", req.body.description);

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