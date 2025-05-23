import Link from "next/link";


const CoursesPurchased = () => {
    return (
        <main className="text-white min-h-[100vh]">
            <h1 className="text-9xl font-black">Course purchased</h1>
            <Link href="/admin/facilitators">Facilitators</Link>
        </main>
    )
}

export default CoursesPurchased;