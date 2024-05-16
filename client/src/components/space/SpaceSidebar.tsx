import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { EditIcon } from "@/components/icons";
import EditSpace from "@/components/space/EditSpace";
import { useAuthContext } from "@/context/useAuthContext";
import { useSpacesContext } from "@/context/useSpacesContext";
import { getSpace } from "@/services/space-services";
import { handleError } from "@/utils/handleError";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Props = {
  name: string;
  showHeader?: boolean;
};

function SpaceSidebar(props: Props) {
  const { state } = useAuthContext();
  const spaceContext = useSpacesContext();

  const userspaces = spaceContext.state.userspaces;

  const isJoined = props.name in userspaces;

  const { error, isError, isLoading, data } = useQuery({
    queryKey: ["space", props.name],
    queryFn: () => getSpaceDetails(props.name),
    retry: false,
  });

  const [openEditSpaceModal, setOpenEditSpaceModal] = useState(false);

  async function getSpaceDetails(name: string) {
    try {
      const response = await getSpace(name);
      return response;
    } catch (error) {
      const message = handleError(error);

      throw new Error(message);
    }
  }

  const isCreator = data?.creator === state.user?.id;

  return (
    <>
      <aside className="bg-gray-50 p-4 rounded-lg ">
        {isLoading && <div>Loading...</div>}

        {!isLoading && isError && <div>Error: {(error as Error).message}</div>}

        {!isLoading && !data && <div>Space not found</div>}

        {!isLoading && data && (
          <section className="space-y-2 relative">
            {props.showHeader && (
              <header className="flex items-center justify-between">
                <h2 className="font-bold text-2xl">s/{data.name}</h2>

                <Button className="bg-white h-9 border-[1px] border-gray-500 text-black rounded-full w-fit flex items-center gap-2">
                  {isJoined ? "Joined" : "Join"}
                </Button>
              </header>
            )}

            {isCreator && (
              <span
                onClick={() => setOpenEditSpaceModal((state) => !state)}
                className="absolute -top-4 -right-2 bg-gray-200 p-2 grid place-items-center rounded-lg cursor-pointer hover:bg-gray-300"
              >
                <EditIcon />
              </span>
            )}

            <h2 className="font-bold">journey to {data.name}</h2>
            <p className="leading-relaxed font-medium text-gray-500">
              {data.description ||
                `welcome to the ${data.name} space! this is a space for ${data.name} enthusiasts to share their knowledge and experiences.`}
            </p>

            <p className="flex gap-2">
              <strong>{data.members_count}</strong>
              {data.members_count === 1 ? "member" : "members"}
            </p>
          </section>
        )}
      </aside>

      {openEditSpaceModal && data && (
        <Modal closeModal={() => setOpenEditSpaceModal(false)}>
          <EditSpace
            closeModal={() => setOpenEditSpaceModal(false)}
            space={data}
          />
        </Modal>
      )}
    </>
  );
}

export default SpaceSidebar;
