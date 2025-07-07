import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import { CreateCeremonyForm } from "@/components/Admin/CeremonyManagementPage/CreateCeremonyForm";

const CreateNewCeremony = () => {
    return (
        <AdminPagesWrapper>
            <div className="p-6">
                <h1 className="text-2xl text-white font-bold mb-6">Create New Ceremony</h1>
                <CreateCeremonyForm />
            </div>
        </AdminPagesWrapper>
    )
}

export default CreateNewCeremony;