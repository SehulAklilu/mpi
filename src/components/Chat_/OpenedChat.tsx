import { FC, ReactNode } from "react";
import userPhoto from "../../assets/user.jpeg";
import Button from "../Button/Button";
import IconButton from "../Button/IconButton";
import TextArea from "../Inputs/TextArea";
import Chat from "./chat";

interface Message {
  id: string;
  receiver: string;
  content: string;
  chatId: string;
}

interface OpenedChatProps {
  messages: Message[];
}

interface OrderSizeProps {
  header: string;
  buttonText: string;
  onClick: () => void;
  children: ReactNode;
}

const OrderSize: FC<OrderSizeProps> = ({
  header,
  buttonText,
  onClick,
  children,
}) => (
  <div className="flex flex-col gap-5 px-3 py-2">
    <div className="flex flex-row justify-between ">
      <p className="text-black-65 text-sm font-semibold">{header}</p>
      <Button
        type={"button"}
        buttonText={buttonText}
        backgroundStyleOn={false}
        onclick={onClick}
      />
    </div>
    {children}
  </div>
);

const string = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
alias explicabo quasi, tempore officiis culpa debitis accusamus
mollitia repellat ab est quis velit dolores exercitationem? Sed
nostrum vitae reprehenderit odit doloribus consequuntur, quas
laboriosam voluptatum repellat modi illo eligendi officiis. Error nemo
doloribus reprehenderit beatae officiis laudantium! Similique
laboriosam harum molestias laborum quibusdam adipisci accusantium
nobis dicta expedita, asperiores dignissimos sint voluptatem
laudantium, magnam nam aliquid, at in. Explicabo qui in perferendis.
Repellat vel, dicta vero tempore ex rem culpa asperiores tenetur
labore, molestiae nisi! Necessitatibus reprehenderit voluptatibus
consequatur cumque facilis quam! Explicabo magnam enim facilis tempore
nihil dolores ex. ita, asperiores dignissimos sint voluptatem
laudantium, magnam nam aliquid, at in. Explicabo qui in perferendis.
Repellat vel, dicta vero tempore ex rem culpa asperiores tenetur
labore, molestiae nisi! Necessitatibus reprehenderit voluptatibus
consequatur cumque facilis quam! Explicabo magnam enim facilis tempore
nihil dolores ex.ita, asperiores dignissimos sint voluptatem
laudantium, magnam nam aliquid, at in. Explicabo qui in perferendis.
Repellat vel, dicta vero tempore ex rem culpa asperiores tenetur
labore, molestiae nisi! Necessitatibus reprehenderit voluptatibus
consequatur cumque facilis quam! Explicabo magnam enim facilis tempore
nihil dolores ex.ita, asperiores dignissimos sint voluptatem
laudantium, magnam nam aliquid, at in. Explicabo qui in perferendis.
Repellat vel, dicta vero tempore ex rem culpa asperiores tenetur
labore, molestiae nisi! Necessitatibus reprehenderit voluptatibus
consequatur cumque facilis quam! Explicabo magnam enim facilis tempore
nihil dolores ex`;

const OpenedChat: FC<OpenedChatProps> = ({ messages }) => {
  return (
    <div className="flex flex-row justify-between w-full h-screen">
      <div className="w-3/4 flex flex-col h-full">
        <div className="bg-white w-full flex flex-row justify-between px-5 py-3">
          <div className="flex flex-row gap-2">
            <div className="w-10 h-10">
              <img
                className="w-10 h-10 rounded-full"
                src={userPhoto}
                alt="User"
              />
            </div>
            <div className="my-auto">
              <p className="font-medium text-sm xs-phone:text-xs">John Wick</p>
              <p className="font-extralight text-blue text-xs xs-phone:text-xs ">
                Active now
              </p>
            </div>
          </div>
          <div className="flex flex-row my-auto">
            <div>
              <IconButton
                type={"button"}
                buttonText={"more_horiz"}
                backgroundStyleOn={false}
                onclick={() => {}}
                iconColor="black-65"
              />
            </div>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto  p-4 flex-col-reverse flex gap-0 ">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.receiver === "John Wick" ? "justify-end" : ""
              }`}
            >
              <Chat color="primary" message={msg.content} />
            </div>
          ))}
        </div>
        <div className="bg-white h-16 flex flex-row gap-1 items-center px-5 py-2">
          <IconButton
            type={"button"}
            buttonText={"attach_file"}
            backgroundStyleOn={false}
            onclick={() => {}}
            iconColor="black-65"
          />
          <div className="flex-grow my-auto">
            <TextArea />
          </div>
          <div className="flex my-auto">
            <IconButton
              type={"button"}
              buttonText={"send"}
              backgroundStyleOn={false}
              onclick={() => {}}
              iconColor="black-65"
            />
          </div>
        </div>
      </div>
      <div className="bg-white w-1/3 border-l flex flex-col gap-5 py-3">
        <OrderSize
          header={"Shared Media"}
          buttonText={"see all"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        >
          <div className="grid grid-cols-2 justify-items-center ">
            <div className="">
              <img className="h-36 w-36 rounded-md" src={userPhoto} alt="" />
            </div>
            <div className="">
              <img className="h-36 w-36 rounded-md" src={userPhoto} alt="" />
            </div>
          </div>
        </OrderSize>
        <OrderSize
          header={"Shared Media"}
          buttonText={"see all"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                <div className="h-14 w-14 bg-background flex justify-center items-center font-semibold text-xl">
                  F
                </div>
                <div className="flex flex-col my-auto">
                  <p>File Name</p>
                  <p className="text-black-65 text-sm font-light">
                    12/04/24 3:00
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <p>2.5mb</p>
              </div>
            </div>
          </div>
        </OrderSize>
        <OrderSize
          header={"Shared Media"}
          buttonText={"see all"}
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-2">
                <div className="h-14 w-14 bg-background flex justify-center items-center font-semibold text-xl">
                  F
                </div>
                <div className="flex flex-col my-auto">
                  <p>YouTube</p>
                  <p className="text-black-65 text-xs font-light">
                    dRMCH6KiYCNpTwkzCxSWdQ/Untitled?node
                  </p>
                </div>
              </div>
            </div>
          </div>
        </OrderSize>
      </div>
    </div>
  );
};

export default OpenedChat;
