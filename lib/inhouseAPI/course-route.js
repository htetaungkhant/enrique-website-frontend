import fs from 'fs';
import inhouseApi from ".";
import { getInHouseToken } from "./utils";


// dummy data
// const dummyCourseData = {
//     "id": "01971b30-80a3-7000-b89a-23bf35d749f0",
//     "price": 120,
//     "image": {
//         "id": "01971b30-903f-7000-a54e-1e7f1a9c81b1",
//         "image": "https://s3.eu-west-1.amazonaws.com/arise-api/course/01971b30-903f-7000-a54e-1e7f1a9c81b1_original.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2HUZ2C4HNRMJMJ6V%2F20250529%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250529T111854Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=0843999aec5355be816a86bba2282b26347926154f8243b3c277a8710fced77e",
//         "thumbnail": "https://s3.eu-west-1.amazonaws.com/arise-api/course/01971b30-903f-7000-a54e-1e7f1a9c81b1_thumbnail.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2HUZ2C4HNRMJMJ6V%2F20250529%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250529T111854Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=65ae24d0240ca311d2a22373a8bae5a4407ef09e887c9f0b16a7c94c4fa76c8a"
//     },
//     "title": "test title",
//     "createdBy": {
//         "name": "test created by",
//         "image": {
//             "id": "01971b30-80a4-7000-9ebf-31794956e70f",
//             "image": "https://s3.eu-west-1.amazonaws.com/arise-api/course/01971b30-80a4-7000-9ebf-31794956e70f_original.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2HUZ2C4HNRMJMJ6V%2F20250529%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250529T111854Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=ada1ade585b25378a51c805e2b95646865beb5703878e5b27601fc8d757eda3b",
//             "thumbnail": "https://s3.eu-west-1.amazonaws.com/arise-api/course/01971b30-80a4-7000-9ebf-31794956e70f_thumbnail.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIA2HUZ2C4HNRMJMJ6V%2F20250529%2Feu-west-1%2Fs3%2Faws4_request&X-Amz-Date=20250529T111854Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5fcdaf826e184145bfa45f17fabe591ec9de5379ff08320c593439e6d2bb8d5a"
//         }
//     },
//     "sessionOverview": "test sessionOverview",
//     "extraDetails": [
//         {
//             "title": "Course Title",
//             "points": [
//                 "Point 1",
//                 "Point 2"
//             ]
//         },
//         {
//             "title": "Course Title",
//             "points": [
//                 "Point 1",
//                 "Point 2"
//             ]
//         }
//     ],
//     "classes": [
//         {
//             "id": "01972054-f73e-7000-85a5-616f38e006df",
//             "courseId": "01972054-f60f-7000-83a7-b049f0306dd1",
//             "title": "Video 1: The Roots of Sacred Plant Medicine",
//             "videoUrl": {
//                 "video": "https://www.youtube.com/watch?v=CabI_cHH-6U&list=RDmGTnysJUrF0&index=8"
//             },
//             "points": [
//                 "Explore the historical and cultural background of sacred plant medicines.",
//                 "Learn about Ayahuasca, Bufo, and Psilocybin—how they’re used and why.",
//                 "Understand how these medicines interact with the brain and body for healing."
//             ],
//             "createdAt": "2025-05-30T08:35:28.703Z",
//             "updatedAt": "2025-05-30T08:35:28.703Z"
//         },
//         {
//             "id": "01972054-f73e-7001-ba0a-e1b57e6ec3be",
//             "courseId": "01972054-f60f-7000-83a7-b049f0306dd1",
//             "title": " Video 2: Preparing the Mind, Body & Spirit",
//             "videoUrl": {
//                 "video": "https://www.youtube.com/watch?v=CabI_cHH-6U&list=RDmGTnysJUrF0&index=8"
//             },
//             "points": [
//                 "Understand how to mentally, emotionally, and physically prepare for a plant medicine journey.",
//                 "Discover the importance of \"set and setting\" in shaping your experience.",
//                 "Learn about safety protocols, contraindications, and risk management."
//             ],
//             "createdAt": "2025-05-30T08:35:28.703Z",
//             "updatedAt": "2025-05-30T08:35:28.703Z"
//         }
//     ],
//     "description": null,
//     "createdAt": "2025-05-29T08:37:37.649Z",
//     "updatedAt": "2025-05-29T08:37:37.649Z"
// }

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