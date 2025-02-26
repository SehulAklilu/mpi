import { useState } from "react";
import {
  FaHeart,
  FaComment,
  FaShare,
  FaEllipsisH,
  FaBookmark,
} from "react-icons/fa";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { IoShareSocialSharp } from "react-icons/io5";
import { LuSendHorizontal } from "react-icons/lu";
import { Input } from "../ui/input";
import { MdKeyboardArrowDown } from "react-icons/md";
import { LuReply } from "react-icons/lu";
import AddPost from "./AddPost";
import CustomTabs from "./CustomTabs";

interface ChatComponentProps {
  setActiveTab: (tab: string) => void;
}

const posts = Array.from({ length: 10 }, (_, i) => ({
  user: {
    name: `User ${i + 1}`,
    role: "Member",
    followers: `${Math.floor(Math.random() * 10)}K Followers`,
    profileImage: `https://i.pravatar.cc/100?img=${i + 1}`,
  },
  id: i + 1,
  date: `Feb ${i + 1}, 2025`,
  title: `Post Title ${i + 1}`,
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor dapibus dui, sit amet mattis turpis aliquet sit amet. Duis bibendum blandit ipsum.<br /><br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor dapibus dui, sit amet mattis turpis aliquet sit amet. Duis bibendum blandit ipsum.",
  image: Math.random() > 0.5 ? `https://i.pravatar.cc/500?img=${i + 1}` : null,
  likes: Math.floor(Math.random() * 5000),
  shares: Math.floor(Math.random() * 500),
  comments: Math.floor(Math.random() * 100),
}));

const PostCard = ({ post }: any) => {
  const [settings, setSettings] = useState({
    like: false,
    share: false,
    showComment: false,
    loadMore: false,
  });
  return (
    <div className="flex h-fit gap-2 flex-col w-full border border-primary/50 rounded-lg shadow shadow-primary py-2  text-sm">
      <div className="flex justify-between px-3">
        <div className="flex gap-1">
          <img
            src={post.user.profileImage}
            className="w-12 h-12 rounded-full"
            alt=""
          />
          <div className="flex flex-col my-auto">
            <div className="flex items-baseline gap-1">
              <div className="font-semibold">{post.user.name}</div>
              <span className="text-gray-700 text-xs">.{post.user.role}</span>
            </div>
            <div className="text-xs text-gray-700 ">{post.user.followers}</div>
          </div>
        </div>
        <div className="my-auto flex gap-2">
          <Button className="px-2 py-1 rounded-lg border">Message</Button>
          <FaEllipsisH className="rotate-90 my-auto text-lg text-primary" />
        </div>
      </div>
      <img src={post.image} className="w-full " alt="" />
      <div className="flex flex-col gap-2 px-3">
        <div>{post.date}</div>
        <div className="font-semibold text-lg">{post.title}</div>
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        <div className="flex gap-2 mt-2 py-3 border-t">
          <Button
            onClick={() => {
              setSettings((d) => ({ ...d, like: !d.like }));
            }}
            className="flex gap-1"
          >
            <FaHeart
              className={` text-2xl duration-200 ${
                settings.like ? "text-primary" : "text-gray-500"
              } `}
            />
            <div>{post.likes} Likes</div>
          </Button>
          <div className="flex gap-1">
            <IoShareSocialSharp className="text-2xl text-gray-500" />
            <div>{post.shares} Shares</div>
          </div>
          <FaBookmark className="text-2xl text-gray-500" />
        </div>
        <div className="flex w-full gap-2">
          <img
            src={post.user.profileImage}
            className="w-12 h-12 rounded-full border border-primary"
            alt=""
          />
          <div className="flex bg-gray-200 rounded-full w-full items-center">
            <Input
              placeholder="Add Your Comment..."
              className="border-none bg-none bg-transparent flex-1 my-auto"
            />
            <Button className="wfit rounded-full bg-primary outline-none  w-11 h-11 flex px-3 me-3">
              <LuSendHorizontal className="text-2xl text-white m-auto" />
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <div>{post.comments} Comments</div>
          <Button
            onClick={() =>
              setSettings((d) => ({ ...d, showComment: !d.showComment }))
            }
            className="flex gap-1 items-center"
          >
            <div>Collapse</div>
            <MdKeyboardArrowDown
              className={`text-lg  ${
                settings.showComment && "rotate-180"
              } duration-200`}
            />
          </Button>
        </div>

        {settings.showComment && (
          <div>
            <Comment />
            <Comment reply />
            {!settings.loadMore ? (
              <Button
                onClick={() => {
                  setSettings((d) => ({ ...d, loadMore: true }));
                }}
                className="w-full py-3 border-t"
              >
                Load More Comments
              </Button>
            ) : (
              <>
                <Comment />
                <Comment reply />
                <Comment />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Comment = ({ reply = false }: { reply?: boolean }) => {
  return (
    <div className={`${reply ? "ps-14" : "ps-6"} my-2 flex flex-col gap-2`}>
      <div className="flex justify-between">
        <div className="flex gap-1">
          <img
            src={"https://i.pravatar.cc/100?img=9"}
            className="w-9 h-9 rounded-full"
            alt=""
          />
          <div className="flex flex-col my-auto">
            <div className="flex items-baseline gap-1">
              <div className="font-semibold">Abebe</div>
            </div>
          </div>
        </div>
        <div className="my-auto flex gap-2">
          <div>Feb-3-2024</div>
          <FaEllipsisH className="rotate-90 my-auto text-lg text-gray-500" />
        </div>
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor
        dapibus dui, sit amet mattis turpis aliquet sit amet. Duis bibendum
        blandit ipsum.
      </div>
      <div className="flex gap-2 mt-3">
        <div className="flex gap-1">
          <FaHeart className="text-2xl text-gray-500" />
          <div>1.2k Likes</div>
        </div>
        <div className="flex gap-1 items-center">
          <LuReply className="text-2xl text-gray-500 my-auto" />
          <div>3 Replies</div>
        </div>
      </div>
    </div>
  );
};

export default function SocialFeed({ setActiveTab }: ChatComponentProps) {
  return (
    <div>
      <div className=" md:hidden px-1 m-1 ml-[2rem]">
        <CustomTabs setActiveTab={setActiveTab} tab="posts" />
      </div>
      <ScrollArea className="flex-1 relative">
        <div className="grid grid-cols-2 gap-2 px-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} className="masonry-item" />
          ))}
        </div>
        <div className="fixed bottom-5 right-12">
          <AddPost />
        </div>
      </ScrollArea>
    </div>
  );
}
