import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import { EditCeremonyForm } from "@/components/Admin/CeremonyManagementPage/EditCeremonyForm";
import { getCeremonyDetails } from "@/lib/inhouseAPI/ceremony-route";

export async function getServerSideProps(context) {
    try {
        const { ceremonyId } = context.params;
        const ceremony = await getCeremonyDetails({ ...context.req, body: { id: ceremonyId } });

        if (!ceremony) {
            return {
                notFound: true
            };
        }

        return {
            props: {
                ceremony
            }
        };
    } catch (error) {
        console.error("Error fetching ceremony details:", error);
        return {
            notFound: true
        };
    }
}

const CeremonyEdit = ({ ceremony }) => {
    if (!ceremony) {
        return null;
    }

    return (
        <AdminPagesWrapper>
            <div className="p-6">
                <h1 className="text-2xl text-white font-semibold mb-6">Edit Ceremony</h1>
                <EditCeremonyForm initialData={ceremony} />
            </div>
        </AdminPagesWrapper>
    );
}

export default CeremonyEdit;