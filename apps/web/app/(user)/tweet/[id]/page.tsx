"use client";

import { CommentForm } from "@/components/comment-form";
import TweetDetail from "@/components/detail-tweet";
import HeaderWithBackButton from "@/components/header-detail-tweet";
import { Tweet } from "@/components/tweet";
import { Separator } from "@semicolon/ui/separator";
import _ from "lodash";
import React, { Fragment, useEffect, useState } from "react";

const TweetPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const tweet = {
    id: "1",
    user: {
      name: "John Doe",
      username: "john_doe",
      profile_image_url: "https://avatars.githubusercontent.com/u/28171661",
    },
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend libero id facilisis scelerisque. Nulla nec lectus tristique, ultricies felis sed, suscipit neque.",
    created_at: "2024-06-21",
    image: "https://via.placeholder.com/1280x720",
    reply_count: 15,
    retweet_count: 10,
    like_count: 100,
  };

  return (
    <div className="container mx-auto px-4">
      <HeaderWithBackButton />
      <TweetDetail tweet={tweet} />
      <CommentForm />
      <Separator />
      <div className="mb-4 flex flex-col">
        <Tweet
          username="i_have_a_really_long_username_and_i_cannot_lie"
          date="2024-06-21"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend libero id facilisis scelerisque. Nulla nec lectus tristique, ultricies felis sed, suscipit neque."
          feeling="🤩 happy"
        />
        <Separator />
        {_.range(0, 16).map((i) => (
          <Fragment key={i}>
            <Tweet
              username="example_user"
              date="2024-06-21"
              content="This is a sample tweet content."
              feeling="🤩 happy"
            />
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default TweetPage;
