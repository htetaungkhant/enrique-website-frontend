import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import { FacilitatorForm } from "@/components/Admin/FacilitatorsPage/FacilitatorForm";

const CreateNewFacilitator = () => {
    return (
        <AdminPagesWrapper>
            <div className="p-6">
                <h1 className="text-2xl text-white font-semibold mb-6">Add New Facilitator</h1>
                <FacilitatorForm />
            </div>
        </AdminPagesWrapper>
    );
}

export default CreateNewFacilitator;