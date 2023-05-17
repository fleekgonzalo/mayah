import { PublicationTypes, usePublicationsQuery } from "../graphql/generated";
import useLensUser from "../lib/auth/useLensUser";
import styles from "../page.module.css";
import { Audio } from "./Audio";

// a react component that renders a list of posts by using usePublicationsQuery hook
export const AudioPosts = () => {
  const { profileQuery } = useLensUser();
  const { data, isLoading, error } = usePublicationsQuery({
    request: {
      profileId: profileQuery.data?.defaultProfile?.id,
      publicationTypes: [PublicationTypes.Post],
    },
  });

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  console.log("publicationss", data?.publications.items);

  return (
    <>
      <h2 className='mt-2 text-3xl pt-20 font-bold tracking-tight text-gray-300 sm:text-4xl lg:text-center'>
        Released Musics
      </h2>
      {/* <p className='mt-6 text-lg leading-8 text-gray-600'>
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
            Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
            In mi viverra elit nunc.
          </p> */}
      <div className='mx-auto mt-16 max-w-2xl sm:mt-10 lg:mt-12 lg:max-w-4xl'>
        <dl className='grid max-w-xl grid-cols-1 gap-y-10 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16'>
          {data?.publications.items
            .filter(
              (item) =>
                item.__typename === "Post" && item.metadata.media.length > 0
            )
            .map((publication) => {
              console.log(`publication ${publication.id}`);
              return (
                <>
                  <div className='relative pl-16' key={publication.id}>
                    {!!publication.metadata.media &&
                      publication.metadata.media
                        .filter(
                          (media) => media.original.mimeType === "audio/wav"
                        )
                        .map((media) => (
                          <>
                            <dd className='mt-2 text-base leading-7 text-gray-600'>
                              <Audio
                                publicationId={publication.id}
                                key={publication.id}
                              />
                            </dd>
                          </>
                        ))}
                  </div>
                </>
              );
            })}
        </dl>
      </div>
    </>
  );
};
