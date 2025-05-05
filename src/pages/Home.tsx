import { useGetPostQuery } from "@/redux/api/json/postApi";
import { useState } from "react";

// type script import
import { Post } from "@/types/PostType";

// type Post = {
//   id: number;
//   title: string;
//   body: string;
//   // Add other post properties as needed
// };

const Home = () => {
  const [page, setPage] = useState(0);
  const limit = 5;

  // const { data: getPostById, isLoading: isPostByIdLoading } =
  //   useGetPostByIdQuery(1);

  const { data: getPost, isLoading: isGetting } = useGetPostQuery({
    offset: page * limit,
    limit: 5,
  });

  if (isGetting) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <p>list</p>
        <div>
          {getPost &&
            getPost.map((e: Post) => (
              // {getPost.map((e: { id: number; title: string }) => (
              <div key={e.id} className="backdrop-blur-sm shadow-2xl m-1 p-2 ">
                <strong>Post Title: </strong>
                <p className="p-2 m-1 text-green-500">{e.title}</p>
              </div>
            ))}
          <div className="flex justify-between">
            <button
              onClick={() => setPage(page - 1)}
              className="p-2 m-1 shadow-2xl"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              className="p-2 m-1 shadow-2xl"
            >
              Next
            </button>
          </div>
        </div>
        {/* <div className="bg-black text-white">{getPostById?.title}</div> */}
      </div>
    </div>
  );
};

export default Home;
