import fs from 'fs';
import inhouseApi from ".";
import { getInHouseToken } from "./utils";

const blog_route = "/blog";

export async function getBlogs(req) {
    try {
        const body = {
            page: req.body?.page || 1,
            limit: req.body?.limit || 10,
            sort: req.body?.sortByDate,
        }
        const response = await inhouseApi.post(`${blog_route}/all`, body);

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

export async function getBlogDetails(req) {
    const { id } = req.body;
    if (!id) return;

    try {
        const body = {
            page: req.body?.page || 1,
            limit: req.body?.limit || 10,
            sort: req.body?.sortByDate,
        }

        const { blogs } = await getBlogs({ ...req, body });
        if (Array.isArray(blogs) && blogs?.length > 0) {
            const blog = blogs.find(c => c.id === id);
            if (blog) {
                return blog;
            } else {
                console.error(`Blog with id ${id} not found`);
                return null;
            }
        } else {
            console.error("No blogs found");
            return null;
        }
    }
    catch (error) {
        console.error('Error fetching blog details:', error);
        return null;
    }
}

export async function createBlog(req) {
    const token = await getInHouseToken(req);
    const formData = new FormData();
    formData.append('title', req.body?.title[0]);
    formData.append('createdBy', req.body?.createdBy[0]);
    formData.append('content', req.body?.content[0]);
    const imageFile = req.body.image[0];
    const imageFileContent = fs.readFileSync(imageFile.filepath);
    const imageFileBlob = new Blob([imageFileContent], { type: imageFile.mimetype });
    formData.append("image", imageFileBlob, imageFile.originalFilename);

    try {
        const response = await inhouseApi.post(`${blog_route}/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201) {
            console.log("success create blog");
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

export async function updateBlog(req) {
    const { id, title, createdBy, content, image } = req.body;
    if (!id) return;
    const token = await getInHouseToken(req);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("createdBy", createdBy);
    formData.append("content", content);
    if (image[0]?.filepath && image[0]?.mimetype && image[0]?.originalFilename) {
        const imageFile = image[0];
        const imageFileContent = fs.readFileSync(imageFile.filepath);
        const imageFileBlob = new Blob([imageFileContent], { type: imageFile.mimetype });
        formData.append("image", imageFileBlob, imageFile.originalFilename);
    }
    if (image[0]?.id && image[0]?.image && image[0]?.thumbnail) {
        formData.append("image", JSON.stringify(image[0]));
    }

    try {
        const response = await inhouseApi.put(`${blog_route}/update`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 200) {
            console.log("success update blog");
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

export async function deleteBlog(req) {
    const { id } = req.body;
    const token = await getInHouseToken(req);
    try {
        const response = await inhouseApi.delete(`${blog_route}/delete`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { id },
        });
        if (response.status === 200) {
            console.log("success delete blog");
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