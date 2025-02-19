import { useState } from "react";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";
import { ScrollArea } from "../ui/scroll-area";

const posts = [
  {
    user: {
      name: "Coach Damian",
      role: "Coach",
      followers: "4.7K Followers",
      profileImage: "https://i.pravatar.cc/100?img=9",
    },
    id: 3,
    date: "Feb 14, 2025",
    content:
      "I won my First Game!, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor dapibus dui, sit amet mattis turpis aliquet sit amet. Duis bibendum blandit ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor dapibus dui, sit amet mattis turpis aliquet sit amet. Duis bibendum blandit ipsum. ",
    image: "https://source.unsplash.com/400x300/?tennis",
    likes: 2500,
    shares: 123,
    comments: 21,
  },
];

const PostCard = ({ post }: any) => {
  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-10 w-10 rounded-full">
              <img
                src={post.user.profileImage}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <p className="text-lg">{post.user.name}</p> <span>.</span>{" "}
                <span>{post.user.role}</span>
              </div>
              <p className="text-sm text-gray-500">{post.followers}</p>
            </div>
          </div>
          <button className="text-orange-500 font-semibold">Follow</button>
        </div>
        {/* {post.image && (
          <img src={post.image} alt="Post" className="rounded-lg w-full" />
        )}
        {post.video && (
          <video className="rounded-lg w-full" controls>
            <source src={post.video} type="video/mp4" />
          </video>
        )} */}
        {/* <p className="text-gray-700">{post.content}</p>
        <div className="flex justify-between items-center text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <FaHeart className="text-red-500" /> {post.likes}
          </div>
          <div className="flex items-center gap-2">
            <FaComment /> {post.comments}
          </div>
          <div className="flex items-center gap-2">
            <FaShare /> {post.shares}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default function SocialFeed() {
  return (
    <ScrollArea className="rounded-md h-[80vh]">
      {/* <div className="grid grid-cols-2 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div> */}
      posts
    </ScrollArea>
  );
}
