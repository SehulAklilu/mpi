import { useEffect, useState } from "react"
import {
  FaHeart,
  FaComment,
  FaShare,
  FaEllipsisH,
  FaBookmark,
} from "react-icons/fa"
import { ScrollArea } from "../ui/scroll-area"
import { Button } from "../ui/button"
import { IoShareSocialSharp } from "react-icons/io5"
import { LuSendHorizontal } from "react-icons/lu"
import { Input } from "../ui/input"
import { MdKeyboardArrowDown } from "react-icons/md"
import { LuReply } from "react-icons/lu"
import AddPost from "./AddPost"
import CustomTabs from "./CustomTabs"
import { useMutation, useQuery, useQueryClient } from "react-query"
import axios from "axios"
import axiosInstance from "@/api/axios"
import "react-slideshow-image/dist/styles.css"
import { Slide } from "react-slideshow-image"
import { toast } from "react-toastify"
import { Delete, Loader } from "lucide-react"
import Cookies from "js-cookie"

interface ChatComponentProps {
  setActiveTab: (tab: string) => void
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
}))

interface PostCardProps {
  post: PostTypes
}

const formatTime = (time: string) => {
  const date = new Date(time)
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}

const PostCard = ({ post }: PostCardProps) => {
  const [settings, setSettings] = useState<{
    like: boolean
    share: boolean
    showComment: boolean
    loadMore: boolean
    selectedPostId: string | null
  }>({
    like: post.liked,
    share: false,
    showComment: false,
    loadMore: false,
    selectedPostId: null,
  })

  const [postLikes, setPostLikes] = useState(post.likes)
  const [liked, setLiked] = useState(false)
  const [pid, setPid] = useState<string>("")
  const [comment, setComment] = useState<string>("")
  const [commentLoader, setCommentLoader] = useState<boolean>(false)
  const [postComments, setPostComments] = useState(post.comments)
  const [newComments, setNewComments] = useState(false)
  const [comments, setComments] = useState<CommentProps[]>([])
  const [postId, setPostId] = useState<string>("")
  const queryClient = useQueryClient()

  const formatTime = (time: string) => {
    const date = new Date(time)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const handleLike = async () => {
    const newLikes = liked ? postLikes - 1 : postLikes + 1
    setPostLikes(newLikes)
    setLiked(!liked)
    const response = await axiosInstance.patch(`api/v1/posts/${post._id}/like`)
    console.log(response)
  }

  // useEffect(() => {
  //   if (postId) {
  //     axiosInstance.get(`/api/v1/comments/${postId}`).then((response) => {
  //       console.log(response.data, "comments")
  //       setComments(response.data)
  //     })
  //   }
  // }, [postId])

  // const {} = useQuery(
  //   "comments",
  //   () => axiosInstance.get(`/api/v1/comments/${post._id}`),
  //   {
  //     onSuccess(data) {
  //       console.log(data.data, "posts")
  //       setComments(data.data)
  //     },
  //   }
  // )

  const {} = useQuery(
    ["comments", postId],
    () =>
      axiosInstance.get(`/api/v1/comments/${postId}`).then((res) => res.data),
    {
      enabled: !!postId,
      onSuccess: (data) => {
        setComments(data)
      },
    }
  )

  const handleAddComment = async () => {
    if (!comment) {
      return
    }
    const newComments_ = newComments ? postComments - 1 : postComments + 1
    setPostComments(newComments_)
    setNewComments(!newComments)

    try {
      setCommentLoader(true)
      const response = await axiosInstance.post(`/api/v1/comments/${pid}`, {
        content: comment,
      })
      console.log(response)
      queryClient.invalidateQueries(["comments"])

      setCommentLoader(false)
      setComment("")
    } catch (error) {}
  }

  return (
    <div className="flex h-fit gap-2 flex-col sm:w-full md:w-1/2 border border-primary/50 rounded-lg shadow shadow-primary py-2  text-sm">
      <div className="flex justify-between px-3">
        <div className="flex gap-1">
          <img
            src={post.user.avatar}
            className="w-12 h-12 rounded-full"
            alt=""
          />
          <div className="flex flex-col my-auto">
            <div className="flex items-baseline gap-1">
              <div className="font-semibold flex flex-row gap-1">
                {post.user.firstName} {post.user.lastName}
              </div>
              <span className="text-gray-700 text-xs"></span>
            </div>
            <div className="text-xs text-gray-700 ">
              {formatTime(post.user.lastOnline)}
            </div>
          </div>
        </div>
        <div className="my-auto flex gap-2">
          {/* <Button className="px-2 py-1 rounded-lg border">Message</Button> */}
          <FaEllipsisH className="rotate-90 my-auto text-lg text-primary" />
        </div>
      </div>

      <div className="h-full overflow-hidden relative">
        {post.photos.length === 1 ? (
          <div
            className="h-[70vh] w-full bg-gray-200 bg-center bg-cover"
            style={{ backgroundImage: `url(${post.photos[0]})` }}
          ></div>
        ) : (
          <Slide autoplay={false}>
            {post.photos.map((img, index) => (
              <div
                key={index}
                className="h-[70vh] w-full bg-gray-200 bg-center bg-cover"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
            ))}
          </Slide>
        )}
      </div>

      <div className="flex flex-col gap-2 px-3">
        <div>{post.createdAt}</div>
        <div className="font-semibold text-lg"></div>
        <div
          className=""
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        <div className="flex gap-2 mt-2 py-3 border-t">
          <Button
            onClick={() => {
              setSettings((d) => ({ ...d, like: !d.like }))
            }}
            className="flex gap-1"
          >
            <FaHeart
              className={` text-2xl duration-200 ${
                settings.like ? "text-primary" : "text-gray-500"
              } `}
              onClick={handleLike}
            />
            <div>{postLikes} Likes</div>
          </Button>
          <div className="flex gap-1">
            <IoShareSocialSharp className="text-2xl text-gray-500" />
            {/* <div>{post.shares} Shares</div> */}
          </div>
          <FaBookmark className="text-2xl text-gray-500" />
        </div>
        <div className="flex w-full gap-2">
          <img
            src={post.user.avatar}
            className="w-12 h-12 rounded-full border border-primary"
            alt=""
          />
          <div className="flex bg-gray-200 rounded-full w-full items-center">
            <Input
              onClick={() => setPid(post._id)}
              placeholder="Add Your Comment..."
              className="border-none bg-none bg-transparent flex-1 my-auto"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              onClick={handleAddComment}
              className="wfit rounded-full bg-primary outline-none  w-11 h-11 flex px-3 me-3"
            >
              {commentLoader ? (
                <Loader className="animate-spin text-2xl text-white m-auto" />
              ) : (
                <LuSendHorizontal className="text-2xl text-white m-auto" />
              )}
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mt-2">
          <div>{postComments} Comments</div>
          <Button
            onClick={
              () => {
                setSettings((d) => ({
                  ...d,
                  showComment: !d.showComment,
                  selectedPostId: post._id,
                }))
                setPostId(post._id)
              }
              //postid should be stored on this click
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
            {comments.map((comment) => (
              <Comment key={comment._id} com={comment} />
            ))}

            {/* <Comment reply /> */}
            {!settings.loadMore ? (
              <Button
                onClick={() => {
                  setSettings((d) => ({ ...d, loadMore: true }))
                }}
                className="w-full py-3 border-t"
              >
                Load More Comments
              </Button>
            ) : (
              <>
                {/* <Comment com={comments} />
                <Comment comments={comments} reply />
                <Comment comments={comments} /> */}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

interface CommentProps {
  content: string
  createdAt: string
  liked: boolean
  likes?: []
  likesCount: number
  replies?: []
  repliesCount: number
  updatedAt: string
  user: {
    _id: string
    avatar: string
    emailAddress: {
      email: string
      verified: boolean
    }
    firstName: string
    lastName: string
    lastOnline: string
    phoneNumber: {
      countryCode: string
      number: string
    }
  }
  _id: string
}

const Comment = ({
  postId,
  reply = false,
  com,
}: {
  postId?: string
  reply?: boolean
  com: CommentProps
}) => {
  const [showReply, setShowReply] = useState<boolean>(false)
  const [showReplyInput, setShowReplyInput] = useState<string>("")
  const [showReplyInput_, setShowReplyInput_] = useState<boolean>(false)
  const [commentLoader, setCommentLoader] = useState<boolean>(false)
  const [reply_, setReply_] = useState<string>("")
  const [likedComments, setLikedComments] = useState<string[]>([])
  const [likesCount, setLikesCount] = useState(com.likesCount)
  const user_id = Cookies.get("user_id")
  const [isLiked_, setIsLiked] = useState<boolean>(com.liked)
  const queryClient = useQueryClient()
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editId, setEditId] = useState<string>("")
  const [editComment, setEditComment] = useState<string>(com.content)

  const handleOpenReply = (commentId: string) => {
    setShowReplyInput(commentId)
    setShowReplyInput_((prev) => !prev)
  }

  const handleAddReply = async () => {
    if (!reply_) return

    try {
      setCommentLoader(true)
      await axiosInstance.post(`/api/v1/comments/${showReplyInput}/reply`, {
        content: reply_,
      })
      setReply_("")
      setShowReply(true)
      queryClient.invalidateQueries(["comments"])
    } catch (error) {
      console.error("Failed to add reply", error)
    } finally {
      setCommentLoader(false)
    }
  }

  const handleLike = async (commentId: string, currentLikes: number) => {
    const newLikes = isLiked_ ? likesCount - 1 : likesCount + 1

    setLikesCount(newLikes)
    setIsLiked((prev) => !prev)

    setLikedComments((prev) =>
      isLiked_ ? prev.filter((id) => id !== commentId) : [...prev, commentId]
    )

    try {
      await axiosInstance.patch(`/api/v1/comments/${commentId}/like`)
    } catch (error) {
      console.error("Error liking comment:", error)
      setLikedComments((prev) =>
        isLiked_ ? [...prev, commentId] : prev.filter((id) => id !== commentId)
      )
    }
  }

  const deleteMutation = useMutation({
    mutationFn: async (commentId: string) => {
      await axiosInstance.delete(`/api/v1/comments/${commentId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"])
    },
  })

  const handleDelete = async (commentId: string) => {
    deleteMutation.mutate(commentId)
  }

  const handleEditButton = (id: string) => {
    setEditMode((prev) => !prev)
    setEditId(id)
  }

  const editCommentMutation = useMutation({
    mutationFn: async (commentId: string) => {
      await axiosInstance.patch(`/api/v1/comments/${commentId}`, {
        content: editComment,
      })
    },
    onSuccess: () => {
      setEditMode(false)
      queryClient.invalidateQueries(["comments"])
    },
  })

  const handleEditComment = () => {
    editCommentMutation.mutate(editId)
  }

  return (
    <>
      <div className={`${reply ? "ps-14" : "ps-6"} my-2 flex flex-col gap-2`}>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <img
              src={com.user.avatar}
              className="w-9 h-9 rounded-full"
              alt="User Avatar"
            />
            <div className="flex flex-col my-auto">
              <div className="font-semibold">{`${com.user.firstName} ${com.user.lastName}`}</div>
            </div>
          </div>
          <div className="my-auto flex gap-2">
            <div>{formatTime(com.createdAt)}</div>
            {user_id === com.user._id && (
              <div className="flex flex-row gap-2">
                <Button
                  className="text-primary hover:underline"
                  variant="outline"
                  onClick={() => handleEditButton(com._id)}
                >
                  {editMode ? "Cancel" : "Edit"}
                </Button>

                <Button
                  className="text-red-500 hover:underline"
                  variant="outline"
                  onClick={() => handleDelete(com._id)}
                >
                  {deleteMutation.isLoading ? "deleting" : "Delete"}
                </Button>
              </div>
            )}
            <FaEllipsisH className="rotate-90 my-auto text-lg text-gray-500" />
          </div>
        </div>

        {/* <div>{com.content}</div> */}
        <div>
          {com._id === editId && editMode ? (
            <div className="flex bg-gray-200 rounded-full w-full items-center">
              <Input
                placeholder=""
                className="border-none bg-transparent flex-1 my-auto"
                value={editComment}
                onChange={(e) => setEditComment(e.target.value)}
              />
              <Button
                onClick={handleEditComment}
                className="wfit rounded-full bg-primary outline-none w-11 h-11 flex px-3 me-3"
              >
                {editCommentMutation.isLoading ? (
                  <Loader className="animate-spin text-2xl text-white m-auto" />
                ) : (
                  <LuSendHorizontal className="text-2xl text-white m-auto" />
                )}
              </Button>
            </div>
          ) : (
            com.content
          )}
        </div>
        <div className="flex gap-2 mt-3">
          <div className="flex gap-1 items-center">
            <FaHeart
              onClick={() => handleLike(com._id, com.likesCount)}
              className={`text-2xl ${
                isLiked_ ? "text-primary" : "text-gray-500"
              } cursor-pointer`}
            />
            <div>{`${likesCount} Likes`}</div>
          </div>

          <div className="flex gap-1 items-center">
            <LuReply
              onClick={() => handleOpenReply(com._id)}
              className="text-2xl text-gray-500 my-auto hover:text-primary cursor-pointer"
            />
            <div
              className="hover:underline cursor-pointer"
              onClick={() => setShowReply((prev) => !prev)}
            >
              {`${com.repliesCount} Replies`}
            </div>
          </div>
        </div>

        {showReply &&
          com.replies?.map((replies) => <Reply reply com={replies} />)}

        {showReplyInput === com._id && showReplyInput_ && (
          <div className="flex bg-gray-200 rounded-full w-full items-center">
            <Input
              placeholder="Add Your Reply..."
              className="border-none bg-transparent flex-1 my-auto"
              value={reply_}
              onChange={(e) => setReply_(e.target.value)}
            />
            <Button
              onClick={handleAddReply}
              className="wfit rounded-full bg-primary outline-none w-11 h-11 flex px-3 me-3"
            >
              {commentLoader ? (
                <Loader className="animate-spin text-2xl text-white m-auto" />
              ) : (
                <LuSendHorizontal className="text-2xl text-white m-auto" />
              )}
            </Button>
          </div>
        )}
      </div>
    </>
  )
}

export interface Replies {
  content: string
  createdAt: string
  liked: boolean
  likes: []
  likesCount: number
  parentComment: string
  replies: []
  repliesCount: number
  updatedAt: string
  user: {
    _id: string
    avatar: string
    emailAddress: {
      email: string
      verified: boolean
    }
    firstName: string
    lastName: string
    lastOnline: string
    phoneNumber: {
      countryCode: string
      number: string
    }
  }
  _id: string
}

const Reply = ({
  // postId,
  reply = false,
  commentId,
  com,
}: {
  postId?: string
  reply?: boolean
  commentId?: string
  com: Replies
}) => {
  return (
    <>
      <div className={`${reply ? "ps-14" : "ps-6"} my-2 flex flex-col gap-2`}>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <img
              src={com.user.avatar}
              className="w-9 h-9 rounded-full"
              alt=""
            />
            <div className="flex flex-col my-auto">
              <div className="flex items-baseline gap-1">
                <div className="font-semibold">{`${com.user.firstName} ${com.user.lastName}`}</div>
              </div>
            </div>
          </div>
          <div className="my-auto flex gap-2">
            <div>{formatTime(com.createdAt)}</div>
            <FaEllipsisH className="rotate-90 my-auto text-lg text-gray-500" />
          </div>
        </div>
        <div>{com.content}</div>
        <div className="flex gap-2 mt-3">
          <div className="flex gap-1">
            <FaHeart className="text-2xl text-gray-500" />
            <div>{`${com.likesCount} Likes`}</div>
          </div>
          <div className="flex gap-1 items-center">
            <LuReply className="text-2xl text-gray-500 my-auto" />
            <div>{`${com.repliesCount} Replies`}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export interface PostTypes {
  comments: number
  content: string
  createdAt: string
  liked: boolean
  likes: number
  photos: string[]
  updatedAt: string
  user: {
    _id: string
    avatar: string
    emailAddress: {
      email: string
      verified: boolean
    }
    firstName: string
    lastName: string
    lastOnline: string
    phoneNumber: {
      countryCode: string
      number: string
    }
  }
  _id: string
}

export default function SocialFeed({ setActiveTab }: ChatComponentProps) {
  const [posts_, setPosts] = useState<PostTypes[]>([])

  const {} = useQuery("posts_", () => axiosInstance.get("/api/v1/posts"), {
    onSuccess(data) {
      console.log(data.data, "posts")
      setPosts(data.data)
    },
  })

  return (
    <div>
      <div className=" md:hidden px-1 m-1 ml-[2rem]">
        <CustomTabs setActiveTab={setActiveTab} tab="posts" />
      </div>
      <ScrollArea className="flex-1 relative ">
        <div className="grid grid-cols-1 gap-2 px-4 w-full place-items-center ">
          {posts_.map((post) => (
            <PostCard key={post._id} post={post} />
            // className="masonry-item"
          ))}
        </div>
        <div className="fixed bottom-5 right-12">
          <AddPost />
        </div>
      </ScrollArea>
    </div>
  )
}
