import { getFacilitators } from "@/lib/inhouseAPI/facilitator-route";
import AdminPagesWrapper from "@/components/Admin/PageWrapper";
import FacilitatorCard from "@/components/Admin/FacilitatorsPage/FacilitatorCard";
import AddNewCard from "@/components/Admin/AddNewCard";


export async function getServerSideProps(context) {
    try {
        const facilitators = await getFacilitators(context.req);

        return {
            props: {
                facilitators: facilitators ?? null,
            },
        };
    } catch (error) {
        console.error("Error fetching facilitators:", error);
        return {
            props: {},
        };
    }
}

const Facilitators = ({ facilitators }) => {
    return (
        <AdminPagesWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                {Array.isArray(facilitators) && facilitators.map((facilitator, index) => (
                    <FacilitatorCard
                        key={index}
                        id={facilitator.id}
                        fullName={facilitator.fullName}
                        image={facilitator.image.image}
                        designation={facilitator.designation}
                        about={facilitator.about}
                        areaOfExpertise={facilitator.areaOfExpertise}
                        workAndImpact={facilitator.workAndImpact}
                    // onDelete={() => window.location.reload()}
                    />
                ))}

                <AddNewCard
                    label="Add New Facilitator"
                    href="/admin/facilitators/create-new-facilitator"
                />
            </div>
        </AdminPagesWrapper>
    );
}

export default Facilitators;