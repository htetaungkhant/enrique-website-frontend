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
    const body = {
        title: req.body?.title,
        createdBy: req.body?.createdBy,
        content: req.body?.content,
    };

    try {
        const response = await inhouseApi.post(`${blog_route}/create`, body, {
            headers: {
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
    const { id, title, createdBy, content } = req.body;
    if (!id) return;
    const token = await getInHouseToken(req);
    const body = {
        id,
        title,
        createdBy,
        content,
    };
    try {
        const response = await inhouseApi.put(`${blog_route}/update`, body, {
            headers: {
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